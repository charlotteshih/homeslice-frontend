import React from 'react'
import { Link, Router } from 'react-router-dom';
import Gif from '../../images/pizz-throw.gif';

export default function NotFound() {
  return (
    <div className="NotFound__container padding-top-60px">
      <h1 className="NotFound__heading">404 Not Found</h1>
      <img className="NotFound__image" src={Gif} alt="404 not found breaking bad pizza throw"/>
      <p className="NotFound__paragraph">Something went wrong click the button to go.</p>
      <button className="btn">
        <Router>
          <Link className="link" to='/'>Home</Link>
        </Router>
      </button>
    </div>
  )
}
