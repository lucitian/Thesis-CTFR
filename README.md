# CTFR
CTFR is Contact Tracing software that uses Facial Recognition and will be implemented for university usage.

## Installation and Preparation
### Mobile Application
The Mobile Application requires the following:
* React Native

For the dependencies of the project:
```
Simply type npm install or yarn inside the directory folder

Python:
pip install flask
```

Electron
```
npm install --save-dev electron
npm install electron-reload
npm install realm --save
```

MongoDB 
```
1. Install mongoDB community sever
2. Install postman
```

Notes:
You must provide your own secret.js and secret_api.js by creating your own js files. Then write this:
```
module.exports = {
    url: '{url}'
}
```
On secret.js, provide the url of your mongodb collection, and on the secret_api.js, provide the url provided by the ngrok.
