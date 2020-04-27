import React from 'react'


//This touches a single news card's style.
const articleStyle = {
  single: {
    padding: '2%',
    margin: '1%',
    backgroundColor: 'yellow',
    float: 'left',
    display: 'inline',
    maxWidth: '40%',
  },
  headline: {
    fontSize: 14,
  },
  paragraph: {
    fontSize: 12
  },
  details: {
    fontSize: 12
  }
}

const ArticleCard = ({ marker }) => {
  return (
    <div style={articleStyle.single}>
      <div style={articleStyle.headline}>{marker.headline}</div>
      <div style={articleStyle.details}>
        <br />
        According to {marker.outlet} in {marker.date}
      </div>
      <div style={articleStyle.paragraph}>{marker.paragraph}</div>
    </div>
  )
}
export default ArticleCard