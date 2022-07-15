# CTFR
CTFR is Contact Tracing software that uses Facial Recognition and will be implemented for university usage.

## Installation and Preparation
### Desktop Application
The Desktop Application requires the following:
* Python 3.8.*
* ElectronJS

For the libraries of the project:
```
Use 'pip install' on the command.
pip install flask
pip install bcrypt
pip install dnspython
pip install flask-PyMongo
pip install keras
pip install opencv

And use 'npm install' to install all required JS libraries.
npm install --save-dev electron
npm install electron-reload
npm install realm --save
```

### Mobile Application
The Mobile Application requires the following:
* React Native

For the dependencies of the project:
```
Simply type npm install or yarn inside the directory folder
```

### Database
MongoDB 
```
1. Install mongoDB community sever
2. Install postman
```

Notes:
You must provide your own .env and secret_api.js by creating your own js files. Then write this:
```
MONGO_ATLAS = {mongo_url}

EMAIL_USER = {test_email}
EMAIL_PASS = {test_password}
```
On .env, provide the url of your mongodb collection, and email and password of the desired email to be used, while on the secret_api.js, provide the url provided by the ngrok.

On verify.js, open the CodeInput component from node_modules using ctrl + left click or go through node_modules and locate react-native-confirmation-code-input, then open the ConfirmationCodeInput.js inside the components folder, then remove the 'flex: 1' from the StyleSheet of container.