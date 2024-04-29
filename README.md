# The official Redux+JS template for Create React App

npx create-react-app my-app --template redux

# npm i json-server

Get a full fake REST API

# Start JSON Server

json-server --watch data.json

# Change port of json-server

by default, json-server takes port 3000 and react also so to change the port we use:

json-server --watch data.json --port 8080

# For Alert use 

npm install --save react-alert react-alert-template-basic

# if an error shows for react-alert installation then use 

npm config set legacy-peer-deps true

# start with npm i but if there is a error shows then use

npm i --legacy-peer-deps