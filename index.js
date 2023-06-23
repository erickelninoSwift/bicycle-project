
const http = require('http');


const url = require('url');
const fsPromise = require('fs').promises;
const path = require('path');

const PORT = process.env.PORT || 3000;
const server = http.createServer(async(req,res) =>{
  

    const myHost = req.headers.host;
    const myURl = new URL(req.url,`http://${myHost}/`);
   
    const myPathName = myURl.pathname;
    const id = myURl.searchParams.get('id');

     console.log(req.url);

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

    }else if((req.url).includes('.png'))
    {
        const image = await fsPromise.readFile(path.join(__dirname,'public','image',`${req.url.slice(1)}`));
        res.writeHead(200,{'Content-Type': 'image/png'});
        res.end(image);
    }else if((req.url).includes('.css'))
    {
        const mycss = await fsPromise.readFile(path.join(__dirname,'public','css',`${req.url.slice(1)}`));
        res.writeHead(200,{'Content-type' : 'text/css'});
        res.end(mycss);
    }else 
    {
         
        res.writeHead(200,{'Content-Type': 'text/html'});
        res.end('<h1> File not found </h1>');
    }
});


// /\.(png)$/i.test(req.url)

server.listen(PORT,() =>{
    console.log('server is running on : ', PORT);
});
