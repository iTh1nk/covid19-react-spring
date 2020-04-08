import React, { useState, useEffect } from "react";
import Axios from "axios";

export default function Intro() {
  const [getSpring, setGetSpring] = useState([]);

  useEffect(() => {
    Axios.get("/api/toaster")
      .then(resp => {
        setGetSpring(resp.data);
        console.log("Get from Spring: ", resp.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div>{getSpring.map(item => (
        <div key={item.id}>{item.content}</div>
      ))}</div>
    </>
  );
}
