FROM node:18

WORKDIR /app

# Install necessary packages
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    git \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Copy package files first for better caching
COPY package*.json ./
RUN npm install

# Build CSS
COPY tailwind.config.js ./
COPY src ./src
RUN npx tailwindcss -i ./src/input.css -o ./public/styles.css

# Copy the rest of the application
COPY . .

# Expose ports (UI and Smithery server)
EXPOSE 3000 8000

# Start the application
CMD ["npm", "start"]
