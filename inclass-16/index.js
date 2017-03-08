

const express = require('express')
const bodyParser = require('body-parser')

var nextId = 4;
var myarticles = {
		'articles' :
        [ 
        	{
        		id:1, 
        		author:'Scott', 
        		text:'A post'
        	},
          	{	id:2, 
          		author:'Wanyi', 
          		text:'B post'
          	},
          	{	id:3, 
          		author:'Liu', 
          		text:'C post'
          	}
        ]
	}
const addArticle = (req, res) => {
     console.log('Payload received', req.body)
     const newarticle = {
     	'articles' :
        [
        	{
        		id:nextId, 
        		author:'Wanyi Liu', 
        		text:req.body.body
        	}
        ]
     }
     myarticles = {
     	'articles' :
     	[
     		...myarticles.articles,
     		{
     			id:nextId, 
     			author:'Wanyi Liu', 
     			text:req.body.body
     		}
     	]
     } 
     nextId++; 
     res.send(newarticle)
}

const hello = (req, res) => res.send({ hello: 'world' })

const getArticle = (req, res) => {
	res.send(myarticles)

}
const app = express()
app.use(bodyParser.json())
app.post('/article', addArticle)
app.get('/', hello)
app.get('/articles', getArticle)

// Get the port from the environment, i.e., Heroku sets it
const port = process.env.PORT || 3000
const server = app.listen(port, () => {
     const addr = server.address()
     console.log(`Server listening at http://${addr.address}:${addr.port}`)
})