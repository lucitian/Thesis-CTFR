from email.mime import base
from app import app
from mongo import mongo
from database import db_usersInfo, JSONEncoder
from flask import jsonify, make_response, send_file, Response
from bson.objectid import ObjectId

from PIL import Image
from io import BytesIO, StringIO
import json
import base64
import PIL

db_covid_results = mongo.db.usercovidresults

@app.route('/getcovid', methods = ['GET'])
def get_covid():
    user_result = db_covid_results.aggregate([
        {
            '$lookup': {
                'from': 'users',
                'localField': 'userId',
                'foreignField': '_id',
                'as': 'user_email',
            },
        },
        {
            '$lookup': {
                'from': 'userinfos',
                'localField': 'userId',
                'foreignField': 'userId',
                'as': 'info'
            }
        },
        {
            '$project': {'user_email.password': 0}
        }
    ])

    output = [{
        '_id': user['_id'],
        'userId': user['userId'],
        'email': user['user_email'],
        'info': user['info']
    } for user in user_result]
    
    return jsonify(json.loads(JSONEncoder().encode(output)))

@app.route('/getresult/<id>', methods=['GET'])
def get_file(id):
    try:
        dbResult = db_covid_results.find_one_or_404({'userId': ObjectId(id)})
        data = dbResult['image']['data']
        #print(data)
        img_encode = base64.b64encode(data)
        im = Image.open(BytesIO(base64.b64decode(img_encode)))
        
        img_io = BytesIO()
        im = im.save(img_io, 'jpeg')
        img_io.seek(0)

        return send_file(img_io, mimetype='image/jpeg', as_attachment=True, attachment_filename='result.jpg')

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