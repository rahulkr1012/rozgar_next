# Use an official Node.js runtime as the base image
FROM node:14.20.1

# Set the working directory inside the container
WORKDIR /var/www/rozgar-v2new

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the entire app directory to the container
COPY . .

# Expose the port that the Next.js app will run on
EXPOSE 5027

# Start the development server with hot-reloading
CMD ["npm", "start"]
