import axios from 'axios'
import React, { useEffect, useState } from 'react'

const UseFetch = (url) => {
  const [data, setData] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    axios.get(url)
      .then((res) => {
        setData(res.data)
      })
      .catch((error) => {
        console.log(error)
        setError(error)
      })
  }, [url])

  return {
    data,
    error
  }
}

export default UseFetch;
