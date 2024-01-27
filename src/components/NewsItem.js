import React from 'react'

const NewsItem = (props) => {

  let { title, desc, imgurl, newsurl, author, date, source } = props

  return (
    <div>
      <div className="card my-2" style={{ width: '18rem' }}>
        <span className="position-absolute top-0 translate-middle badge rounded-pill bg-dark" style={{ left: '50%' }}>
          {source} </span>
        <img src={imgurl} className="card-img-top" alt={title} style={{ height: '10rem' }} />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <div style={{ cursor: 'pointer' }}>
            <p className="badge bg-secondary">{author}</p><br />
            <p className="text">{new Date(date).toGMTString()}</p>
          </div>
          <p className="card-text">{desc}</p>
          <a href={newsurl} target='_blank' rel="noreferrer" className="btn btn-sm btn-success">Read More...</a>
        </div>
      </div>
    </div>
  )
}

export default NewsItem
