const fs = require('fs').promises;
const path = require('path');

async function copyDir(src, dest) {
  try {
    // Check if the source directory exists
    const srcExists = await fs
      .access(src)
      .then(() => true)
      .catch(() => false);

    if (!srcExists) {
      console.log(`Source directory '${src}' does not exist. Creating it.`);
      await fs.mkdir(src);
      return;
    }
    await fs.mkdir(dest, { recursive: true });

    const files = await fs.readdir(src);

    for (const file of files) {
      const srcPath = path.join(src, file);
      const destPath = path.join(dest, file);

      const stats = await fs.stat(srcPath);

      if (stats.isDirectory()) {
        await copyDir(srcPath, destPath);
      } else {
        await fs.copyFile(srcPath, destPath);
      }
    }

    console.log('Copy completed successfully.');
  } catch (error) {
    console.error('Error during copy:', error.message);
  }
}

copyDir('files', 'files-copy');
