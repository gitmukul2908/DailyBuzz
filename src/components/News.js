import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'


export class News extends Component {

  static defaultProps = {
    country: "in",
    category: 'general',
    pageSize: 10
  }

  static propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
    pageSize: PropTypes.number
  }

  constructor() {
    super()
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0
    }

  }

  async updateNews() {

    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c4f749791681425fb7951933e612af4e&page=${this.state.page}&pagesize=${this.props.pageSize}`


    let data = await fetch(url)
    let mainData = await data.json()

    this.setState({
      articles: mainData.articles,
      totalResults: mainData.totalResults,
      loading: false
    })
  }

  async componentDidMount() {
    if (this.state.page === 1)
      this.updateNews()
  }

  fetchMoreData = async () => {

    this.setState({
      page: this.state.page + 1
    })
    
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c4f749791681425fb7951933e612af4e&page=${this.state.page + 1}&pagesize=${this.props.pageSize}`

  
    let data = await fetch(url)
    let mainData = await data.json()

    this.setState({
      articles: this.state.articles.concat(mainData.articles),
      totalResults: mainData.totalResults,
      loading: false
    })
  }

  render() {
    return (
      <div>
        <div className="container my-3">
          <h2>DailyBuzz - Your Daily Dose of News!</h2>
          {this.state.loading && <Spinner />}
          <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length !== this.state.totalResults}
            loader={<Spinner />}
            style={{overflow: 'hidden'}}
          >
            <div className="row my-4">
              {this.state.articles.map((ele) => {
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
}

export default News
