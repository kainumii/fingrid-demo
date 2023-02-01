import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

const NodeTest = () => {
  useEffect(() => {
    async function getData() {
      const resp = await axios.get("http://localhost:3000/api/courses");

      console.log(resp);
    }

    getData();
  }, []);

  return (
    <>
      <div>moi</div>
    </>
  );
};

export default NodeTest;
