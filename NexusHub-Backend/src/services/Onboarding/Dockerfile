# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./
COPY prisma ./prisma/ 
# Install dependencies
RUN npm install

# Copy the rest of your application source code to the container
COPY . .

# Expose the port your application will run on
EXPOSE 5000

# Start your Node.js application
CMD ["npm", "run", "server"]