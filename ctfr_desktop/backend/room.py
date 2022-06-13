from app import app
from mongo import mongo
from flask import jsonify
from bson.objectid import ObjectId
import json

db_rooms = mongo.db.rooms

class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o) 
        return json.JSONEncoder.default(self, o)

@app.route('/getrooms', methods=['GET'])
def get_rooms():
    rooms = db_rooms.find()

    output = [{
        'roomNo': room['roomNo'],
        'userId': room['userId'],
        'name': room['name'],
        'date': room['date'],
        'time': room['time']
    }for room in rooms]

    return jsonify(json.loads(JSONEncoder().encode(output)))