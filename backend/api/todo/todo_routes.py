
from flask import request, jsonify
from config import app, db
from models import Task, Lists



# Routes for Tasks



# Create a new task
@app.route("/tasks", methods=["POST"])
def create_task():
    description = request.json.get("description")
    due_date = request.json.get("due_date")
    list_id = request.json.get("list_id")

    if not description:
        return jsonify({"message": "You must include a description"}), 400

    new_task = Task(description=description, due_date=due_date, list_id=list_id)
    try:
        db.session.add(new_task)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}), 400

    return jsonify({"message": "Task created!"}), 201

# Update an existing task
@app.route("/tasks/<int:task_id>", methods=["PATCH"])
def update_task(task_id):
    task = Task.query.get(task_id)

    if not task:
        return jsonify({"message": "Task not found"}), 404

    description = request.json.get("description")
    due_date = request.json.get("due_date")
    complete = request.json.get("complete")

    if description:
        task.description = description
    if due_date:
        task.due_date = due_date
    if complete is not None:
        task.complete = complete

    db.session.commit()

    return jsonify({"message": "Task updated."}), 200

# Delete an existing task
@app.route("/tasks/<int:task_id>", methods=["DELETE"])
def delete_task(task_id):
    task = Task.query.get(task_id)

    if not task:
        return jsonify({"message": "Task not found"}), 404

    db.session.delete(task)
    db.session.commit()

    return jsonify({"message": "Task deleted!"}), 200


# Routes for Lists

# Create a new list
@app.route("/lists", methods=["POST"])
def create_list():
    title = request.json.get("title")

    if not title:
        return jsonify({"message": "You must include a title"}), 400

    new_list = Lists(title=title)
    try:
        db.session.add(new_list)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}), 400

    return jsonify({"message": "List created!"}), 201

# Update an existing list
@app.route("/lists/<int:list_id>", methods=["PATCH"])
def update_list(list_id):
    list_obj = Lists.query.get(list_id)

    if not list_obj:
        return jsonify({"message": "List not found"}), 404

    title = request.json.get("title")

    if not title:
        return jsonify({"message": "You must include a title"}), 400

    list_obj.title = title

    db.session.commit()

    return jsonify({"message": "List updated."}), 200

# Delete an existing list
@app.route("/lists/<int:list_id>", methods=["DELETE"])
def delete_list(list_id):
    list_obj = Lists.query.get(list_id)

    if not list_obj:
        return jsonify({"message": "List not found"}), 404

    db.session.delete(list_obj)
    db.session.commit()

    return jsonify({"message": "List deleted!"}), 200

