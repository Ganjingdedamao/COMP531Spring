import Action, { resource, url, error, success} from '../../actions'

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