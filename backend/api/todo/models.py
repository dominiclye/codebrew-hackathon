from config import db
import json

class Lists(db.Model):
    user_id = db.Column(db.Integer, db.ForeignKey('users.uid'))
    user = db.relationship('User', backref='lists')
    lid = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80), unique=False, nullable=False)
    tasks = db.Column(db.Text, default=[])

    def to_json(self):
        return {
            "listId": self.lid,
            "title": self.title,
            "tasks": json.loads(self.tasks),
            "userId": self.user_id,
        }