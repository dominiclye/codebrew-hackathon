from flask import request, jsonify
from .models import Task
from flask_jwt_extended import jwt_required, get_jwt_identity
import json

def todo_routes(app, db):
    @app.route("/tasks", methods=["GET"]):
    @jwt_required()
    def get_tasks():
        current_user = get_jwt_identity()
        tasks = Task.query.filter_by(user_id=current_user).all()
        json_tasks = [task.to_json() for task in tasks]
        return jsonify({"tasks": json_tasks})

    @app.route("/create-task", methods=["POST"])
    @jwt_required()
    def create_task():
        title = request.json.get("title")
        desc = request.json.get("desc")
        due_date = request.json.get("due_date")
        user_id = request.json.get("user_id")

        if not title:
            return jsonify({"message": "You must include a title"}), 400
        
        new_task = Task(title=title, description=desc, due_date=due_date, user_id=user_id)
        try:
            db.session.add(new_task)
            db.session.commit()
        except Exception as e:
            return jsonify({"message": str(e)}), 400
        
        return jsonify({"message": "Task created successfully!"})
