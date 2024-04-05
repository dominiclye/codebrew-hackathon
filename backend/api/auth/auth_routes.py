# CRUD -> Create, Read, Update, Delete

# Create a contact, #When a request is sent to create, it has to pass these values:
# - username
# - email
# - password

from flask import request, jsonify
from config import app, db
from models import User

#GET

@app.route("/contacts", methods=["GET"])
def get_contacts():
    contacts = User.query.all()
    json_contacts = list(map(lambda x: x.to_json(), contacts))
    return jsonify({"contacts": json_contacts})


@app.route("/create_contact", methods=["POST"])
def create_contact():
    username = request.json.get("username")
    password = request.json.get("password")
    email = request.json.get("email")

    if not username or not password or not email:
        return (
            jsonify({"message": "You must include a username, password and email"}),
            400,
        )

    new_contact = User(username=username, password=password, email=email)
    try:
        db.session.add(new_contact)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}), 400

    return jsonify({"message": "User created!"}), 201


@app.route("/update_contact/<int:user_id>", methods=["PATCH"])
def update_contact(user_id):
    contact = User.query.get(user_id)

    if not contact:
        return jsonify({"message": "User not found"}), 404

    data = request.json
    contact.username = data.get("username", contact.username)
    contact.password = data.get("password", contact.password)
    contact.email = data.get("email", contact.email)

    db.session.commit()

    return jsonify({"message": "Usr updated."}), 200


@app.route("/delete_contact/<int:user_id>", methods=["DELETE"])
def delete_contact(user_id):
    contact = User.query.get(user_id)

    if not contact:
        return jsonify({"message": "User not found"}), 404

    db.session.delete(contact)
    db.session.commit()

    return jsonify({"message": "User deleted!"}), 200


if __name__ == "__main__":
    with app.app_context():
        db.create_all()

    app.run(debug=True)