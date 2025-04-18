# Use an official node.js runtime as a parent image
FROM node:23-alpine


# Set the working directory in the container to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY package*.json .

# Install any needed packages specified in package.json
RUN npm install

# Copy the rest of the application code into the container at /app
COPY . .

# Debug: confirm prisma/schema.prisma exists inside the container
RUN ls -l prisma && cat prisma/schema.prisma

RUN npx prisma generate

# Expose port 8383 for the application
EXPOSE 8383 

# Define the command to run the application when the container starts
CMD ["node","src/server.js" ]