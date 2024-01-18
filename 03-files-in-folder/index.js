const fs = require('fs/promises');
const path = require('path');

const folderPath = './03-files-in-folder/secret-folder';

async function displayFileInfo() {
  try {
    const files = await fs.readdir(folderPath, { withFileTypes: true });

    for (const file of files) {
      if (file.isFile()) {
        const filePath = path.join(folderPath, file.name);
        const stats = await fs.stat(filePath);

        const fileSizeInKB = stats.size / 1024; // Convert to kilobytes
        console.log(
          `${file.name}-${path
            .extname(file.name)
            .slice(1)}-${fileSizeInKB.toFixed(3)}kb`,
        );
      } else {
        console.error(
          `Error: ${file.name} is a directory. Only files are allowed.`,
        );
      }
    }
  } catch (error) {
    console.error(`Error reading files: ${error}`);
  }
}

displayFileInfo();
