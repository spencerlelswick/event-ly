import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function PageNotFound() {

  const location = useLocation()
  const [count, setCount] = useState(3);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => currentCount - 1);
    }, 1000);
    count === 0 && navigate("/");
    return () => clearInterval(interval);
  }, [count, navigate]);

  return (
    <div>
      <h1>Error 404: Page not found.</h1>
      <br />
      <h2>Path</h2>
      <code>{location.pathname}</code>
      <h2>is not valid.</h2>
      <br />
      <h2>You will be redirected to the hompage in {count} sec.</h2>
      <br />
      <img src={"/assets/evently-404.jpg"} alt={"404"} className="w-1/4" />
    </div>
  );



}