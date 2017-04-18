import Action, { resource, url, error, success} from '../../actions'
//add article with only text
export function addArticle(username,text){
  //will not add empty article
  if(text=="")
    return ({ type: 'default' })
  //post article
  return (dispatch)=>{
    resource('POST', 'article', { text })
    .then((r) => {
      dispatch({type: Action.ADDARTICLE, article : r.articles[0]})
    })
    .catch(r =>{
      dispatch(error("Failed to add articles", ""))
    })
  }
}
// add image article
export function addImgArticle(username,text, fd=undefined){
  return (dispatch)=>{
    resource('POST', 'article', fd, false)
    .then((r) => {
      dispatch({type: Action.ADDARTICLE, article : r.articles[0]})
    })
    .catch(r =>{
      dispatch(error("Failed to add articles", ""))
    })
  }
}
//add a comment
export function addCom(comment, id){
  if(comment=="")
    return ({ type: 'default' })
  return (dispatch)=>{
    resource('PUT', 'articles/'+id, { text:comment, commentId: -1})
    .then((r) => {
      dispatch({type: Action.EDITARTICLES, article : r.articles[0]})
    })
    .catch(r =>{
      dispatch(error("Failed to  add comment", ""))
    })
  }
}
// edit article
export function editArt(text, id){
  if(text==""||text==undefined)
    return ({ type: 'default' })
  return (dispatch)=>{
    resource('PUT', 'articles/'+id, { text })
    .then((r) => {
      dispatch({type: Action.EDITARTICLES, article : r.articles[0]})
      dispatch(success("Edit article successfully!", ""))
    })
    .catch(r =>{
      dispatch(error("Failed to  edit article", ""))
    })
  }
}
//edit comment
export function editCom(comment, id, commentId){
  if(comment==""||comment==undefined)
    return ({ type: 'default' })
  return (dispatch)=>{
    resource('PUT', 'articles/'+id, { text: comment, commentId})
    .then((r) => {
      dispatch({type: Action.EDITARTICLES, article : r.articles[0]})
      dispatch(success("Edit comment successfully!", ""))
    })
    .catch(r =>{
      dispatch(error("Failed to  edit comment", ""))
    })
  }
}