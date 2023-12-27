// Import the necessary libraries
const fs = require('fs');
const path = require('path');

// Define the path to your storage file
const storageFilePath = path.join(__dirname, 'storage', 'storage.json');

// Function to read data from the storage file
function readDataFromFile() {
  try {
    const data = fs.readFileSync(storageFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading data from file:', error);
    return [];
  }
}

// Function to write data to the storage file
function writeDataToFile(data) {
  try {
    fs.writeFileSync(storageFilePath, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing data to file:', error);
  }
}

// Export these functions for use in your React component
module.exports = { readDataFromFile, writeDataToFile };
