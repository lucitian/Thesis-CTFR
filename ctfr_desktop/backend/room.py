from datetime import datetime
from app import app
from mongo import mongo
from flask import jsonify, Response
from bson.objectid import ObjectId
from bson.json_util import dumps
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
        'date': str(room['date']),
        'time': room['time']
    }for room in rooms]

    return jsonify(json.loads(JSONEncoder().encode(output)))

@app.route('/deleteroom/<id>', methods=['DELETE'])
def delete_room(id):
    try:
        dbResponse = db_rooms.delete_one({
            'userId': ObjectId(id)
        })

        if dbResponse.deleted_count == 1:
            return Response(
                response = json.dumps({
                    'message': 'Room deleted!',
                    'send': 'success'
                }),
                status = 200,
                mimetype='application/json'
            )
        return Response(
            response = json.dumps({
                'message': 'Room not found!',
                'send': 'nothing'
            }),
            status = 200,
            mimetype='application/json'
        )
    except Exception as ex:
        print(ex)
        return Response(
            response = json.dumps({
                'message': 'Failed to delete!',
                'send': 'fail'
            }),
            status = 500,
            mimetype='application/json'
        )

@app.route('/fetchdates/<dateArr>')
def fetchdates(dateArr):
    try:
        tempDate = json.loads(dateArr)
        print(tempDate)
        rooms = db_rooms.find({
            'date': {
                '$gte': datetime.strptime(tempDate['tempFrom'], '%Y-%m-%d'),
                '$lte': datetime.strptime(tempDate['tempTo'], '%Y-%m-%d')
            }
        })

        output = [{
            'roomNo': room['roomNo'],
            'userId': room['userId'],
            'name': room['name'],
            'date': str(room['date']),
            'time': room['time']
        }for room in rooms]

        return jsonify(json.loads(JSONEncoder().encode(output)))
    except Exception as ex:
        print(ex)
        return 'Done'