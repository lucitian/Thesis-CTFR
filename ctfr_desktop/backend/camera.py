from app import app
from flask import Response
import cv2
import argparse
import time

from yolo import YOLO

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
    
class camera(object):
    def __init__(self):
        self.video = cv2.VideoCapture(0)
        self.test = True

    def __del__(self):
        self.video.release()

    def close_cam(self):
        # try: 
        #     self.video.stop()
        #     self.video.release()
        # except Exception as ex:
        #     print(ex)
        # cv2.destroyAllWindows()
        self.video.release()
        cv2.destroyAllWindows()
        self.test = False
        camera().get_frame()

    def get_frame(self):
        # Run camera without opencv cuda
        # face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")
        # eye_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_eye.xml")

        # while True:
        #     success, frame = self.video.read()

        #     gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        #     faces = face_cascade.detectMultiScale(gray, 1.3, 5)

        #     for (x, y, w, h) in faces:
        #         cv2.rectangle(frame, (x, y), (x + w, y +h), (255, 0, 0), 4)
        #         roi_grey = gray[y:y+w, x:x+w]
        #         roi_color = frame[y:y+h, x:x+w]
        #         eyes = eye_cascade.detectMultiScale(roi_grey, 1.3, 4)
        #         for (ex, ey, ew, eh) in eyes:
        #             cv2.rectangle(roi_color, (ex, ey), (ex + ew, ey + eh), (0, 255, 0), 4)

        #     if not success:
        #         break
        #     else:
        #         ret, buffer = cv2.imencode('.jpg', frame)
        #         frame = buffer.tobytes()
                
        #         return frame

        classes = ["Christian_Olandesca", "James_Dela_Pena", "Marc_Rovic_Baja"]

        print("[INFO] loading YOLO from disk...")
        yolo = YOLO("/Users/baja0/OneDrive/Desktop/Programming/TRAINING AI/yolov4-obj.cfg",
                    "/Users/baja0/OneDrive/Desktop/Programming/TRAINING AI/yolov4-obj_best.weights", classes)
                    

        yolo.size = 416
        yolo.confidence = 0.4

        colors = [(0, 168, 255), (0, 212, 81),  (0, 0, 255)]

        # print("[INFO] starting webcam...")
        # cv2.namedWindow("preview")
        #vc = cv2.VideoCapture(0)

        # if self.video.isOpened():  # try to get the first frame
        #     rval, frame = self.video.read()
        # else:
        #     rval = False

        # if vc.isOpened():  # try to get the first frame
        #     rval, frame = vc.read()
        # else:
        #     rval = False

        starting_time = time.time()
        frame_counter = 0

        while self.test:
            rval, frame = self.video.read()
            key = cv2.waitKey(20)
            if key == 27:  # exit on ESC
                break
            width, height, inference_time, results = yolo.inference(frame)
            frame_counter += 1
            
            for detection in results:
                id, name, confidence, x, y, w, h = detection
                cx = x + (w / 2)
                cy = y + (h / 2)

                # draw a bounding box rectangle and label on the image
                color = colors[id]
                cv2.rectangle(frame, (x, y), (x + w, y + h), color, 2)
                text = "%s (%s)" % (name, round(confidence, 2))
                cv2.putText(frame, text, (x, y - 5), cv2.FONT_HERSHEY_SIMPLEX,
                            0.5, color, 2)

            endingTime = time.time() - starting_time
            fps = frame_counter/endingTime
            
            cv2.putText(frame, f'FPS: {fps}', (20, 50),
                    cv2.FONT_HERSHEY_COMPLEX, 0.7, (0, 255, 0), 2)
            
            #cv2.imshow("preview", frame)

            if self.test == False:
                break
            else:
                ret, buffer = cv2.imencode('.jpg', frame)
                frame = buffer.tobytes()
            
                return frame

        #     rval, frame = self.video.read()

        #     key = cv2.waitKey(20)
        #     if key == 27:  # exit on ESC
        #         break

        # #cv2.destroyWindow("preview")
        # self.video.release()
