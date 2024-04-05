from flask import request, jsonify
from config import app, db
from models import Sets, Cards

# Routes for Sets

# Get all sets
@app.route("/sets", methods=["GET"])
def get_sets():
    sets = Sets.query.all()
    json_sets = [set.to_json() for set in sets]
    return jsonify({"sets": json_sets})

# Create a new set
@app.route("/create_set", methods=["POST"])
def create_set():
    title = request.json.get("title")

    if not title:
        return jsonify({"message": "You must include a title"}), 400

    new_set = Sets(title=title)
    try:
        db.session.add(new_set)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}), 400

    return jsonify({"message": "Set created!"}), 201

# Update an existing set
@app.route("/update_set/<int:set_id>", methods=["PATCH"])
def update_set(set_id):
    set = Sets.query.get(set_id)

    if not set:
        return jsonify({"message": "Set not found"}), 404

    title = request.json.get("title")
    if title:
        set.title = title

    db.session.commit()

    return jsonify({"message": "Set updated."}), 200

# Delete an existing set
@app.route("/delete_set/<int:set_id>", methods=["DELETE"])
def delete_set(set_id):
    set = Sets.query.get(set_id)

    if not set:
        return jsonify({"message": "Set not found"}), 404

    db.session.delete(set)
    db.session.commit()

    return jsonify({"message": "Set deleted!"}), 200


# Routes for Cards

# Get all cards
@app.route("/cards", methods=["GET"])
def get_cards():
    cards = Cards.query.all()
    json_cards = [card.to_json() for card in cards]
    return jsonify({"cards": json_cards})

# Create a new card
@app.route("/create_card", methods=["POST"])
def create_card():
    question = request.json.get("question")
    answer = request.json.get("answer")
    set_id = request.json.get("set_id")

    if not question or not answer or not set_id:
        return jsonify({"message": "You must include a question, an answer, and a set_id"}), 400

    new_card = Cards(question=question, answer=answer, set_id=set_id)
    try:
        db.session.add(new_card)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}), 400

    return jsonify({"message": "Card created!"}), 201

# Update an existing card
@app.route("/update_card/<int:card_id>", methods=["PATCH"])
def update_card(card_id):
    card = Cards.query.get(card_id)

    if not card:
        return jsonify({"message": "Card not found"}), 404

    question = request.json.get("question")
    answer = request.json.get("answer")

    if question:
        card.question = question
    if answer:
        card.answer = answer

    db.session.commit()

    return jsonify({"message": "Card updated."}), 200

# Delete an existing card
@app.route("/delete_card/<int:card_id>", methods=["DELETE"])
def delete_card(card_id):
    card = Cards.query.get(card_id)

    if not card:
        return jsonify({"message": "Card not found"}), 404

    db.session.delete(card)
    db.session.commit()

    return jsonify({"message": "Card deleted!"}), 200


if __name__ == "__main__":
    with app.app_context():
        db.create_all()

    app.run(debug=True)
