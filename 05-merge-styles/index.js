const fs = require('fs').promises;
const path = require('path');

async function compileStyles() {
  try {
    const stylesFolderPath = 'styles';
    const distFolderPath = 'project-dist';
    const outputFileName = 'bundle.css';

    // Check if the styles folder exists
    const stylesFolderExists = await fs
      .access(stylesFolderPath)
      .then(() => true)
      .catch(() => false);

    if (!stylesFolderExists) {
      console.log(
        `The '${stylesFolderPath}' folder does not exist. Creating it.`,
      );
      await fs.mkdir(stylesFolderPath);
      return;
    }

    // Create the 'project-dist' folder if it doesn't exist
    await fs.mkdir(distFolderPath, { recursive: true });

    const files = await fs.readdir(stylesFolderPath);
    const cssFiles = files.filter((file) => path.extname(file) === '.css');
    const stylesArray = [];

    for (const cssFile of cssFiles) {
      const filePath = path.join(stylesFolderPath, cssFile);
      const fileContent = await fs.readFile(filePath, 'utf-8');
      stylesArray.push(fileContent);
    }

    const bundleContent = stylesArray.join('\n');
    const outputPath = path.join(distFolderPath, outputFileName);
    await fs.writeFile(outputPath, bundleContent, 'utf-8');

    console.log('Styles compiled successfully.');
  } catch (error) {
    console.error('Error during compilation:', error.message);
  }
}

compileStyles();
