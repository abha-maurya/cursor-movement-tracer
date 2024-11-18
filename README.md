run_server_collection() {
  BAT_FILE_PATH=$1
  if [ -f "$BAT_FILE_PATH" ]; then
    echo "Running the server collection batch file: $BAT_FILE_PATH..."
    # Check if we are on a Windows system
    if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "cygwin" ]]; then
      cmd.exe /C "$BAT_FILE_PATH"
    else
      echo "This script is not running on Windows, skipping the .bat execution."
    fi
  else
    echo "Batch file $BAT_FILE_PATH not found."
  fi
}
