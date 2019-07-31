// 搭建服务器第一步
const http = require('http');
// 读取文件需要使用fs模块
const fs = require('fs');
// 创建一个服务器
const server = http.createServer();
// 给服务器绑定ip和端口
server.listen(8080, () => {
	console.log('服务器已经开启，请通过 http://127.0.0.1:8080 访问');
});
// 给服务器注册一个请求事件
server.on('request', (req, res) => {
	// 所有的静态资源都放在一些固定的目录下面 
	// views里面放页面  assets里面 放 图片、css、js之类的
	// 判断判断 url是否以这两个文件夹开头，就知道是否是请求静态资源
	// 判断是否以某个字符开头  indexOf === 0  || startsWith
	if (req.url.startsWith('/assets') || req.url.startsWith('/views')) {
		// 如果请求css文件，必然是以css结尾 
		// endsWith - 判断某个字符串是否以 什么结尾
		if (req.url.endsWith('.css')) {
			// 需要给它添加一个响应头
			res.setHeader('Content-Type', 'text/css;charset=utf-8');
		}
		fs.readFile('.' + req.url, (err, data) => {
			if (err) console.log(err);
			res.end(data);
		});
	} else {
		res.end('Hello World');
	}
});