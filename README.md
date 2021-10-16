## BackendTask
This contains the backend authentication apis for registration and login of a user.
it includes generation of authentication  token on signin, username validation, password validation, 
checking for duplicate emails and validation for all registration data.

## How to Use
1. Clone the repository
2. Do an "npm install".
3. Navigate to the config folder in the root directory and create a "config.env" file in that folder.
4. Create a Database on Mongodb atlas.
5. in the config.env file, paste the following code:
PORT = 8080
SECRET_KEY = softAlliance_secret_key
MONGO_URI = pass in your mongodb cluster connection string here
