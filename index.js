
const http = require('http');


const url = require('url');
const fsPromise = require('fs').promises;
const path = require('path');
const bicycleData = require('./data/data.json');


const PORT = process.env.PORT || 3000;
const server = http.createServer(async(req,res) =>{
  

    const myHost = req.headers.host;
    const myURl = new URL(req.url,`http://${myHost}/`);
   
    const myPathName = myURl.pathname;
    const id = myURl.searchParams.get('id');

     console.log(req.url);

    if(myPathName === '/' && id >= 0 && id <= 5)
    {

        let html = await fsPromise.readFile(path.join(__dirname,'view','bicycles.html'),'utf-8');

        let AllmainBicycle = fsPromise.readFile(path.join(__dirname,'view','main.html'));


        if(res.statusCode === 200)
        {
            let allbicycle = "";

            for(let index = 0; index <= bicycleData.length;index++)
            {
                allbicycle += AllmainBicycle;
            }


            html =  html.replace(/ <%AllMainBicleData%>/,allbicycle);
            res.writeHead(200,{'Content-Type': 'text/html'});
            res.end(html);
        }else
        {
            console.log('file could not be read');
        }

    }else if(myPathName === '/bicycle' && id >= 0 && id <= 5)
    {
        let html = await fsPromise.readFile(path.join(__dirname,'view','overview.html'),'utf-8');

        const currentBicyle = bicycleData.find( myData =>{
            return myData.id === id;
        });

        html = html.replace(/<%IMAGE%>/g,currentBicyle.image);
        html = html.replace(/<%NAMES%>/g,currentBicyle.name);
        html = html.replace(/<%NAMES%>/g,currentBicyle.name);
        let price = currentBicyle.originalPrice;
        if(currentBicyle.discount)
        {
            price = (price - ((price * currentBicyle.discount) / 100))
        }

        html = html.replace(/<%NEWPRICE%>/g,price);

        res.writeHead(200,{'Content-Type': 'text/html'});
        res.end(html);

    }else if((req.url).includes('.png'))
    {
        let  image = await fsPromise.readFile(path.join(__dirname,'public','image',`${req.url.slice(1)}`));
        res.writeHead(200,{'Content-Type': 'image/png'});
        res.end(image);
    }else if((req.url).includes('.css'))
    {
        let  mycss = await fsPromise.readFile(path.join(__dirname,'public','css',`${req.url.slice(1)}`));
        res.writeHead(200,{'Content-type' : 'text/css'});
        res.end(mycss);
    }
    else if((req.url).includes('.svg'))
    {
        const mysvg = await fsPromise.readFile(path.join(__dirname,'public','image',`${req.url.slice(1)}`));
        res.writeHead(200,{'Content-type' : 'image/svg+xml'});
        res.end(mysvg);
    }else 
    {
        res.writeHead(200,{'Content-type' : 'text/html'});
        res.end('<div> <h1>File Not Found : Error 500 </div>');
    }
});


// /\.(png)$/i.test(req.url)

server.listen(PORT,() =>{
    console.log('server is running on : ', PORT);
});
