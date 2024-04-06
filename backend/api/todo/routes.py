from flask import request, jsonify
from .models import Lists
from api.auth.models import User
from flask_jwt_extended import jwt_required, get_jwt_identity
import json

def todo_routes(app, db):
    @app.route("/lists", methods=["GET"])
    @jwt_required()
    def get_lists():
        current_user = get_jwt_identity()
        lists = Lists.query.filter_by(user_id=current_user).all()
        json_list = [list.to_json() for list in lists]
        return jsonify({"lists": json_list})

    @app.route("/create_list", methods=["POST"])
    @jwt_required()
    def create_list():
        title = request.json.get("title")
        tasks = request.json.get("tasks", [])
        user_id = request.json.get("user_id")

        if not title:
            return jsonify({"message": "You must include a title"}), 400

        new_list = Lists(title=title, tasks=json.dumps(tasks), user_id=user_id)  
        try:
            db.session.add(new_list)
            db.session.commit()
        except Exception as e:
            return jsonify({"message": str(e)}), 400

        return jsonify({"message": "List created!"}), 201

    # @app.route("/sets/<int:list_id>", methods=["GET"])
    # @jwt_required()
    # def get_list(list_id):
    #     current_user = get_jwt_identity()
    #     list = Lists.query.filter_by(lid=list_id, user_id=current_user).first()
    #     if not list:
    #         return jsonify({"message": "Set not found"}), 404
    #     return jsonify(list.to_json())




