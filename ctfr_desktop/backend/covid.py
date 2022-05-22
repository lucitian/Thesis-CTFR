from app import app
from mongo import mongo
from database import db_usersInfo, JSONEncoder
from flask import jsonify
import json

db_covid_results = mongo.db.usercovidresults

lookup_user = {
    '$lookup': {
        'from': 'userinfos',
        'localField': 'userId',
        'foreignField': 'userId',
        'as': 'info'
    }
}

userInfo = [
    lookup_user
]

@app.route('/getcovid', methods = ['GET'])
def get_covid():
    user_result = db_covid_results.aggregate(userInfo)

    output = [{
        '_id': user['_id'],
        'userId': user['userId'],
        'image': user['image'],
        'info': user['info']
    } for user in user_result]

    return jsonify(json.loads(JSONEncoder().encode(output)))