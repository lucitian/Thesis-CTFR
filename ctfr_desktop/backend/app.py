from flask import Flask

app = Flask(__name__, template_folder='../views')

import mongo, database, camera, covid, room

if __name__ == "__main__":
    app.run(debug=True)