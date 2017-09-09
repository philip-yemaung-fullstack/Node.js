// This program create an HTTP server that serves File.
// The file path is provided in the URL like this:
//     https://localhost:4000/?url=path/to/my/file.txt
// Logic of reading the file runs in a separate child process.

var http = require('http');
const { fork } = require('child_process');

console.log('Server started...');
http.createServer(function (req, res) {
    var args = [JSON.stringify({ url: req.url })];
    const childProc = fork('processor.js', args);
    childProc.send('start');
    childProc.on('message', result => {
        res.end(`ProcessId: #${childProc.pid}\n${result}`);
    });
}).listen(1234, '127.0.0.1');