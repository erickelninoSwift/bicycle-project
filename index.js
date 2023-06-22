


const http = require('http');
const path = require('path');

const url = require('url');
const fsPromise = require('fs').promises;


const PORT = process.env.PORT || 3000;
const server = http.createServer(async(req,res) =>{
  

    const myHost = req.headers.host;
    const myURl = new URL(req.url,`http://${myHost}/`);
   
    const myPathName = myURl.pathname;
    const id = myURl.searchParams.get('id');

    if(myPathName === '/' && id >= 0 && id <= 5)
    {

        const html = await fsPromise.readFile(path.join(__dirname,'view','bicycles.html'),'utf-8');

        if(res.statusCode === 200)
        {
            res.writeHead(200,{'Content-Type': 'text/html'});
            res.end(html);
        }else
        {
            console.log('file could not be read');
        }

    }else if(myPathName === '/bicycle' && id >= 0 && id <= 5)
    {
        const html = await fsPromise.readFile(path.join(__dirname,'view','overview.html'),'utf-8');
        res.writeHead(200,{'Content-Type': 'text/html'});
        res.end(html);

    }else 
    {
         
        res.writeHead(200,{'Content-Type': 'text/html'});
        res.end('<h1> File not found </h1>');
    }
     
   
    
    console.log(myURl);
    console.log(id);
});




server.listen(PORT,() =>{
    console.log('server is running on : ', PORT);
});
