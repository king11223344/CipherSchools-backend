# CipherSchools Backend Readme

Welcome to the CipherSchools backend repository! This repository contains the server-side code for the CipherSchools website. By following the instructions below, you will be able to set up the backend server on your localhost or host it on an online server provider.

## Prerequisites

Before proceeding, ensure that you have the following installed on your system:

- Node.js: The backend is built using Node.js, so you will need to have it installed. You can download Node.js from the official website: [https://nodejs.org](https://nodejs.org)

- MongoDB: CipherSchools backend relies on MongoDB for data storage. You will need to have MongoDB installed or have access to a MongoDB database. You can create a MongoDB database on MongoDB Atlas, a cloud-hosted MongoDB service. Sign up and obtain the MongoDB URL from [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas).

## Getting Started

To set up the CipherSchools backend server, follow these steps:

1. Clone the repository: Start by cloning this repository to your local machine. You can use Git to clone the repository, or you can download the ZIP file and extract it.

```bash
git clone https://github.com/king11223344/CipherSchools-backend.git
```
2. Install dependencies: Navigate to the project directory and install the required dependencies using npm, the Node.js package manager.
``` bash
npm install
```

3. Configure MongoDB URL: Open the `app.js` file in a text editor and replace the `process.env.REACT_APP_MONGODB_URL` placeholder with your MongoDB URL obtained from MongoDB Atlas.

 ```bash
   const mongoURL =
  process.env.REACT_APP_MONGODB_URL
```
4. Run the server: Start the backend server by running the following command in the project directory:
``` bash
node app.js
```
The server will start running locally on http://localhost:3000

##Hosting on Online Server Providers

If you prefer to host the backend server on an online server provider instead of running it locally, you can follow these general steps:

1. Choose a server provider: There are various server providers available such as Amazon Web Services (AWS), Google Cloud Platform (GCP), Microsoft Azure, Heroku, etc. Select the one that suits your requirements.

2. Set up the server: Create a new server instance on your chosen provider and ensure that it has Node.js and MongoDB installed. Refer to the documentation of your provider for detailed instructions.

3. Deploy the code: Upload the backend code to the server instance. You can use Git, FTP, or any other method supported by your server provider.

4. Install dependencies: Once the code is on the server, navigate to the project directory and install the dependencies using npm, just like in the local setup.
``` bash
npm install
```
5. Configure MongoDB URL: Follow the same steps as in the local setup to configure the MongoDB URL
6. Start the server: Run the server using the appropriate command supported by your server provider. Typically, this would involve running the following command:
``` bash
node app.js
```
The server will start running on the public IP or domain name provided by your server provider.

##API Documentation
To interact with the CipherSchools backend API, refer to the app.js file where the api structure can be understood.
   
