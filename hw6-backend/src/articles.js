let articles = [
	{
    	"_id": 1, 
    	"text": "test1",
    	"author": "Zhaokang Li",
    	"date":"2015-12-20",
    	"img": "wanyi.jpg",
    	"comments": [
    		{
                "commentId": 1,
                "author": "scott",
                "text": "comment1"
            }
    	]
    },
    {
    	"_id": 2, 
    	"text": "test2",
    	"author": "Kejun Liu",
    	"date": "2015-12-21",
    	"img": "wanyi.jpg",
    	"comments": [
    		{
                "commentId": 1,
                "author": "wanyi",
                "text": "comment1"
            }
    	]
    },
    {
    	"_id": 3, 
    	"text": "test3",
    	"author": "wl49",
    	"date": "2015-12-23",
    	"img": "wanyi.jpg",
    	"comments": [
    		{
                "commentId": 1,
                "author": "kejun",
                "text": "comment1"
            }
    	]
    }
]

const addArticle = (req, res) => {
     const article = {
     	_id: articles.length+1,
     	text: req.body.text,
     	author: "wl49",
     	date: new Date(),
     	img: req.body.img || null,
     	comments: []
     }
     articles.push(article)
     res.send({articles:[article]})
}

const getArticles = (req, res) => {
	if(req.params.id){
		res.send({articles: articles.filter((article) => {
			return article._id == req.params.id
		})})		
	} else {
		res.send({articles: articles})
	}
}
const putArticle= (req, res) =>{
	if(req.body.commentId){
		if(req.body.commentId==-1){
			let article=articles.filter((a)=> {return a._id==req.params.id})
			let comments=article[0].comments
			comments.push({commentId: comments.length+1, author: 'sep1', text: req.body.text})
			articles=articles.map((a)=> a._id==req.params.id? {
				_id:a._id, 
				text: a.text, 
				author: a.author,
				date: a.date,
				img: a.img,
				comments: comments
			} : a)
			putarticle=articles.filter((a)=> {return a._id==req.params.id})
			res.send({'articles': putarticle})
		}
		else{
			let article=articles.filter((a)=> {return a._id==req.params.id})
			let comments=article[0].comments
			comments=comments.map((c)=> c.commentId==req.body.commentId? {commentId: c.commentId, author: c.author, text: req.body.text}: c)
			articles=articles.map((a)=> a._id==req.params.id?  {
				_id:a._id, 
				text: a.text, 
				author: a.author,
				date: a.date,
				img: a.img,
				comments: comments
			} : a)
			putarticle=articles.filter((a)=> {return a._id==req.params.id})
			res.send({'articles': putarticle})
		}
	}
	else{
		articles=articles.map((a)=> a._id==req.params.id?
			{
				_id:a._id, 
				text: req.body.text, 
				author: a.author,
				date: a.date,
				img: a.img,
				comments: a.comments
			} : a)
		let putarticle=articles.filter((a)=> {return a._id==req.params.id})
		res.send({'articles': putarticle})
	}
}
module.exports = (app) => {
	app.get('/articles/:id*?', getArticles)
	app.post('/article', addArticle)
    app.put('/articles/:id', putArticle)
}
