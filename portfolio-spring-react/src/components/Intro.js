import React, { useState, useEffect } from 'react';
import Axios from 'axios';

export default function Intro () {
  const [getSpring, setGetSpring] = useState("None");

  useEffect (() => {
    Axios
      .get("/")
      .then(resp => {
        // setGetSpring(resp.data);
        console.log("Get from Spring: ", resp);
      })
      .catch(err => {
        console.log(err);
      });
  }, [])

  return (
    <>
      <div>
        Introduction: {getSpring}
      </div>
    </>
  )
}