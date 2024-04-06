from flask import request, jsonify
from g4f.client import Client
from flask_jwt_extended import jwt_required, get_jwt_identity
from api.flashcards.models import Sets
import json

client = Client()


def is_math_question(prompt):

    math_keywords = ['math', 'calculate', 'derivative', 'integral', 'equation', 'sum', 'difference', 'product', 'quotient']
    if any(keyword in prompt.lower() for keyword in math_keywords):
        return True
    math_operators = set("+-*/^=")
    return any(char.isdigit() or char in math_operators for char in prompt)


def generate_practice(prompt):
    if "derivative" in prompt.lower() and "x^2" in prompt:
        # If the question specifically asks for the derivative of x^2, tailor the practice question to avoid redundancy and ensure relevance.
        return "Now, can you find the derivative of 2x^3?", "6x^2"
    elif "calculate" in prompt.lower():
        return "Try calculating 5 + 5.", "10"
    return None, None  # Avoid suggesting unrelated practice questions

def gpt_routes(app, db):

    @app.route("/ai_flashcards", methods=["POST"])
    @jwt_required()

    def generate_flashcards_payload_json(topic, term):
        prompt = request.json.get("prompt")
        topic = prompt.split(",")[0]
        terms = prompt.split(",")[1].split(" ")
        flashcards = []
        for term in terms:
            # Request a concise definition or explanation for each term
            response = client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[{"role": "user", "content": f"Define {term} in a concise sentence."}],
            )
            definition = response.choices[0].message.content.strip()
            flashcards.append({"term": term, "definition": definition})

        # Preparing the payload
        payload = {
            "title": f"{topic} Flashcards",
            "cards": flashcards,
            "user_id": "1"
        }

        # Converting payload to JSON string
        payload_json = json.dumps(payload)  # Pretty printing for readability

        new_set = Sets(title=payload.title, cards=payload_json, user_id=get_jwt_identity())
        try:
            db.session.add(new_set)
            db.session.commit()
        except Exception as e:
            return jsonify({"message": str(e)}), 400

        return jsonify({"message": "Set created!"}), 201

    @app.route("/generate_response", methods=["POST"])
    @jwt_required()
    def generate_response():
        short_answers = {
        "what is the role of the mitochondria": "Mitochondria are the cell's powerhouses, converting nutrients into energy.",
        "what is momentum": "Momentum is the product of an object's mass and velocity, a key concept in physics."
        }   
        temperature = 0.7
        prompt = request.json.get("prompt")
        if prompt.lower() in short_answers:
            return jsonify({"message": short_answers[prompt.lower()]})
        else:
            # Generate a response for non-predefined questions
            initial_prompt = f"Please explain '{prompt}' in a detailed yet concise manner."
            response = client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[{"role": "user", "content": prompt}],
                prompt=initial_prompt
            )

            return jsonify({"message": response.choices[0].message.content})
    

        
        