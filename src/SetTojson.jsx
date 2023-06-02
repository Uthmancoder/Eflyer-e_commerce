import React, { useState, useEffect } from 'react';

const SetTojson = () => {
  const [dataset, setDataset] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((jsonData) => {
        setDataset(jsonData);
        console.log(jsonData);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    const updateLocalJson = async () => {
      try {
        const response = await fetch("http://localhost:1243/items", {
          method: 'PUT',
          body: JSON.stringify(dataset),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const jsonData = await response.json();
        console.log(jsonData);
      } catch (error) {
        console.error('Error editing item:', error);
      }
    };

    if (dataset.length > 0) {
      updateLocalJson();
    }
  }, [dataset]);

  return (
    <div>
      {/* Your component JSX */}
    </div>
  );
};

export default SetTojson;
