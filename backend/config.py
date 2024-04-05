# config.py
# Copyright 2024 Dominic Lye, Justin Pirie, Riley Plumridge
# Config for flask app/mysql connectors

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

from dotenv import load_dotenv
load_dotenv()


app = Flask(__name__)
CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///mydatabase.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SECRET_KEY"] = "gippychippy"


db = SQLAlchemy(app)



