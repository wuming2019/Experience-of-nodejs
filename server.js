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
	console.log('请求进来了');
	// 判断不同的请求地址，返回不同页面
	if (req.url === '/index.html') {
		// 读取index.html 并返回
		fs.readFile('./views/index.html', (err, data) => {
			if (err) throw err;
			// 其实返回给浏览器的内容不推荐转换为字符串转换在返回
			//   —— 因为服务器发数据发送给浏览器的过程中，是要把这些所有的数据，先序列化 
			//   —— 转换为字节 —— buffer
			res.end(data);
		});
	} else if (req.url === '/list.html') {
		// 读取list.html 并返回
		fs.readFile('./views/list.html', (err, data) => {
			if (err) throw err;
			// 其实返回给浏览器的内容不推荐转换为字符串转换在返回
			//   —— 因为服务器发数据发送给浏览器的过程中，是要把这些所有的数据，先序列化 
			//   —— 转换为字节 —— buffer
			res.end(data);
		});
	} else if (req.url === '/detail.html') {
		fs.readFile('./views/detail.html', (err, data) => {
			if (err) throw err;
			// 其实返回给浏览器的内容不推荐转换为字符串转换在返回
			//   —— 因为服务器发数据发送给浏览器的过程中，是要把这些所有的数据，先序列化 
			//   —— 转换为字节 —— buffer
			res.end(data);
		});
	} else
		// 如果还有别的静态资源，继续判断
		if (req.url === '/assets/css/list.css') {
			// 继续读取css文件
			fs.readFile('./assets/css/list.css', (err, data) => {
				if (err) throw err;
				// 其实返回给浏览器的内容不推荐转换为字符串转换在返回 
				// —— 因为服务器发数据发送给浏览器的过程中，是要把这些所有的数据，先序列化 
				// —— 转换为字节 —— buffer
				res.end(data);
			});
		} else if (req.url === '/assets/js/list.js') {
		fs.readFile('./assets/js/list.js', (err, data) => {
			if (err) throw err;
			// 其实返回给浏览器的内容不推荐转换为字符串转换在返回 
			// —— 因为服务器发数据发送给浏览器的过程中，是要把这些所有的数据，先序列化 
			// —— 转换为字节 —— buffer
			res.end(data);
		});
		// 设置响应头，它可以解决中文乱码的问题
		// 一定要在返回之前设定
		// res.setHeader('Content-Type','text/html;charset=utf-8');
	} else {
		// 返回浏览器数据
		res.end('Hello World');
		// nodejs 每次修改过后，都需要重新启动服务器，把代码重新执行
	}
});