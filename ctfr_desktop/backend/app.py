from flask import Flask, jsonify
from flask_mongoengine import MongoEngine

app = Flask(__name__)

app.config['MONGODB_SETTINGS'] = {
    'db': 'ctfr',
    'host': 'mongodb+srv://admin:ctfradmin@ctfr.rlv9t.mongodb.net/CTFR?retryWrites=true&w=majority'
}

db = MongoEngine()
db.init_app(app)

class user(db.Document):
    username = db.StringField()
    email = db.StringField()

@app.route('/')
def hello():
    return "Hello World!"

if __name__ == "__main__":
    app.run(debug=True)