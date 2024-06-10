# Guess The Number Assessment

This is a guessing game based on random numbers and will progress through a series of rounds. The goal of this game is to observe the rising Multiplier value, predict at which point it will freeze, and place points based on the prediction.

Tech Stack: ```TypeScript, React, Redux, Node, Socket.io, Jest, ESLint```

## Features

- Livetime chat
- Ranking system
- Render graph with configurable speed
- Possibility to choose the point and multiplier for the round

### Optimization

- botMessages Controller to create bots and messages from them inside the game
- Jest tests with custom store data to test the all components
- ESLint is configured to maintain code quality and consistency
- Everything is splited into small class components

## Demo

<img src="./public/preview.jpg" width="100%">

> Preview screenshot

## Getting Started

To get a local copy up and running follow these simple steps.

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/favrora/Splash-Task.git
   ```
2. From the root, install NPM packages
   ```sh
   npm install
   ```
3. Start the server:
   ```sh
   npm run server
   ```
4. In the second console, start the frontend:
   ```sh
   npm run start
   ```
