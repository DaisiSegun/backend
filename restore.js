const { exec } = require('child_process');
const path = require('path');
require('dotenv').config();

// MongoDB connection string from environment variables
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('MongoDB connection string is missing. Make sure to set it in your environment variables.');
  process.exit(1);
}

// Local backup directory (relative path)
const localBackupDirectory = path.join(__dirname, 'local-backups', 'root');

// Collection to restore
const collectionToRestore = 'refreshtokens'; // Specify the collection you want to restore

// Execute mongorestore command for the specific BSON file
const restoreCommand = `mongorestore --uri="${MONGO_URI}" "${localBackupDirectory}/${collectionToRestore}.bson"`;

exec(restoreCommand, (error, stdout, stderr) => {
  if (error) {
    console.error('Error during restoration:', error);
    process.exit(1);
  }
  if (stderr) {
    console.error('Error during mongorestore execution:', stderr);
    process.exit(1);
  }
  console.log('Restoration successful:', stdout);
  process.exit(0);
});
