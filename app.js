﻿require('colors');
const express = require('express');
const app = express();
const router = require('./services.js');

// 请求信息 及 安全性控件
app.use( (req, res, next) => {
  console.log(req.method.toString().green + ' - ' + // GET or POST
    req.originalUrl.toString().yellow + ' - ' +     // URL
    new Date().toLocaleString().blue);              // Date and Time
  
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

// For parsing request body
app.use(express.json());

// Static path
app.use(express.static('./public'));

// Request router
app.use('/api', router);

// Listening
const server = app.listen(8888, '0.0.0.0', () => {
  // Port Number
  let port = server.address().port;
  // IPv4 address
  let IPv4 = new String();
  let netLinks = require('os').networkInterfaces();
  for(let i in netLinks) {
    let netLink = netLinks[i]; // 单个连接，如：本地连接，无线网络连接等，每个连接包含IPv4、IPv6等协议接口
    for(let j in netLink) { // 遍历每个连接的不同协议
      if(netLink[j].address !== '127.0.0.1' && netLink[j].family === 'IPv4') {
        IPv4 = netLink[j].address;
      }
    }
  }
  console.log(' 服务部署成功！'.green);
  console.log(('    本地访问：localhost:' + port).cyan);
  console.log(('  互联网访问：' + (IPv4.length === 0 ? '未连接到互联网' : (IPv4 + ':' + port))).cyan);
});