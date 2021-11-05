# Chat App

A chat app for mobile devices using React Native. The app provides users with a chat interface and options to share images and their location.

## Key features

-   User must enter their name before entering the chat room.
-   User can choose one of the available background colors before entering the chat room.
-   The chat room displays existing messages, as well as an input field and "Send" button.
-   In the chat room, user can send images and share their location via the "+" button.
-   Chat data is stored online and offline.
-   When offline:
-   -   user can see all locally stored content.
-   -   user cannot type or send new content.

## Getting started

### 0. Prerequisites

-   Install Node and npm ([installation steps](https://nodejs.org/en/download/))
-   Install Expo `npm install expo-cli --global`

### 1. Install app and dependencies

-   Clone this repository: `git clone https://github.com/EmLmr/chat-app.git`
-   Go to project's root directory: `cd chat-app`
-   Install dependencies: `npm install`

### 2. Run the app using expo

-   Launch the app: `expo start`.
-   Wait a few seconds and Expo will open a browser window.

### 3. Set up a device

-   To use the app on your mobile device, you will first have to install the Expo Go app, scan the QR code appearing on your terminal or browser.
-   To use the app on your PC/laptop, pick an option from the left-hand menu. You might have to install an emulator/simulator.
-   The app will start on your device and you'll be able to use it

### Set Up a Firebase database

To store your messages and media, you will have to set up a [Firestore database](https://firebase.google.com/). Details on how to set up the database can be found in the [Firebase documentation](https://firebase.google.com/docs).

_Note: you will need to setup your own Firebase database and add your own database credentials in /components/Chat.js, between the curly braces of `const firebaseConfig = {YOUR_DATABASE_CREDENTIALS_HERE};` then allow anonymous authorization with your Database.)_

## Tech Stack

-   [React Native](https://reactnative.dev/)
-   [Expo](https://expo.dev/)
-   [Firebase Firestore](https://firebase.google.com/)
-   [Gifted Chat](https://github.com/FaridSafi/react-native-gifted-chat)

## User stories

-   As a new user, I want to be able to easily enter a chat room so I can quickly start talking to my friends and family.
-   As a user, I want to be able to send messages to my friends and family members to exchange the latest news.
-   As a user, I want to send images to my friends to show them what I’m currently doing.
-   As a user, I want to share my location with my friends to show them where I am.
-   As a user, I want to be able to read my messages offline so I can reread conversations at any time.
-   As a user with a visual impairment, I want to use a chat app that is compatible with a screen reader so that I can engage with a chat interface.
