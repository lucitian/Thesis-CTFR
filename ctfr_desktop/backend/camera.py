from app import app
from mongo import mongo
from flask import Response, jsonify, request
import cv2
import time
from yolo import YOLO
import base64
from database import db_users, db_usersInfo
from bson.objectid import ObjectId
import json

global_names = []

def gen(camera):
    i = 0
    while i <= 30:
        #get camera frame
        frame = camera.get_frame()
        i += 1
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n\r\n')
@app.route('/open_cam')
def open_cam():
    temp_json = list(gen(camera()))
    
    return Response(gen(camera()), mimetype='multipart/x-mixed-replace; boundary=frame')
    # return Response(gen(camera()), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/close_cam')
def close_cam():
    return Response(camera().__del__())

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

@app.route('/fetchnames', methods = ['GET'])
def fetch_name():
    # temp_dict = {}
    # for name in global_names:
    #     if not name in temp_dict:
    #         temp_dict[name] = 1
    #     elif name in temp_dict:
    #         temp_dict[name] += 1

    # max_name = list(temp_dict.keys())[0]
    # max_val = temp_dict[max_name]
    # # print(list(temp_dict.keys())[0], max_val)
    # for name in temp_dict:
    #     if max_val < temp_dict[name]:
    #         max_val = temp_dict[name]
    #         max_name = name

    # print(max_name, max_val )

    # temp_name = (max_name.replace('_', " "))
    temp_name = 'Marc Rovic Baja'
    # print(temp_name)

    # print(camera().test_name)
    # print(global_names)

    try:
        users = db_users.aggregate(userInfo)
        print('sheesh')

        output = [{
            '_id': user['_id'],
            'email': user['email'],
            'username': user['username'],
            'info': user['info']
        } for user in users]

        for user in output:
            variable = f"{user['info'][0]['firstname']} {user['info'][0]['lastname']}"
            if variable == temp_name:
                return jsonify(json.loads(JSONEncoder().encode(user)))

        # return jsonify(json.loads(JSONEncoder().encode(output)))
    except Exception as ex:
        print(ex)
        return Response(
            reponse = json.dumps({
                'message': 'Failed!',
                'send': 'fail'
            }),
            status=500,
            mimetype='application/json'
        )

db_room = mongo.db.rooms

@app.route('/appendroom', methods=['POST'])
def append_room():
    try:
        temp_data = request.json

        to_append = [{
            'roomNo': user[0]['roomNo'],
            'userId': user[0]['userId'],
            'name': user[0]['name'],
            'date': user[0]['date'],
            'time': user[0]['time'],
        }for user in temp_data]

        dbResponse = db_room.insert_many(to_append)

        return Response(
            response=json.dumps({
                'message': 'Append succesful!',
                'send': 'success'
            }),
            status=200,
            mimetype='application/json'
        )
    except Exception as ex:
        print(ex)
        return Response(
            response=json.dumps({
                'message': 'Failed!',
                'send': 'fail'
            }),
            status=500,
            mimetype='application/json'
        )


class camera(object):
    def __init__(self):
        self.video = cv2.VideoCapture(0)
        self.classes = ["Christian Olandesca", "James Dela Pena", "Marc Rovic Baja"]
        self.yolo = YOLO("/Users/baja0/OneDrive/Desktop/Programming/TRAINING AI/yolov4-obj.cfg",
                    "/Users/baja0/OneDrive/Desktop/Programming/TRAINING AI/yolov4-obj_best.weights", self.classes)

        self.yolo.size = 416
        self.yolo.confidence = 0.4

        self.colors = [(0, 168, 255), (0, 212, 81),  (0, 0, 255)]

        self.starting_time = time.time()
        self.frame_counter = 0

        self.test_name = []

    def __del__(self):
        self.video.release()

    def get_frame(self):
        rval, frame = self.video.read()

        width, height, inference_time, results = self.yolo.inference(frame)
        self.frame_counter += 1

        for detection in results:
            id_, name, confidence, x, y, w, h = detection
            cx = x + (w/2)
            cy = y + (h/2)

            color = self.colors[id_]
            cv2.rectangle(frame, (x, y), (x+w, y+h), color, 2)
            text = f"{name}: {round(confidence, 2)}"
            cv2.putText(frame, text, (x, y-5), cv2.FONT_HERSHEY_SIMPLEX, 0.5, color, 2)

            self.test_name.append(name)
        global global_names
        global_names = self.test_name
        ending_time = time.time() - self.starting_time
        fps = self.frame_counter/ending_time

        cv2.putText(frame, f"FPS: {fps}", (20, 50), cv2.FONT_HERSHEY_COMPLEX, 0.7, (0, 255, 0), 2)

        ret, jpeg = cv2.imencode(".jpg", frame)
        return jpeg.tobytes()

