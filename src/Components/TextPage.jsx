import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TextPage = () => {
  const [data, setdata] = useState([]);

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products")
      .then((res) => {
        setdata(res.data);
        console.log(res.data);
      });
  }, []);

  const handleAdd = () => {
    axios.post("http://localhost:1243/Items", data)
      .then((res) => {
        console.log("Data saved to JSON file:", res.data);
      })
      .catch((error) => {
        console.error("Error saving data to JSON file:", error);
      });
  }

  return (
    <div>
      <button onClick={handleAdd} className='btn btn-dark'>Add To Json</button>
    </div>
  )
}

export default TextPage;
