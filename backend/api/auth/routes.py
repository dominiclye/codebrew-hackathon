from flask import request, jsonify
from .models import User
from config import app, db
from flask_login import login_user, login_required, logout_user, LoginManager, current_user
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from datetime import timedelta



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
                    access_token = create_access_token(identity=user.uid, expires_delta=timedelta(days=1))
                    login_user(user)
                    return jsonify({"message": "User logged in!",
                                    "user_id": current_user.uid,
                                    "access_token": access_token}), 200
                    
                else:
                    return jsonify({"message": "Incorrect password"}), 400
                
    @app.route('/logout')
    def logout():
        logout_user()
        return jsonify({"message": "User logged out!"})
    
    @app.route('/auth/status')
    def auth_status():
        current_user = get_jwt_identity()
        return jsonify({
            'isAuthenticated': current_user.is_authenticated,
            'id': current_user.uid if current_user.is_authenticated else None,
            'logged_in_as': current_user
            })
    
    @app.route('/protected', methods=['GET'])
    @jwt_required()
    def protected():
        current_user = get_jwt_identity()
        return jsonify(logged_in_as=current_user), 200