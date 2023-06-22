const fs= require('fs');
const fsPromise = require('fs').promises;

const http = require('http');
const path = require('path');
const PORT = process.env.PORT || 3000;
const url = require('url');




const server = http.createServer((req,res) =>{
    console.log(req.url);

    const myURl = new URL(req.url,'http://localhost:3000/')
   
    const myPathName = myURl.pathname;
    const id = myURl.searchParams.get('id');
     
    res.writeHead(200,{'Content-Type': 'text/html'});
    res.end('<h1>Welcome to my Page</h1>')
    
    console.log(myURl);
    console.log(id);
});




server.listen(PORT,() =>{
    console.log('server is running on : ', PORT);
});
