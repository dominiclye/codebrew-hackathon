from flask import request, jsonify
from config import app, db
from .models import Sets
from api.auth.models import User
from flask_login import login_required, current_user, LoginManager
import json

# Routes for Sets

login_manager = LoginManager()
login_manager.init_app(app)

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


def flashcard_routes(app, db):
    @app.route("/sets", methods=["GET"])
    @login_required
    def get_sets():
        sets = Sets.query.filter_by(user_id=current_user.uid).all()
        json_sets = [set.to_json() for set in sets]
        return jsonify({"sets": json_sets})

    # Create a new set
    @app.route("/create_set", methods=["POST"])
    @login_required
    def create_set():
        title = request.json.get("title")
        cards = request.json.get("cards", [])  # Get cards list, default to empty list

        if not title:
            return jsonify({"message": "You must include a title"}), 400

        new_set = Sets(title=title, cards=json.dumps(cards), user_id=current_user.id)  
        try:
            db.session.add(new_set)
            db.session.commit()
        except Exception as e:
            return jsonify({"message": str(e)}), 400

        return jsonify({"message": "Set created!"}), 201





