# MedVision – MERN Stack Medical Image Management System

MedVision is a MERN stack web application designed to demonstrate full-stack development skills such as CRUD operations, file uploads, API design, and UI rendering. The application allows adding patients, uploading medical images, and generating simulated diagnostic reports (no real AI used).

---

## Setup Steps

### 1. Clone the project


git clone https://github.com/Kishore22cs072/Medvision_MERNSTACK_project-.git
cd Medvision_MERNSTACK_project-


### 2. Backend setup
cd backend
npm install


Create a `.env` file:
PORT=5000
MONGO_URI=your_mongodb_connection_string
UPLOAD_DIR=uploads


Start the backend:

Backend will run at:
http://localhost:5000


### 3. Frontend setup
Open another terminal:
cd frontend
npm install
npm run dev


Frontend will run at:
http://localhost:5173


Make sure inside `frontend/.env` you add:
VITE_API_URL=http://localhost:5000


---

## Tech Stack Used

### Frontend
- React (Vite)
- React Router DOM
- CSS (custom component-based styling)
- Fetch API

### Backend
- Node.js  
- Express.js  
- Multer (file uploads)  
- Mongoose (MongoDB ODM)  
- dotenv (environment variables)

### Database
- MongoDB Atlas (cloud-based database)

---

## Screenshots

Include:
- Dashboard UI

<img width="1920" height="1020" alt="Medical Image Classification App - Google Chrome 16-11-2025 18_50_09" src="https://github.com/user-attachments/assets/b3194c38-7f13-4c57-be47-50a8dfb65435" />



<img width="1920" height="1020" alt="Medical Image Classification App - Google Chrome 16-11-2025 18_50_17" src="https://github.com/user-attachments/assets/1dd5db92-4b0d-4c65-8e79-dfc85942913d" />



- About

<img width="1920" height="1020" alt="Medical Image Classification App - Google Chrome 16-11-2025 18_50_28" src="https://github.com/user-attachments/assets/cf6951f4-604a-41c9-9d8c-69529628d27f" />

- Services

<img width="1920" height="1020" alt="Medical Image Classification App - Google Chrome 16-11-2025 18_50_57" src="https://github.com/user-attachments/assets/ab21aeb9-ed13-47b7-9c6e-462282e6ab9d" />

- Contact

<img width="1920" height="1020" alt="Medical Image Classification App - Google Chrome 16-11-2025 18_51_02" src="https://github.com/user-attachments/assets/c4d0115d-c926-4bfe-9082-905e1e1ecfb8" />

- Step By Step process:

  <img width="1920" height="1020" alt="Medical Image Classification App - Google Chrome 16-11-2025 18_52_02" src="https://github.com/user-attachments/assets/e032708b-3a56-46ed-bde4-04ae8d521dd3" />


  <img width="1920" height="1020" alt="Medical Image Classification App - Google Chrome 16-11-2025 18_52_43" src="https://github.com/user-attachments/assets/be7c0ca1-b500-4d8c-9cad-38a126fe3d12" />


  <img width="1920" height="1020" alt="Medical Image Classification App - Google Chrome 16-11-2025 18_52_51" src="https://github.com/user-attachments/assets/49c7ed26-1b2b-48cc-9475-8b84f2098e50" />


  <img width="1920" height="1020" alt="Medical Image Classification App - Google Chrome 16-11-2025 18_53_21" src="https://github.com/user-attachments/assets/478dbe4a-bfbd-4bfc-8e0b-bc6474795f36" />


  <img width="1920" height="1020" alt="Medical Image Classification App - Google Chrome 16-11-2025 18_53_48" src="https://github.com/user-attachments/assets/0a9804d4-afcf-4cc3-bd49-a79469a04348" />


  <img width="1920" height="1020" alt="Medical Image Classification App - Google Chrome 16-11-2025 18_54_00" src="https://github.com/user-attachments/assets/b175ca32-626e-4028-9925-45bb502bd654" />


  <img width="1920" height="1020" alt="Screenshot 16-11-2025 18_55_35" src="https://github.com/user-attachments/assets/2756ea8c-26ff-4c30-a749-2710a89a41ca" />


  <img width="1920" height="1020" alt="Cluster0 Data _ Cloud_ MongoDB Cloud 16-11-2025 18_55_54" src="https://github.com/user-attachments/assets/415695a1-8285-4d29-84c3-9563321eac30" />

---

## Assumptions & Bonus Features Implemented

### Assumptions
- This is a **full-stack demonstration project**, not a real medical diagnostic tool.
- Diagnosis results are **simulated/randomly generated** for UI demonstration.
- Images are stored locally in the backend `/uploads` folder (editable for cloud storage).
- No authentication or role-based access is implemented (can be added later).

### Bonus Features
- Additional pages (About, Services, Contact) using React Router.
- Clean modular backend structure (controllers, routes, models).
- Responsive and modern UI layout.
- Random report generator for testing without uploading images.
- Timestamped reports stored per patient in MongoDB.
- Reusable React components for cleaner project structure.

---

## If you found this project helpful, consider starring the repository!
