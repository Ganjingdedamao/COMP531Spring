export const actions = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_TEXT: 'SHOW_TEXT'
}

export const filterArticles = (articles, filter, filterText) => {
  switch (filter) {
    case actions.SHOW_TEXT:
      return articles.filter(article => (article.text.indexOf(filterText) >= 0 || article.author.indexOf(filterText) >= 0))
    case actions.SHOW_ALL:
    default:
      return articles
  }
}
export const searchArticle = (filterText) => {
  const filter='SHOW_TEXT'
  return ({ type: 'SEARCH', filter, filterText})
}
