const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const microservicesDir = path.join(__dirname, 'src');

// Function to find directories with 'start.js'
const getStartDirectories = () => {
    return fs.readdirSync(microservicesDir, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory() && fs.existsSync(path.join(microservicesDir, dirent.name, 'start.js')))
        .map(dirent => dirent.name);
};

const startDirectories = getStartDirectories();

startDirectories.forEach(directory => {
    const folderPath = path.join(microservicesDir, directory);
    const startJSPath = path.join(folderPath, 'start.js');

    const child = spawn('cmd', ['/k', 'node', startJSPath], { cwd: folderPath, detached: true, shell: true, windowsHide: false });

    child.stdout.on('data', data => {
        console.log(`[${directory} stdout] ${data}`);
    });

    child.stderr.on('data', data => {
        console.error(`[${directory} stderr] ${data}`);
    });

    child.on('close', code => {
        console.log(`[${directory}] Child process exited with code ${code}`);
    });
});
