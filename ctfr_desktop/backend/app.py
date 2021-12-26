from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
import json
from bson import ObjectId
import secret

app = Flask(__name__)       
app.config['MONGO_URI'] = secret.secret_key

mongo = PyMongo(app)

db_users = mongo.db.users
db_usersInfo = mongo.db.userInfos

lookup_user = {
    '$lookup': {
        'from': 'userinfos',
        'localField': '_id',
        'foreignField': 'userId',
        'as': 'info'
    }
}

pipeline = [
    lookup_user
]

class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        return json.JSONEncoder.default(self, o)

@app.route('/users')
def get_users():
    users = db_users.aggregate(pipeline)
    output = [{
        '_id': user['_id'],
        'email': user['email'],
        'info': user['info']
    } for user in users]

    return jsonify(json.loads(JSONEncoder().encode(output)))

if __name__ == "__main__":
    app.run(debug=True)