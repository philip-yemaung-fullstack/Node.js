var url = require('url');
var fs = require('fs');
var args = JSON.parse(process.argv[2]);

process.on('message', (msg) => {
	var queryData = url.parse(args.url, true).query, result = '';
	if (!queryData.url) {
		result = "No file name is passed in querystring. \nThis should be passed like this " +
			"http://localhost:1234/?url=File1.html";
	} else {
		var filePath = __dirname + '/' + queryData.url;
		if (fs.existsSync(filePath)) {
			var html = fs.readFileSync(filePath, 'utf8');
			result = html;
		} else {
			result +=
				`${queryData.url} not found in server.\nAvailable files in server:\n`;
			fs.readdirSync(__dirname).forEach(file => {
				result += file + '\n';
			})
		}
	}

	process.send(result);
});