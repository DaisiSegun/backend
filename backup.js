const { exec } = require('child_process');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

dotenv.config();

// MongoDB connection string
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('MongoDB connection string is missing. Make sure to set it in your .env file.');
  process.exit(1);
}

// Local backup directory
const localBackupDirectory = path.join(__dirname, 'local-backups'); // Change this to your desired local backup directory

// Ensure the local backup directory exists
if (!fs.existsSync(localBackupDirectory)) {
  fs.mkdirSync(localBackupDirectory);
}

// Execute mongodump command
const backupCommand = `mongodump --uri="${MONGO_URI}" --out="${localBackupDirectory}"`;

exec(backupCommand, (error, stdout, stderr) => {
  if (error) {
    console.error('Error during backup:', error);
    process.exit(1);
  }
  if (stderr) {
    console.error('Error during mongodump execution:', stderr);
    process.exit(1);
  }
  console.log('Backup successful. Backup files are located in:', localBackupDirectory);
  process.exit(0);
});
