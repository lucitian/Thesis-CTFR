from email.mime import base
from app import app
from mongo import mongo
from database import db_users, db_usersInfo, JSONEncoder
from flask import jsonify, send_file, request, Response
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
        try:
            im = im.save(img_io, 'png')
        except KeyError:
            im = im.save(img_io, 'jpeg/jpg')
        img_io.seek(0)

        return send_file(img_io, mimetype='image/*', as_attachment=True, attachment_filename='result.jpg')

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

@app.route('/deletecovid/<id>', methods=['DELETE'])
def delete_covid(id):
    try:
        dbResponse = db_covid_results.delete_one({
            'userId': ObjectId(id)
        })

        if dbResponse.deleted_count == 1:
            return Response(
                response=json.dumps({
                    'message': 'COVID-19 Request Deleted Successfully!',
                    'send': 'success'
                }),
                status=200,
                mimetype='application/json'
            )
        return Response(
            response=json.dumps({
                'message': 'COVID-19 Request not found!',
                'send': 'none'
            }),
            status=200,
            mimetype='application/json'
        )
    except Exception as ex:
        return Response(
            reponse=json.dumps({
                'message': 'Failed to delete COVID-19 request.',
                'send': 'fail'
            }),
            status=500,
            mimetype='application/json'
        )

@app.route('/updatecovid/<id>', methods=['PATCH'])
def update_covid(id):
    try:
        dbResponse = db_usersInfo.update_one(
            {'userId': ObjectId(id)},
            {'$set': {
                'covidstatus': request.json['approveCovidStatus']
            }}
        )

        if dbResponse.modified_count == 1:
            return Response(
                response = json.dumps({
                    'message': 'COVID-19 status updated successfully!',
                    'send': 'success'
                }),
                status = 200,
                mimetype='application/json'
            )
        return Response(
            response=json.dumps({
                'message': 'Nothing to update!',
                'send': 'none'
            }),
            status=200,
            mimetype='application/json'
        )
    except Exception as ex:
        return Response(
            response=json.dumps({
                'message': 'Failed to update COVID-19 Status!',
                'send': 'fail'
            }),
            status=500,
            mimetype='application/json'
        )