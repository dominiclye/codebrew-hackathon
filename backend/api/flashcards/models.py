###

# Temp Config before doms plan 

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///mydatabase.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)

###



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

    @property
    def num_cards(self):
        return len(self.cards)

    def to_json(self):
        return {
            "setId": self.sid,
            "title": self.title,
            "numCards": self.num_cards,
            "cards": [card.to_json() for card in self.cards]
        }
