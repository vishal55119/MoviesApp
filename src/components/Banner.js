import React, { Component } from 'react'

export class Banner extends Component {
  render() {
    let backdrop = '/6EdKBYkB1ssgGjc249ud1L55o8d.jpg'
    return (
        <div className="card banner-card" >
        <img src={`https://image.tmdb.org/t/p/original${backdrop}`} className="card-img-top banner-img" alt="..."/>
                
                    {/* <h5 className="card-title banner-title">Jurassic Hunt</h5>
                    <p className="card-text banner-text"></p> */}
                    
                
        </div>
    )
  }
}

export default Banner