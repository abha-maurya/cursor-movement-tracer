#!/bin/bash

# Exit on error
set -e

# Function to clone a repository if it doesn't exist
clone_repo() {
  REPO_URL=$1
  FOLDER_NAME=$2

  if [ ! -d "$FOLDER_NAME" ]; then
    echo "Cloning $REPO_URL into $FOLDER_NAME..."
    git clone "$REPO_URL" "$FOLDER_NAME"
  else
    echo "Repository $FOLDER_NAME already exists. Pulling latest changes..."
    cd "$FOLDER_NAME" && git pull && cd ..
  fi
}

# Flask Server Setup
setup_flask_server() {
  SERVER_NAME=$1
  echo "Setting up Flask server: $SERVER_NAME..."

  cd "$SERVER_NAME"

  # Create virtual environment if it doesn't exist
  if [ ! -d "venv" ]; then
    echo "Creating virtual environment for $SERVER_NAME..."
    python3 -m venv venv
  fi

  # Activate virtual environment and install dependencies
  source venv/bin/activate
  echo "Installing Python dependencies for $SERVER_NAME..."
  pip install -r requirements.txt

  # Start the Flask server
  echo "Starting Flask server: $SERVER_NAME..."
  nohup python3 app.py > "$SERVER_NAME.log" 2>&1 &

  deactivate
  cd ..
}

# Node.js Server Setup
# setup_node_server() {
#   SERVER_NAME=$1
#   echo "Setting up Node.js server: $SERVER_NAME..."

#   cd "$SERVER_NAME"

#   # Install dependencies
#   echo "Installing Node.js dependencies for $SERVER_NAME..."
#   npm install

#   # Start the Node.js server
#   echo "Starting Node.js server: $SERVER_NAME..."
#   nohup npm start > "$SERVER_NAME.log" 2>&1 &

#   cd ..
# }

# Clone Repositories
echo "Cloning repositories..."
clone_repo "https://github.com/CTOaerofoyl/PassengerMapServer.git" "PassengerMapServer"
# clone_repo "https://github.com/username/flask_server_2.git" "flask_server_2"
# clone_repo "https://github.com/username/flask_server_3.git" "flask_server_3"
# clone_repo "https://github.com/username/flask_server_4.git" "flask_server_4"
# clone_repo "https://github.com/username/node_server.git" "node_server"

# Setup and Run Servers
echo "Setting up and starting all servers..."
setup_flask_server "PassengerMapServer"
# setup_flask_server "flask_server_2"
# setup_flask_server "flask_server_3"
# setup_flask_server "flask_server_4"
# setup_node_server "node_server"

echo "All servers are up and running!"
