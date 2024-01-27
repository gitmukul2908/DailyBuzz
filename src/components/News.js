import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'


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

  async componentDidMount() {
    this.updateNews()
  }

  constructor() {
    super()
    this.state = {
      articles: [],
      loading: false,
      page: 1
    }
  }

  async updateNews() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ccc923fb090549f39edf78b036003061&page=${this.state.page}&pagesize=${this.props.pageSize}`

    this.setState({
      loading: true
    })

    let data = await fetch(url)
    let mainData = await data.json()

    this.setState({
      articles: mainData.articles,
      totalResults: mainData.totalResults,
      loading: false
    })
  }

  handlePrev = async () => {

    this.setState({page: this.state.page - 1});
    this.updateNews();

  }

  handleNext = async () => {

    this.setState({page: this.state.page + 1});
    this.updateNews();

  }

  render() {
    // console.log("render")
    return (
      <div>
        <div className="container my-3">
          <h2>DailyBuzz - Your Daily Dose of News!</h2>
          {this.state.loading && <Spinner />}
          <div className="row my-4">
            {!this.state.loading && this.state.articles.map((ele) => {
              return <div className="col-md-3" key={ele.url}>
                <NewsItem title={ele.title ? ele.title : ""} desc={ele.description ? ele.description : ""} imgurl={ele.urlToImage ? ele.urlToImage : "https://images.moneycontrol.com/static-mcnews/2023/10/adani_port-770x433.jpg"} newsurl={ele.url} author={ele.author ? ele.author : "Anonymous"} date={ele.publishedAt} source={ele.source.name} />
              </div>
            })}
          </div>
          <div className="container d-flex justify-content-between">
            <button disabled={this.state.page <= 1} type="button" className="btn btn-outline-secondary" onClick={this.handlePrev}>&larr; Previous</button>
            <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-outline-secondary" onClick={this.handleNext}>Next &rarr;</button>
          </div>
        </div>
      </div>
    )
  }
}

export default News
