from flask import Flask, jsonify, request, Response
from flask_pymongo import PyMongo
import mongoengine as me
import json
from bson.objectid import ObjectId
import secret
from camera import camera
import cv2

app = Flask(__name__, template_folder='../views')
app.config['MONGO_URI'] = secret.secret_key
app.config['MONGODB_SETTINGS'] = {
    'host': 'localhost',
    'port': 5000
}

mongo = PyMongo(app)

db_users = mongo.db.users
db_usersInfo = mongo.db.userinfos

#This aggregates the user and userinfos
lookup_user = {
    '$lookup': {
        'from': 'userinfos',
        'localField': '_id',
        'foreignField': 'userId',
        'as': 'info'
    }
}

userInfo = [
    lookup_user
]

class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        return json.JSONEncoder.default(self, o)

@app.route('/users', methods = ['GET'])
def get_users():
    users = db_users.aggregate(userInfo)
    output = [{
        '_id': user['_id'],
        'username': user['username'],
        'email': user['email'],
        'info': user['info']
    } for user in users]

    return jsonify(json.loads(JSONEncoder().encode(output)))

@app.route('/add-user', methods=['POST'])
def add_user():
    try:
        user = {
            'email': request.form['email']
        }
        dbResponse = db_users.insert_one(user)
        return Response(
            response=json.dumps({
                'message': 'user created',
                'id': f'{dbResponse.inserted_id}'
            }),
            status=200,
            mimetype='application/json'
        )
    except Exception as ex:
        print(ex)

@app.route('/edituser/<id>', methods=['PATCH'])
def update_user(id):
    try:            
        dbResponse = db_users.update_one(
            {'_id': ObjectId(id)},
            {'$set': {
                'username': request.json['editUsername'],
                'email': request.json['editEmail'],
            }}
        )

        dbResponseInfo = db_usersInfo.update_one(
            {'userId': ObjectId(id)},
            {'$set': {
                'firstname': request.json['editFirstName'],
                'middleinitial': request.json['editMiddleInitial'],
                'lastname': request.json['editLastName'],
                'contact': int(request.json['editContact']),
                'birthdate': request.json['editBirthdate'],
                'vaxstatus': request.json['editVaxStatus'],
                'address': request.json['editAddress'],
            }}
        )

        if dbResponse.modified_count == 1 or dbResponseInfo.modified_count == 1:
            return Response(
                response = json.dumps({
                    'message': 'Success!',
                    'send': 'success'
                }),
                status = 200,
                mimetype = 'application/json'
            )
        return Response(
            response = json.dumps({
                'message': 'Nothing to update!',
                'send': 'none'
            }),
            status = 200,
            mimetype = 'application/json'
        )
    except Exception as ex:
        print(ex)
        return Response(
            response = json.dumps({
                'message': 'Failed!',
                'send': 'fail'
            }),
            status = 500,
            mimetype = 'application/json' 
        )

# def delete_user():

def gen(camera):
    while True:
        frame = camera.get_frame()
        yield (b'--frame\r\n' b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

@app.route('/open_cam')
def open_cam():
    return Response(gen(camera()), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/close_cam')
def close_cam():
    return Response(camera().close_cam())

if __name__ == "__main__":
    app.run(debug=True)