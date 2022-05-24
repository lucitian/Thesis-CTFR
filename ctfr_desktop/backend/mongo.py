from app import app
from flask_pymongo import PyMongo

import secret

app.config['MONGO_URI'] = secret.secret_key
app.config['MONGODB_SETTINGS'] = {
    'host': 'localhost',
    'port': 5000
}

mongo = PyMongo(app)
