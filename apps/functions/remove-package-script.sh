#!/bin/bash

echo "Remove the script object in package.json. Please wait a moment..."

# Define the path to the package.json file
PACKAGE_PATH="isolate/package.json"

# Read the package.json data
PACKAGE_DATA=$(cat "$PACKAGE_PATH")

echo "Validating package.json. Please wait a moment..."
# Validate JSON data
if ! echo "$PACKAGE_DATA" | jq empty > /dev/null 2>&1; then
  echo "Error: Invalid JSON data in package.json"
  exit 1
fi

# Remove the "scripts" property from the JSON
PACKAGE_JSON=$(echo "$PACKAGE_DATA" | jq 'del(.scripts)')

echo "Modify the pacjage.json data. Please wait a moment..."
# Validate modified JSON
if ! echo "$PACKAGE_JSON" | jq empty > /dev/null 2>&1; then
  echo "Error: JSON validation failed after removing 'scripts' property"
  exit 1
fi

# Write the modified JSON back to the file
echo "$PACKAGE_JSON" | jq '.' > "$PACKAGE_PATH"

echo "Done."
