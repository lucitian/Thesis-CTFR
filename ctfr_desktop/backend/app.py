from flask import Flask, jsonify, request, Response
from flask_pymongo import PyMongo
import json
from bson import ObjectId
import secret
from camera import camera
import cv2

app = Flask(__name__, template_folder='../views')       
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

userInfo = [
    lookup_user
]

class JSONEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, ObjectId):
            return str(o)
        return json.JSONEncoder.default(self, o)

@app.route('/users')
def get_users():
    users = db_users.aggregate(userInfo)
    output = [{
        '_id': user['_id'],
        'email': user['email'],
        'info': user['info']
    } for user in users]

    return jsonify(json.loads(JSONEncoder().encode(output)))

# @app.route('/delete-user')
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