/* eslint-disable no-console */
'use strict';

const fs = require('fs').promises;
// const path = require('path');

async function copyFileWithValidation(from, to) {
  const equal = () => {
    return from === to;
  };
  const valid = () => {
    return typeof from === 'string' || typeof to === 'string';
  };

  try {
    valid();
  } catch (error) {
    throw ('Not valid path', error);
  }

  try {
    // const fromPath = path.resolve(sourcePath);
    // const toPath = path.resolve(destinationPath);
    equal();
  } catch (err) {
    throw ('Source and destination paths are the same', err);
  }

  try {
    await fs.access(from);
    await fs.copyFile(from, to);
    console.log(`File copied from ${from} to ${to}`);
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.error('No sush a file', error);
    }

    if (error.code === 'EISDIR') {
      throw ('No sush directory', error);
    }
    console.error(`Error during file copy: ${error.message}`);
  }
}

async function main() {
  const args = process.argv.slice(2);
  const [fromPath, toPath] = args;

  const exist = () => {
    return fromPath || toPath;
  };

  try {
    exist();
  } catch (err) {
    throw ('One or both file paths are missing', err);
  } finally {
    await copyFileWithValidation(fromPath, toPath);
  }
}

main();
