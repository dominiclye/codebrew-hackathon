from flask import request, jsonify
from .models import User
from config import app, db
from flask_login import login_user, login_required, logout_user, LoginManager

login_manager = LoginManager()
login_manager.init_app(app)
@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


def auth_routes(app, db):
    @app.route('/register', methods=['POST', 'GET'])
    def register():
        email = request.json.get("email")
        password = request.json.get("password")

        if not password or not email:
            return (
                jsonify({"message": "Missing password and/or email"}),
                400,
            )

        new_user = User(password=password, email=email)
        try:
            db.session.add(new_user)
            db.session.commit()
        except Exception as e:
            return jsonify({"message": str(e)}), 400

        return jsonify({"message": "User created!"}), 201

    @app.route('/auth/login', methods=['POST', 'GET'])
    def login():
        if request.method == 'POST':
            email = request.json.get("email")
            password = request.json.get("password")
            
            user = User.query.filter_by(email=email).first()
            if user:
                if user.password == password:
                    login_user(user, remember=True)
                    return jsonify({"message": "User logged in!"}), 200
                    
                else:
                    return jsonify({"message": "Incorrect password"}), 400
                
    @app.route('/logout')
    @login_required
    def logout():
        logout_user()
        return jsonify({"message": "User logged out!"})