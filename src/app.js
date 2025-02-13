/* eslint-disable no-console */
'use strict';

const fs = require('fs').promises;

async function copyFileWithValidation(from, to) {
  const equal = () => {
    return from === to;
  };
  const valid = () => {
    return !isNaN(from) || !isNaN(to);
  };

  try {
    if (valid()) {
      throw new Error('Not valid path');
    }
  } catch (error) {
    console.error(error.message);

    return;
  }

  try {
    if (equal()) {
      throw new Error('Source and destination paths are the same');
    }
  } catch (err) {
    console.error(err.message);

    return;
  }

  try {
    await fs.access(from);
  } catch (erro) {
    console.error(`No access to ${from}`);

    return;
  }

  try {
    await fs.copyFile(from, to);
    console.log(`File copied from ${from} to ${to}`);
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.error('No sush file', error);
    }

    if (error.code === 'EISDIR') {
      throw ('No such directory', error);
    }
    console.error(`Error during file copy: ${error.message}`);
  }
}

async function main() {
  const args = process.argv.slice(2);
  const [fromPath, toPath] = args;
  const exist = () => {
    return !fromPath || !toPath;
  };

  try {
    if (exist()) {
      throw new Error('One or both file paths are missing');
    }
  } catch (Er) {
    console.error(Er.message);

    return;
  }
  await copyFileWithValidation(fromPath, toPath);
}

main();
