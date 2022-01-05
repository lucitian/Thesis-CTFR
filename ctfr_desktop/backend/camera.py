import cv2

class camera(object):
    def __init__(self):
        self.video = cv2.VideoCapture(0)

    def __del__(self):
        self.video.release()

    def close_cam(self):
        self.video.release()
        cv2.destroyAllWindows()

    def get_frame(self):
        while True:
            success, frame = self.video.read()

            if not success:
                break
            else:
                ret, buffer = cv2.imencode('.jpg', frame)
                frame = buffer.tobytes()
                
                return frame