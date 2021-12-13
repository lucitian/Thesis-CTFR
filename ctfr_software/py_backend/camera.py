import numpy as np
import cv2
import sys

# 0 for default camera, 1 for usb sources
cap = cv2.VideoCapture(0)

cap.set(3, 330)
cap.set(4, 480)

while(True):

    # Capture frame-by-frame
    ret, frame = cap.read()

    # Display the resulting frame
    cv2.imshow('Webcam', frame)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# When everything done, release the capture
cap.release()
cv2.destroyAllWindows()

