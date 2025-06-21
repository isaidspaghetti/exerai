FROM node:18-alpine

WORKDIR /app

# Copy package files first for better caching
COPY package.json package-lock.json ./
RUN npm install

# Don't copy source code - it will be mounted as volume
# COPY . .

EXPOSE 3000
CMD ["npm", "run", "start-no-overlay"] 