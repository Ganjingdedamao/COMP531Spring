import Action, { resource, url, error, success} from '../../actions'

export function addArticle(username,text, fd=undefined){
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
export function editArt(text, id){
  if(text==""||text==undefined)
    return ({ type: 'default' })
  return (dispatch)=>{
    resource('PUT', 'articles/'+id, { text })
    .then((r) => {
      dispatch({type: Action.EDITARTICLES, article : r.articles[0]})
    })
    .catch(r =>{
      dispatch(error("Failed to  edit article", ""))
    })
  }
}
export function editCom(comment, id, commentId){
  if(comment==""||comment==undefined)
    return ({ type: 'default' })
  return (dispatch)=>{
    resource('PUT', 'articles/'+id, { text: comment, commentId})
    .then((r) => {
      dispatch({type: Action.EDITARTICLES, article : r.articles[0]})
    })
    .catch(r =>{
      dispatch(error("Failed to  edit comment", ""))
    })
  }
}