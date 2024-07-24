const fs = require('fs');

// Paths for the source and destination files
const sourceFilePath = 'source.txt'; // Replace with the path to your source file
const destinationFilePath = 'destination.txt'; // Replace with the path to your destination file

// Read the content of the source file
fs.readFile(sourceFilePath, 'utf8', (err, data) => {
  if (err) {
    console.error(`Error reading file: ${err}`);
    return;
  }

  console.log('Original content:', data);

  // Modify the content (for example, append a line)
  const modifiedData = data + '\nThis is an appended line(new line).';

  // Write the modified content to the destination file
  fs.writeFile(destinationFilePath, modifiedData, 'utf8', (err) => {
    if (err) {
      console.error(`Error writing file: ${err}`);
      return;
    }

    console.log('File has been written successfully.');
  });
});
