

import React, { Component } from 'react'

import { movies } from '../movieData'

export class Favourites extends Component {

    constructor() {
        super()

        this.state = {
            genres: [],
            currgenre: 'All genre',
            currText: '',
            movies: [],
            limit: 5,
            currPage: 1
        }
    }

    componentDidMount() {
        let genreids = { 28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western' };

        let data = JSON.parse(localStorage.getItem('movies-app') || '[]')

        let tempArr = []

        data.map((movieObj => {
            if (!tempArr.includes(genreids[movieObj.genre_ids[0]])) {
                tempArr.push(genreids[movieObj.genre_ids[0]])
            }
        }))

        tempArr.unshift('All genre')

        this.setState({
            movies: [...data],
            genres: [...tempArr]
        })
    }

    handleGenreChange = (genre) => {
        this.setState({
            currgenre: genre,
            currText: ''
        })
    }

    sortPopularityDesc = () => {
        let temp = this.state.movies
        temp.sort(function (objA, objB) {
            return objB.popularity - objA.popularity
        })

        this.setState({
            movies: [...temp]
        })
    }

    sortPopularityAsce = () => {
        let temp = this.state.movies
        temp.sort(function (objA, objB) {
            return objA.popularity - objB.popularity
        })

        this.setState({
            movies: [...temp]
        })
    }

    sortRatingsDesc = () => {
        let temp = this.state.movies
        temp.sort(function (objA, objB) {
            return objB.vote_average - objA.vote_average
        })

        this.setState({
            movies: [...temp]
        })
    }

    sortRatingsAsce = () => {
        let temp = this.state.movies
        temp.sort(function (objA, objB) {
            return objA.vote_average - objB.vote_average
        })

        this.setState({
            movies: [...temp]
        })
    }

    deleteFromFavourites = (removedMovie) => {
        let newArr = [];
        newArr = this.state.movies.filter((movieObj) => movieObj.id != removedMovie.id)
        this.setState({
            movies: [...newArr]
        })
        localStorage.setItem('movies-app', JSON.stringify(newArr));
    }

    handlePageNumber = (pageNumber) => {
        this.setState({
            currPage: pageNumber
        })
    }

    render() {

        let genreids = { 28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western' };

        let filterArr = []

        if (this.state.currText == '') {
            filterArr = this.state.movies
        }

        else {
            filterArr = this.state.movies.filter((movieObj) => {
                let title = movieObj.original_title.toLowerCase()
                return title.includes(this.state.currText.toLowerCase().trim())
            })
        }

        if (this.state.currgenre != 'All genre' && this.state.currText === '') {
            filterArr = this.state.movies.filter((movieObj) => genreids[movieObj.genre_ids[0]] == this.state.currgenre)
        }

        let numberOfPages = Math.ceil(filterArr.length / this.state.limit);
        let pagesArr = [];
        for (let i = 1; i <= numberOfPages; i++) {
            pagesArr.push(i);
        }

        let start = (this.state.currPage - 1) * this.state.limit;
        let end = start + parseInt(this.state.limit);

        filterArr = filterArr.slice(start, end);

        return (
            <div className='main'>
                <div class="row">
                    <div class="col-3">
                        <ul class="list-group genre-selector">
                            {
                                this.state.genres.map((genre) => (
                                    this.state.currgenre == genre ?
                                        <li style={{ background: '#3f51b5', color: 'white', fontWeight: 'bold' }} class="list-group-item">{genre}</li> :
                                        <li style={{ color: '#3f51b5' }} class="list-group-item" onClick={() => this.handleGenreChange(genre)}>{genre}</li>
                                ))
                            }


                        </ul>
                    </div>
                    <div className='col-9 favourites-table'>
                        <div className='row'>
                            <input placeholder='Search' type='text' className='input-group-text col'
                                placeHolder="Search" value={this.state.currText} onChange={(e) => this.setState({ currText: e.target.value })}
                            />
                            <input type='number' className='input-group-text col'
                                placeholder="Row Count" value={this.state.limit} onChange={(e) => this.setState({ limit: e.target.value })}
                            />
                        </div>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col"></th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Genre</th>
                                    <th scope="col"><i class="fa-solid fa-sort-up" onClick={this.sortPopularityDesc}></i>Popularity<i class="fa-solid fa-sort-down" onClick={this.sortPopularityAsce}></i></th>
                                    <th scope="col"><i class="fa-solid fa-sort-up" onClick={this.sortRatingsDesc}></i>Ratings<i class="fa-solid fa-sort-down" onClick={this.sortRatingsAsce}></i></th>

                                </tr>
                            </thead>
                            <tbody>
                                {
                                    filterArr.map((movieElem) => (
                                        <tr>
                                            <td><img src={`https://image.tmdb.org/t/p/original${movieElem.backdrop_path}`} className='favourites-img' /></td>
                                            <th scope="row">{movieElem.title}</th>
                                            <td>{genreids[movieElem.genre_ids[0]]}</td>
                                            <td>{movieElem.popularity}</td>
                                            <td>{movieElem.vote_average}</td>
                                            <td><button type="button" class="btn btn-danger" onClick={() => this.deleteFromFavourites(movieElem)}>Delete</button></td>
                                        </tr>
                                    ))
                                }


                            </tbody>
                        </table>
                        <nav aria-label="Page navigation example">
                            <ul class="pagination">
                                {
                                    pagesArr.map((pageNumber) => (
                                        <li class="page-item"><a class="page-link" href="#" onClick={() => this.handlePageNumber(pageNumber)}>{pageNumber}</a></li>
                                    ))
                                }
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        )
    }
}

export default Favourites