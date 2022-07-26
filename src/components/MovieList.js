
import React, { Component } from 'react'

import { movies } from '../movieData'

import axios from 'axios'

export class MovieList extends Component {

    constructor() {
        console.log('constructor first')
        super()

        this.state = {
            hover: '',
            parr: [1],
            movies: [],
            currPage: 1,
            favourites: []
        }

    }

    async componentDidMount() {
        let savedDataOfFavourites = JSON.parse(localStorage.getItem('movies-app') || "[]");
        let temp = savedDataOfFavourites.map((movie) => movie.id);
        this.setState({
            favourites: [...temp]
        })
        const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=ca1dbe16ea3f77b729d89815448262e6&language=en-US&page=${this.state.currPage}`)
        let movieData = response.data
        console.log(movieData)

        this.setState({
            movies: [...movieData.results]
        })

        console.log('componentDidMounting Done third')
    }

    changeMovies = async () => {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=ca1dbe16ea3f77b729d89815448262e6&language=en-US&page=${this.state.currPage}`)
        let movieData = response.data
        console.log(movieData)

        this.setState({
            movies: [...movieData.results]
        })

        console.log('componentDidMounting Done third')
    }

    handleNext = () => {
        let tempArr = []

        for (let i = 1; i <= this.state.parr.length + 1; i++) {
            tempArr.push(i)
        }

        console.log(tempArr)

        this.setState({
            parr: [...tempArr],
            currPage: this.state.currPage + 1,
        }, this.changeMovies)
    }

    handlePrevious = () => {
        if (this.state.currPage != 1) {
            this.setState({
                currPage: this.state.currPage - 1
            }, this.changeMovies)

        }
    }

    handlePageClick = (value) => {
        if (this.state.currPage != value) {
            this.setState({
                currPage: value
            }, this.changeMovies)
        }
    }

    handleFavourites = (movieObj) => {
        let oldData = JSON.parse(localStorage.getItem('movies-app') || '[]')

        if (this.state.favourites.includes(movieObj.id)) {
            oldData = oldData.filter((movie) => movie.id != movieObj.id)

        }

        else {
            oldData.push(movieObj)
        }

        localStorage.setItem('movies-app', JSON.stringify(oldData))

        console.log(oldData)

        this.handleFavouritesStates()
    }

    handleFavouritesStates = () => {
        let oldData = JSON.parse(localStorage.getItem('movies-app') || '[]')

        let temp = oldData.map((movie) => movie.id)

        this.setState({
            favourites: [...temp]
        })
    }

    render() {
        console.log('render second')


        return (
            <>

                <div>
                    <h3 style={{ marginTop: '2rem' }} className='text-center'><strong>Trending</strong></h3>
                </div>

                <div className='movies-list'>
                    {
                        this.state.movies.map((movieElem => (
                            <div className="card movie-card" onMouseEnter={() => this.setState({ hover: movieElem.id })} onMouseLeave={() => this.setState({ hover: '' })}>
                                <img src={`https://image.tmdb.org/t/p/original${movieElem.backdrop_path}`} className="card-img-top movie-img" alt="..." />

                                <h5 className="card-title movie-title">{movieElem.title}</h5>

                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    {
                                        this.state.hover == movieElem.id && <a class="btn btn-primary movie-btn" onClick={() => this.handleFavourites(movieElem)}>{this.state.favourites.includes(movieElem.id) ? 'Remove from Favourites' : 'Add to Favourites'}</a>
                                    }

                                </div>


                            </div>
                        )))
                    }
                </div>

                <div style={{ display: 'flex', justifyContent: 'center' }}>

                    <nav aria-label="Page navigation example">
                        <ul class="pagination">
                            <li class="page-item">
                                {
                                    this.state.parr.length != 1 ?
                                        <a class="page-link" onClick={this.handlePrevious}>Previous</a> :
                                        <a></a>
                                }
                            </li>
                            {
                                this.state.parr.map((value => (
                                    <li class="page-item"><a class="page-link" onClick={() => this.handlePageClick(value)}>{value}</a></li>
                                )))
                            }


                            <li class="page-item"><a class="page-link" onClick={this.handleNext}> Next</a></li>
                        </ul>
                    </nav>
                </div>

            </>
        )
    }
}

export default MovieList