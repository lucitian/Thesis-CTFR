from app import app
from base64 import encode
from flask import jsonify, request, Response
from flask_pymongo import PyMongo
from bson.objectid import ObjectId
import secret
import json
import bcrypt

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

@app.route('/adduser', methods=['POST'])
def add_user():
    try:
        user = {
            'username': request.json['addUsername'],
            'email': request.json['addEmail'],
            'password': bcrypt.hashpw(request.json['addPassword'].encode('utf-8'), bcrypt.gensalt())
        }     
        if (user['username'] != "" or user['email'] != ""):
            dbResponse = db_users.insert_one(user)
        else:
            return Response(
                response = json.dumps({
                    'message': 'Incomplete!',
                    'send': 'incomplete'
                }),
                status = 500,
                mimetype = 'application/json'
            )

        userInfo = {
            'userId': dbResponse.inserted_id,
            'firstname': request.json['addFirstName'],
            'middleinitial': request.json['addMiddleInitial'],
            'lastname': request.json['addLastName'],
            'contact': int(request.json['addContact']),
            'birthdate': request.json['addBirthdate'],
            'vaxstatus': request.json['addVaxStatus'],
            'address': request.json['addAddress'],
            'covidstatus': request.json['addCovidStatus']
        }
        if (user['firstname'] != "" or
            user['middleinitial'] != "" or
            user['lastname'] != "" or
            user['contact'] != "" or
            user['birthdate'] != "" or
            user['vaxstatus'] != "" or
            user['address'] != "" or
            user['covidstatus'] != ""
        ):
            dbResponseInfo = db_usersInfo.insert(userInfo)
        else:
            return Response(
                response = json.dumps({
                    'message': 'Incomplete!',
                    'send': 'incomplete'
                }),
                status = 500,
                mimetype = 'application/json'
            )

        return Response(
            response=json.dumps({
                'message': 'user created',
                'id': f'{dbResponse.inserted_id, dbResponseInfo.inserted_id}',
                'send': 'success'
            }),
            status=200,
            mimetype='application/json'
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
                'covidstatus': request.json['editCovidStatus'],
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
        return Response(
            response = json.dumps({
                'message': 'Failed!',
                'send': 'fail'
            }),
            status = 500,
            mimetype = 'application/json' 
        )

@app.route('/deleteuser/<id>', methods=['DELETE'])
def delete_user(id):
    try:
        dbResponse = db_users.delete_one({
            '_id': ObjectId(id)
        })
        dbResponseInfo = db_usersInfo.delete_one({
            'userId': ObjectId(id)
        })
        if dbResponse.deleted_count == 1 and dbResponseInfo.deleted_count == 1:
            return Response(
                response = json.dumps({
                    'message': 'User deleted',
                    'send': 'success'
                }),
                status = 200,
                mimetype='application/json'
            )
        return Response(
            response = json.dumps({
                'message': 'User not found!',
                'send': 'nothing'
            }),
            status = 200,
            mimetype='application/json'
        )
    except Exception as ex:
        print(ex)
        return Response(
            response = json.dumps({
                'message': 'Failed',
                'send': 'fail'
            }),
            status = 500,
            mimetype='application/json'
        )
