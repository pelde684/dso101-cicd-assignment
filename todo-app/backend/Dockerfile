FROM node:20-alpine

WORKDIR /app

# Copy backend package files
COPY backend/package*.json ./
RUN npm install

# Copy backend code
COPY backend/ ./

# Copy frontend files (so they can be served)
COPY frontend/ ./public/

EXPOSE 5000

CMD ["node", "server.js"]