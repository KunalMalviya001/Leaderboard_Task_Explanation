# Leaderboard Task 

## Project Description
This MERN stack project implements a dynamic leaderboard system where users can claim random points and see real-time ranking updates. 
It stores users, their total points, and a history of all point claims in MongoDB.

## Features
- Display a list of 10 default users with the option to add more from the frontend.
- Claim random points (1 to 10) for a selected user via a claim button.
- Store user points and maintain a claim history collection in MongoDB.
- Dynamic leaderboard updates rankings automatically based on total points.

## Technology Stack
- Backend: Node.js, Express.js
- Database: MongoDB
- Frontend: React.js

## Setup Instructions

### Prerequisites
- Node.js and npm installed
- Running MongoDB instance (local or cloud)

### Installation Steps

1. Clone the repository:
   bash
   git clone https://github.com/KunalMalviya001/Leaderboard_Task_Explanation.git
   cd Leaderboard_Task_Explanation

2. Backend setup:

bash
   cd backend
   npm install
   npm run dev
   

3. Frontend setup:

bash
   cd frontend
   npm install
   npm start
 

4. Open your browser and navigate to:
  http://localhost:3000

## API Endpoints

| Endpoint               | Method | Description                                |
| ---------------------- | ------ | ------------------------------------------ |
| /api/users             | GET    | Retrieve all users with their total points |
| /api/users             | POST   | Add a new user                             |
| /api/users/:id/claim   | POST   | Claim random points for the specified user |
| /api/history           | GET    | Retrieve the claim points history          |

## How to Use

1. Select a user from the dropdown or add a new user.
2. Click the **Claim** button to assign random points (1-10) to the selected user.
3. The leaderboard updates dynamically showing user ranks and points.
4. Claim history is logged and accessible via the backend.

