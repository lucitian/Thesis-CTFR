import argparse
import cv2
import time

from yolo import YOLO

ap = argparse.ArgumentParser()
ap.add_argument('-d', '--device', default=0, help='Device to use')
ap.add_argument('-s', '--size', default=416, help='Size for yolo')
ap.add_argument('-c', '--confidence', default=0.4, help='Confidence for yolo')
args = ap.parse_args()

classes = ["Christian_Olandesca", "James_Dela_Pena", "Marc_Rovic_Baja"]

print("[INFO] loading YOLO from disk...")
yolo = YOLO("/Users/baja0/OneDrive/Desktop/Programming/TRAINING AI/yolov4-obj.cfg",
            "/Users/baja0/OneDrive/Desktop/Programming/TRAINING AI/yolov4-obj_best.weights", classes)
             

yolo.size = int(args.size)
yolo.confidence = float(args.confidence)

colors = [(0, 168, 255), (0, 212, 81),  (0, 0, 255)]

print("[INFO] starting webcam...")
cv2.namedWindow("preview")
vc = cv2.VideoCapture(0)

if vc.isOpened():  # try to get the first frame
    rval, frame = vc.read()
else:
    rval = False

starting_time = time.time()
frame_counter = 0

while rval:
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
    
    cv2.imshow("preview", frame)

    rval, frame = vc.read()

    key = cv2.waitKey(20)
    if key == 27:  # exit on ESC
        break

cv2.destroyWindow("preview")
vc.release()
