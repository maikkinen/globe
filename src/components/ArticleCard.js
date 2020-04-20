import React from 'react'

//This touches only the written content of the news card.
const articleStyle = {
  header: {
    fontSize: 20,
  },
  paragraph: {
    fontSize: 14
  },
  details: {
    fontSize: 12
  }
}

//Test
const testStyleForArticle = {
  out: {
  padding: '5px',
  backgroundColor: 'green',
  margin: '10px'
  },
  in: {
    padding: '5px',
    backgroundColor: 'red',
    margin: '5px'
  }
}

const ArticleCard = ({ marker }) => {
  return (
    <div style={testStyleForArticle.in}>
      <div style={articleStyle.header}>{marker.headline}</div>
      <div style={articleStyle.paragraph}>{marker.paragraph}</div>
      <div style={articleStyle.details}>
        Marker id is {marker.id}
        Published in {marker.outlet}, in {marker.date}
      </div>
    </div>
  )
}

export default ArticleCard