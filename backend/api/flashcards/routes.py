from flask import request, jsonify
from .models import Sets
from api.auth.models import User
from flask_jwt_extended import jwt_required, get_jwt_identity
import json

def flashcard_routes(app, db):
    @app.route("/sets", methods=["GET"])
    @jwt_required()
    def get_sets():
        current_user = get_jwt_identity()
        sets = Sets.query.filter_by(user_id=current_user).all()
        json_sets = [set.to_json() for set in sets]
        return jsonify({"sets": json_sets})

    @app.route("/create_set", methods=["POST"])
    @jwt_required()
    def create_set():
        title = request.json.get("title")
        cards = request.json.get("cards", [])
        user_id = request.json.get("user_id")

        if not title:
            return jsonify({"message": "You must include a title"}), 400

        new_set = Sets(title=title, cards=json.dumps(cards), user_id=user_id)  
        try:
            db.session.add(new_set)
            db.session.commit()
        except Exception as e:
            return jsonify({"message": str(e)}), 400

        return jsonify({"message": "Set created!"}), 201

    @app.route("/sets/<int:set_id>", methods=["GET"])
    @jwt_required()
    def get_set(set_id):
        current_user = get_jwt_identity()
        set = Sets.query.filter_by(sid=set_id, user_id=current_user).first()
        if not set:
            return jsonify({"message": "Set not found"}), 404
        return jsonify(set.to_json())




