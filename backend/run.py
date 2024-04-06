# run.py
# Copyright 2024 Dominic Lye, Justin Pirie, Riley Plumridge
# Execution point of the flask application, initializes all of the files.

from api.auth.routes import auth_routes
from config import db, app
from api.flashcards.routes import flashcard_routes
from api.todo.routes import todo_routes
from api.gpt_tutor.routes import gpt_routes

auth_routes(app, db)
flashcard_routes(app, db)
todo_routes(app, db)
gpt_routes(app, db)






if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)
