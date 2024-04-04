from flask import request

def auth_routes(app, db):
    @app.route('/auth/register', methods=['POST'])
    def register():
        return 'register'

    @app.route('/auth/login', methods=['POST'])
    def login():
        return 'login'