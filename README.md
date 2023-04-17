React Netflix Clone

This is a Netflix clone built with React, using Firebase for authentication, the TMDb API for data fetching and retrieval, and styled-components for styling.

Installation

To run this project locally, you can follow these steps:

Clone this repository to your local machine
Navigate to the project directory: cd react-netflix
Install dependencies: npm install
Create a .env file at the root of the project, and add your Firebase and TMDb API keys:

REACT_APP_FIREBASE_API_KEY=<your-firebase-api-key>
REACT_APP_FIREBASE_AUTH_DOMAIN=<your-firebase-auth-domain>
REACT_APP_FIREBASE_PROJECT_ID=<your-firebase-project-id>
REACT_APP_FIREBASE_STORAGE_BUCKET=<your-firebase-storage-bucket>
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=<your-firebase-messaging-sender-id>
REACT_APP_FIREBASE_APP_ID=<your-firebase-app-id>
REACT_APP_TMDB_API_KEY=<your-tmdb-api-key>

Run the app: npm start

Usage

After running the app, you should be able to see the Netflix clone in your browser at http://localhost:3000. You can sign up or log in with your Google account using Firebase authentication, and then browse and search for movies and TV shows using the TMDb API.

Technologies Used

This project uses the following technologies:

React
Firebase
TMDb API
styled-components
Axios

Contributing

If you'd like to contribute to this project, please feel free to submit a pull request or open an issue.

License

This project is licensed under the MIT License. See the LICENSE file for details.
