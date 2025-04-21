const express = require('express');
const { spawn } = require('child_process');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/run-command', (req, res) => {
  const command = req.body.command;
  const serverPort = req.body.port || 8000;
  
  console.log(`Running command: npx ${command}`);
  
  // Set up SSE
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  
  const npx = spawn('npx', command.split(' '), {
    env: { ...process.env, PORT: serverPort }
  });
  
  npx.stdout.on('data', (data) => {
    res.write(`data: ${data.toString()}\n\n`);
  });
  
  npx.stderr.on('data', (data) => {
    res.write(`data: ERROR: ${data.toString()}\n\n`);
  });
  
  npx.on('close', (code) => {
    res.write(`data: Process exited with code ${code}\n\n`);
    res.end();
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
