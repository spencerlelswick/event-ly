import React from 'react';
import { useLocation } from 'react-router-dom';

export default function PageNotFound(){

  const location=useLocation()

  return(
    <div>
      <h1>Error 404: Page not found.</h1>
      <br/>

      <h2>Path</h2>
      <code>{location.pathname}</code>
      <h2>is not valid.</h2>
      <br/>

      <img src={"/assets/evently-404.jpg"} alt={"404"} className="w-1/4"/>

    </div>
  )
}