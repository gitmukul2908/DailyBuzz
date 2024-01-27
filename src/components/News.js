import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'


const News = (props) => {

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);


  const updateNews = async () => {

    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pagesize=${props.pageSize}`


    let data = await fetch(url)
    let mainData = await data.json()

    setArticles(mainData.articles)
    setTotalResults(mainData.totalResults)
    setLoading(false)

  }

  useEffect(() => {
    updateNews()
    // eslint-disable-line
  }, [])

  const fetchMoreData = async () => {

    // setpage is async so it will take some time to update page so we have to manually upadte page = page + 1
    setPage(page + 1)

    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pagesize=${props.pageSize}`


    let data = await fetch(url)
    let mainData = await data.json()

    setArticles(articles.concat(mainData.articles))
    setTotalResults(mainData.totalResults)
    setLoading(false)

  }

  return (
    <div>
      <div className="container my-3">
        <h2 style={{ marginTop: '90px' }}>DailyBuzz - Your Daily Dose of News!</h2>
        {loading && <Spinner />}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}
          style={{ overflow: 'hidden' }}
        >
          <div className="row my-4">
            {articles.map((ele) => {
              return <div className="col-md-3" key={ele.url}>
                <NewsItem
                  title={ele.title ? ele.title : ""}
                  desc={ele.description ? ele.description : ""}
                  imgurl={ele.urlToImage ? ele.urlToImage : "https://images.moneycontrol.com/static-mcnews/2023/10/adani_port-770x433.jpg"}
                  newsurl={ele.url}
                  author={ele.author ? ele.author : "Anonymous"}
                  date={ele.publishedAt}
                  source={ele.source.name} />
              </div>
            })}
          </div>

        </InfiniteScroll>

      </div>
    </div>
  )
}

News.defaultProps = {
  country: "in",
  category: 'general',
  pageSize: 10
}

News.propTypes = {
  country: PropTypes.string,
  category: PropTypes.string,
  pageSize: PropTypes.number
}

export default News
