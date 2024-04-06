from config import db
from datetime import datetime
from flask_login import UserMixin

class User(db.Model, UserMixin):
    """The user schema to be used for authentication in the users table

    Args:
        db (_type_): _description_
    """
    __tablename__ = 'users'
    uid = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

    def json_export(body):
        return {
            "uid": body.uid,
            "email": body.email,
            "password": body.password,
            "timestamp": body.timestamp
        }
    
    def get_id(self):
        return str(self.uid)

