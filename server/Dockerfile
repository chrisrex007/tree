# Node Image
FROM node:alpine AS development

# our working dir
WORKDIR /back

# copying json file to our container
COPY ./package*.json ./

# installing packages
RUN npm install

# copy our source code
COPY . .

# Expose the port (default for Vite is 5173)
EXPOSE 3000

# Command to run the development server
CMD ["node", "server.ts"]