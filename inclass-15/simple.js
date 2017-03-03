
const http = require('http')

const host = '127.0.0.1'
const port = 3333 || process.env.PORT

http.createServer(preprocess).listen(port, host)
console.log(`Server running at http://${host}:${port}`)

function preprocess(req, res) {
     let body = ''
     req.on('data', function(chunk) {
          body += chunk
     })
     req.on('end', function() {
          req.body = body
          server(req, res)
     })
}

function server(req, res) {
     console.log('Request method        :', req.method)
     console.log('Request URL           :', req.url)
     console.log('Request content-type  :', req.headers['content-type'])
     console.log('Request payload       :', req.body)

     
     let payload
     let loginres=''
     if(req.method == "GET"){
          switch(req.url) {
          case "/":
               payload = { 'hello': 'world' }
               break;
          case "/articles":
               
               payload = {
                    articles :
                    [ {id:1, author:'Scott', body:'A post'},
                      {id:1, author:'Wanyi Liu', body:'B post'},
                      {id:1, author:'test', body:'C post'}
                    ]
               }
               break;
          }
          res.setHeader('Content-Type', 'application/json')
          if(typeof payload == 'undefined'){
               res.statusCode = 202
               res.end(JSON.stringify("Request Error"))

          } 
          else{
               res.statusCode = 200
               res.end(JSON.stringify(payload))
          }         
     } 
     else if(req.method == "POST"){
          if(req.url=='/login'){
               var body = JSON.parse(req.body)
               var username = body.username
               loginres = "{username: <" + username + ">, result:'success'}"
               res.setHeader('Content-Type', 'application/json')
               res.statusCode = 200
               res.end(loginres)
          }
          
          else {
               res.setHeader('Content-Type', 'application/json')
               res.statusCode = 202
               res.end(JSON.stringify("Request Error"))

          } 
          
     } 
     else if(req.method == "PUT"){
          if(req.url=='/logout') {
               res.setHeader('Content-Type', 'application/json')
               res.statusCode = 200
               res.end("OK")
          }    
          else{
               res.setHeader('Content-Type', 'application/json')
               res.statusCode = 202
          res.end(JSON.stringify("Request Error"))
          }     
     }
     
    
}