from config import db
import json
from api.auth.models import User

class Sets(db.Model):
    user_id = db.Column(db.Integer, db.ForeignKey('users.uid'))
    user = db.relationship('User', backref='sets')
    sid = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80), unique=False, nullable=False)
    cards = db.Column(db.Text, default=[])

    def to_json(self):
        return {
            "setId": self.sid,
            "title": self.title,
            "cards": json.loads(self.cards),
            "userId": self.user_id
        }