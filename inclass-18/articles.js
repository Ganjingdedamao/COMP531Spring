const articles = [
		{
	    	"id": 1, 
	    	"text": "Vivamus laoreet. Nullam tincidunt adipiscing enim. Phasellus tempus. Proin viverra, ligula sit amet ultrices semper, ligula arcu tristique sapien, a accumsan nisi mauris ac eros. Fusce neque. Suspendisse faucibus, nunc et pellentesque egestas, lacus ante convallis tellus, vitae iaculis lacus elit id tortor. Vivamus aliquet elit ac nisl. Fusce fermentum odio nec arcu. Vivamus euismod mauris. In ut quam vitae odio lacinia tincidunt. Praesent ut ligula non mi varius sagittis. Cras sagittis. Praesent ac sem eget est egestas volutpat. Vivamus consectetuer hendrerit lacus. Cras non dolor. Vivamus in erat ut urna cursus vestibulum. Fusce commodo aliquam arcu. Nam commodo suscipit quam. Quisque id odio. Praesent venenatis metus at tortor pulvinar varius.", 
	    	"date": "2017-02-07",
	    	"img": "./image/card1.jpg",
	    	"comments": "",
	    	"author": "Zhaokang Li"
	    },
	    {
	    	"id": 2, 
	    	"text": "Pellentesque dapibus hendrerit tortor. Praesent egestas tristique nibh. Sed a libero. Cras varius. Donec vitae orci sed dolor rutrum auctor. Fusce egestas elit eget lorem. Suspendisse nisl elit, rhoncus eget, elementum ac, condimentum eget, diam. Nam at tortor in tellus interdum sagittis. Aliquam lobortis. Donec orci lectus, aliquam ut, faucibus non, euismod id, nulla. Curabitur blandit mollis lacus. Nam adipiscing. Vestibulum eu odio.", 
	    	"date": "2017-02-05",
	    	"img": "./image/card2.jpg",
	    	"comments": "",
	    	"author": "Kejun Liu"
	    },
	    {
	    	"id": 3, 
	    	"text": "Pellentesque commodo eros a enim. Vestibulum turpis sem, aliquet eget, lobortis pellentesque, rutrum eu, nisl. Sed libero. Aliquam erat volutpat. Etiam vitae tortor. Morbi vestibulum volutpat enim. Aliquam eu nunc. Nunc sed turpis. Sed mollis, eros et ultrices tempus, mauris ipsum aliquam libero, non adipiscing dolor urna a orci. Nulla porta dolor. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos hymenaeos.", 
	    	"date": "2017-01-07",
	    	"img": "./image/card3.jpg",
	    	"comments": "",
	    	"author": "Yiqing Lu"
	    },
	    {
	    	"id": 4, 
	    	"text": "Praesent vestibulum dapibus nibh. Etiam iaculis nunc ac metus. Ut id nisl quis enim dignissim sagittis. Etiam sollicitudin, ipsum eu pulvinar rutrum, tellus ipsum laoreet sapien, quis venenatis ante odio sit amet eros. Proin magna. Duis vel nibh at velit scelerisque suscipit. Curabitur turpis. Vestibulum suscipit nulla quis orci. Fusce ac felis sit amet ligula pharetra condimentum. Maecenas egestas arcu quis ligula mattis placerat. Duis lobortis massa imperdiet quam. Suspendisse potenti.", 
	    	"date": "2015-10-07",
	    	"img": "./image/card4.jpg",
	    	"comments": "",
	    	"author": "Wanyi Liu"
	    }
]


const addArticle = (req, res) => {
     
     const newarticle = {
     	id: articles.length+1,
     	text: req.body.text,
     	date: "2017-3-21",
     	img: "url",
     	comments: "",
     	author: "wl49"
     }
     articles.push(newarticle)
     res.send(newarticle)
}

const getArticles = (req, res) => {
	if(req.params.id){
		res.send(articles.filter((article) => {
			return article.id == req.params.id
		}))		
	} else {
		res.send(articles)
	}
}
module.exports = (app) => {
	app.get('/articles/:id*?', getArticles)
	app.post('/article', addArticle)
}
