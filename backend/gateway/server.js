const http = require('node:http');
const { URL } = require('node:url');
const routes = {'/auth':3001,'/users':3001,'/customers':3002,'/drivers':3003,'/vehicles':3004,'/trips':3005,'/dispatch':3006,'/assignments':3006,'/locations':3007,'/payments':3008,'/notifications':3009,'/ratings':3009,'/reports':3010,'/audit':3010};
const targetFor = path => { const key=Object.keys(routes).find(k=>path===k||path.startsWith(k+'/')); return routes[key]; };
const server=http.createServer(async(req,res)=>{
  const target=targetFor(new URL(req.url,'http://localhost').pathname);
  if(!target){res.writeHead(404,{'Content-Type':'application/json'});return res.end(JSON.stringify({error:'Gateway route not found'}));}
  try{
    const body=['GET','HEAD'].includes(req.method)?undefined:req;
    const response=await fetch(`http://localhost:${target}${req.url}`,{method:req.method,headers:{'content-type':req.headers['content-type']||'application/json'},body,duplex:body?'half':undefined});
    res.writeHead(response.status,Object.fromEntries(response.headers.entries()));
    res.end(Buffer.from(await response.arrayBuffer()));
  }catch(e){res.writeHead(502,{'Content-Type':'application/json'});res.end(JSON.stringify({error:'Service unavailable',detail:e.message}));}
});
server.listen(3000,()=>console.log('API Gateway: http://localhost:3000'));
