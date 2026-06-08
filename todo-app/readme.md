# DSO101 Assignment 1 - Todo List Deployment
 # Student: Pelden Nidup | ID: 02250360
Live URLs

Frontend: https://fe-todo-02250360.onrender.com
Backend: https://be-todo-02250360.onrender.com


# Part A: Docker Image Deployment
Step 1: Built and pushed images to Docker Hub
bashdocker build -t peldenidup123/be-todo:02250360 .
docker push peldenidup123/be-todo:02250360
![alt text](image.png)

docker build -t peldenidup123/fe-todo:02250360 .
docker push peldenidup123/fe-todo:02250360
![alt text](image-1.png)

# Step 2: Deployed Backend on Render.com

Created Web Service → Existing Image → docker.io/peldenidup123/be-todo:02250360
Set environment variables: DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, PORT

![alt text](image-2.png)

# Step 3: Created PostgreSQL Database on Render.com

Created a new PostgreSQL service named todo-db
Connected credentials to backend environment variables

![alt text](image-3.png)

Step 4: Deployed Frontend on Render.com

Created Web Service → Existing Image → docker.io/peldenidup123/fe-todo:02250360
Set REACT_APP_API_URL=https://be-todo-02250360.onrender.com

![alt text](image-4.png)

# Step 5: App Working
 Todo app live at https://fe-todo-02250360.onrender.com 

![alt text](image-5.png)

# Part B: Automated Deployment

Every Git push to main triggers an auto-deploy on Render
render.yaml configures both frontend and backend services
![alt text](image-6.png)



# Challenges Faced

React Environment Variables: React bakes environment variables into the app at build time. Changing REACT_APP_API_URL on Render alone did not work — the .env file had to be updated before rebuilding the Docker image.
Wrong Container Registry: The Render service was initially pulling from GitHub Container Registry (ghcr.io) instead of Docker Hub. This was fixed by updating the image source in Render settings to docker.io/peldenidup123/fe-todo:02250360.
Database Connection: The backend .env file had localhost as the database host, which does not work in a cloud environment. This was resolved by creating a real PostgreSQL database on Render and updating the environment variables with the correct credentials.


# Solution
The solution involved building and deploying a full-stack Todo List application using Docker and Render.com. The application consists of three components: a React frontend, a Node.js/Express backend, and a PostgreSQL database.
For Part A, Docker images were built for both the frontend and backend and pushed to Docker Hub using the student ID as the image tag. These images were then deployed on Render.com as separate Web Services. A managed PostgreSQL database was also created on Render.com and connected to the backend using environment variables.
For Part B, the application was configured for automated deployment. The render.yaml blueprint file was used to define the multi-service setup, so that every new commit pushed to the main branch on GitHub automatically triggers a new build and deployment on Render.com.
Environment variables were used throughout to keep sensitive credentials such as database passwords and API URLs out of the source code.



# Reflection
This assignment provided valuable hands-on experience with containerization and cloud deployment. Before this assignment, Docker felt like a complex tool, but building and pushing images to Docker Hub made the process much clearer.
One of the most important lessons learned was understanding the difference between build-time and runtime environment variables in React. This is a common source of confusion and something that would not have been discovered without actually deploying the application in a real environment.
Working with Render.com also gave practical experience with managing multiple services — frontend, backend, and database — and understanding how they communicate with each other in a cloud environment using environment variables.
Overall, this assignment helped bridge the gap between local development and real-world deployment, which is a core skill in modern software engineering and DevOps.