from config import db
import datetime

class User(db.Model):
    """The user schema to be used for authentication in the users table

    Args:
        db (_type_): _description_
    """
    __tablename__ = 'users'
    uid = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)
    timestamp = db.Column(db.DateTime, datetime=datetime.utcnow)

