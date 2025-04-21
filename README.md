# Smithery Runner

A modern UI for running Smithery on RunPod with Model Context Protocol support.

![Smithery Runner](https://raw.githubusercontent.com/phxdev1/smithery-runner-app/main/screenshot.png)

## Features

- Modern UI with Tailwind CSS
- Dark/light mode support with system preference detection
- Real-time command output via Server-Sent Events (SSE)
- Server uptime monitoring
- Runs Smithery via NPX commands
- Exposes Model Context Protocol over configurable ports
- Copy output functionality
- Responsive design for all screen sizes

## Running on RunPod

This project is designed to be run on RunPod. To deploy it:

1. Create a new pod on RunPod
2. Use the Docker image: `magickai/smithery-runner:latest`
3. Expose the following ports:
   - Port 3000 (for the UI)
   - Port 8000 (for the Smithery server)

### RunPod Quick Deploy

1. Log in to RunPod
2. Click "Deploy"
3. Select "Custom" template
4. Set Docker Image to `magickai/smithery-runner:latest`
5. Add the following ports:
   - Container Port: 3000, Exposed Port: 3000 (for the UI)
   - Container Port: 8000, Exposed Port: 8000 (for the Smithery server)
6. Select desired instance type (CPU is sufficient)
7. Click "Deploy"

Once deployed, you can access:
- The Smithery Runner UI at: `https://[your-runpod-url]:3000`
- The Smithery MCP server at: `https://[your-runpod-url]:8000`

## Usage

1. Access the Smithery Runner UI
2. Enter the NPX command (default is `@smithery/cli serve`)
3. Specify the port to expose the Smithery server on (default is 8000)
4. Click "Run Smithery"
5. Watch the real-time output in the console
6. Once running, the server information will display with status, URL, and uptime

## Development

```bash
# Clone the repository
git clone https://github.com/phxdev1/smithery-runner-app.git
cd smithery-runner-app

# Install dependencies
npm install

# Build CSS
npm run build:css

# Run development server with hot-reloading CSS
npm run dev
```

## Docker Build

```bash
# Build the Docker image locally
docker build -t magickai/smithery-runner .

# Run the container
docker run -p 3000:3000 -p 8000:8000 magickai/smithery-runner
```

## GitHub Actions

This repository uses GitHub Actions to automatically build and push a Docker image to Docker Hub. The workflow is triggered on pushes to the main branch.

To set up GitHub Actions for your fork:

1. Fork this repository
2. Go to your fork's Settings > Environments
3. Click "New environment" and name it "production"
4. Click "Configure environment"
5. Under "Environment secrets", add the following secrets:
   - `DOCKER_HUB_USERNAME`: Your Docker Hub username
   - `DOCKER_HUB_ACCESS_TOKEN`: Your Docker Hub access token

To get a Docker Hub access token:
1. Log in to Docker Hub
2. Go to Account Settings > Security
3. Create a new access token with appropriate permissions (Read & Write)

## Technologies Used

- Node.js and Express.js for the server
- Tailwind CSS for styling
- Feather Icons for UI elements
- Server-Sent Events (SSE) for real-time command output
- Docker for containerization

## License

MIT
