from config import db

class Task(db.Model):
    user_id = db.Column(db.Integer, db.ForeignKey('users.uid'))
    user = db.relationship('User', backref='tasks')
    tid = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80), unique=False, nullable=False)
    description = db.Column(db.Text, default="")
    due_date = db.Column(db.DateTime, nullable=True)
    
    def to_json(self):
        return {
            "taskId": self.tid,
            "title": self.title,
            "description": self.description,
            "dueDate": self.due_date,
            "userId": self.user_id
        }