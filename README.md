 Real-Time Chat Application

Welcome to the Real-Time Chat Application, a seamless messaging platform that allows users to engage in one-on-one conversations. This application supports real-time text and image messaging, profile management, and much more.

________________________________________

 Features

 1. Real-Time One-on-One Chat
   - Instant messaging: Send and receive text messages in real-time.
   - Typing indicators: See when your contact is typing a message.
   - Message notifications: Receive notifications for new messages.
   - Message history: View and search past conversations.

 2. Text & Image Messaging
   - Text chat: Send and receive text messages instantly.
   - Image sharing: Easily send and receive images in real-time.
   - Multimedia support: Images are displayed inline in the conversation for a richer experience.

 3. User Profile Management
   - Profile picture update: Upload and set a profile picture for personalization.
   - Edit profile: Change your username, bio, and other settings.
   - Privacy settings: Control who can view your profile and message you.

 4. User Authentication
   - Sign-up/Login system: Secure user authentication with email/password or social media integration.
   - Real-time sessions: Stay logged in and receive real-time notifications across devices.

________________________________________

 Technology Stack

- Frontend:
  - Vite.js for fast frontend development.
  - React.js for building the user interface.
  - Socket.io for real-time messaging.
  - TailwindCSS for responsive and modern design.

- Backend:
  - Node.js with Express.js for the API server.
  - MongoDB for storing user data, messages, and profiles.
  - JWT (JSON Web Tokens) for secure authentication.
  - Socket.io for real-time communication between clients.

- Cloud Storage:
  - Cloudinary for storing images.

________________________________________

 Installation

 Prerequisites

- Node.js (>=14.x)
- MongoDB (or use MongoDB Atlas for cloud DB)
- Vite.js for frontend build
- npm or yarn for managing packages

 Clone the repository

```
git clone https://github.com/your-username/realtime-chat-app.git
cd realtime-chat-app
```
________________________________________
Backend Setup
1.	Create a .env file in the server folder and add the following variables: 
2.	MONGO_URI=<your_mongo_database_url>
3.	JWT_SECRET=<your_secret_key>
4.	CLOUDINARY_CLOUD_NAME=<your_cloudinary_cloud_name>
5.	CLOUDINARY_API_KEY=<your_cloudinary_api_key>
6.	CLOUDINARY_API_SECRET=<your_cloudinary_api_secret>
7.	PORT=5000
8.	NODE_ENV=development
________________________________________
Build the Project
To install all dependencies, build the project, and prepare everything for development or production, simply run:
```npm run build```
This will install all the required dependencies for both the frontend and backend, build the project, and set everything up and start frontend.
________________________________________
Install and Run the Application
From the root of the project, run the following command to start the backend:
```npm run start```
This command will build and start  the backend servers .
________________________________________
Usage
1.	Sign up: Create a new account by providing your email and password.
2.	Login: After signing up, log in to your account to access the chat features.
3.	Start Chatting: Search for users, select a contact, and start chatting!
4.	Send Images: Click on the image icon in the chat to upload and send images (using Cloudinary).
5.	Update Profile: Go to the profile settings and upload a new profile picture or update your personal details.
________________________________________
Screenshots
1. Login Screen
•	Simple login page where users can sign in or sign up.

2. Chat Interface
•	Clean and minimalistic interface with a message list, a typing area, and an option to send images.
 
3. Profile Settings
•	Option to update the profile picture, change username, and update the status.
 

4. Settings Page
•	Change the theme of the application
 

________________________________________
Contributing
We welcome contributions to this project! If you'd like to help improve the Real-Time Chat Application, please follow these steps:
1.	Fork the repository.
2.	Create a new branch for your feature.
3.	Commit your changes.
4.	Push your changes to your forked repository.
5.	Create a pull request.
________________________________________

