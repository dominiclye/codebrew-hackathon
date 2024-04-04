
######## Temp Config ###########

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///mydatabase.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)


######## AUTHENTICATION ############







########### USER ###############

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=False, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)

    def to_json(self):
        return {
            "id": self.id,
            "username": self.username,
            "password": self.password,
            "email": self.email,
        }

########### FLASHCARDS ##############


class Cards(db.Model):
    cid = db.Column(db.Integer, primary_key=True)
    question = db.Column(db.String(80), unique=False, nullable=False)
    answer = db.Column(db.String(80), unique=False, nullable=False)
    set_id = db.Column(db.Integer, db.ForeignKey('sets.sid'), nullable=False)

    def to_json(self):
        return {
            "cardId": self.cid,
            "question": self.question,
            "answer": self.answer,
        }

class Sets(db.Model):
    sid = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80), unique=False, nullable=False)
    cards = db.relationship('Cards', backref='set', lazy=True)

    @property #Decorator that allows you to define properties on classes. 
    def num_cards(self):
        return len(self.cards)

    def to_json(self):
        return {
            "setId": self.sid,
            "title": self.title,
            "numCards": self.num_cards,
            "cards": [card.to_json() for card in self.cards]
        }





####### TO-DO #########




class Task(db.Model):
    tid = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(500), unique=False, nullable=False)
    due_date = db.Column(db.DateTime, nullable=True)  # Assuming due date is a datetime field
    complete = db.Column(db.Boolean, default=False) 
    list_id = db.Column(db.Integer, db.ForeignKey('lists.lid'), nullable=False)
    
    #The complete def is for checking if the task has been completed or not, so in the routes I will make it so that
    #when the task is created will have completed status of 0 and then when completed will have 1.
    #So on the frontend make the words grey or a line through them or something and update the check box next to it when the task 
    #has the boolean of 1. 


    def to_json(self):
        return {
            "taskId": self.tid,
            "description": self.description,
            "dueDate": self.due_date.strftime('%Y-%m-%d %H:%M:%S') if self.due_date else None, #From what I found on SOF this could work, but change if nececcary
            "complete": self.complete
        }


class Lists(db.Model):
    lid = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80), unique=False, nullable=False)
    tasks = db.relationship('Task', backref='list', lazy=True)

    @property
    def num_tasks(self):
        return len(self.tasks)
    
    def to_json(self):
        return {
            "listId": self.lid,
            "title": self.title,
            "numTasks": self.num_tasks,
            "tasks": [task.to_json() for task in self.tasks]
        }


########## GPT TUTOR #############



