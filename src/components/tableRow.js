"use client";
import React, { useState } from "react";
import { ArrowRight } from "react-bootstrap-icons";

const TableRow = ({ number, item }) => {
  const [isVisited, setIsVisited] = useState(false);
  const handleGo = () => {
    setIsVisited(true);
    // const storedData = JSON.parse(localStorage.getItem(params.id)) || [];
    // storedData.push(item);
    // localStorage.setItem(params.id, JSON.stringify(storedData));
    // setTimeout(() => {
    //   window.location.reload();
    // }, 1000);
  };

  return (
    <tr className="text-center">
      <td>{number + 1}</td>
      {/* <td>{item.id}</td> */}
      <td>
        <a href={item.url} target="_blank" rel="noreferrer">
          <span
            className={`btn btn-${!isVisited ? "success" : "secondary"}`}
            onClick={() => handleGo()}
          >
            <ArrowRight />
          </span>
        </a>
      </td>
      <td className="text-start">{item.title}</td>
      <td>{item.price}</td>
      <td>{item.year}</td>
      <td>{item.km}</td>
    </tr>
  );
};

export default TableRow;
