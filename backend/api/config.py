# config.py
# Copyright 2024 Dominic Lye, Justin Pirie, Riley Plumridge
# Config for flask app/mysql connectors

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///mydatabase.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)