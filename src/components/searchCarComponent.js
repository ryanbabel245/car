"use client";
import React, { useEffect, useRef, useState } from "react";
import { Table } from "react-bootstrap";
import TableRow from "./tableRow";
import { ToastContainer, toast } from "react-toastify";
import { Trash } from "react-bootstrap-icons";
const SearchCarComponent = ({ params, data, isNotificationAllowed, mode }) => {
  const [tabData, setTabData] = useState([]);
  const audioPlayer = useRef(null);
  const playAudio = () => {
    audioPlayer?.current?.play();
  };

  const handleClear = () => {
    setTabData([]);
  };

  useEffect(() => {
    if (data) {
      let tempData = tabData;
      tabData.find((i) => i.id === data.id) || setTabData([...tempData, data]);
      toast(`${params?.title}`, {
        position: "bottom-right",
        autoClose: 3000,
        type: "success",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      if (audioPlayer?.current && isNotificationAllowed) {
        playAudio();
      }
    }
  }, [data]);
  return (
    <>
      {isNotificationAllowed && <audio ref={audioPlayer} src="/ring.mp3" />}
      <Table
        striped
        bordered
        hover
        responsive
        variant={mode}
        className="whitespace-nowrap car-table"
      >
        <thead className="bg bg-dark">
          <tr className="text-center">
            <th></th>
            {/* <th>Id</th> */}
            <th>Go site</th>
            <th>Title</th>
            <th>Price</th>
            <th>Year</th>
            <th>Km</th>
          </tr>
        </thead>
        <tbody>
          {tabData
            .sort((a, b) => b.id - a.id)
            .map((item, index) => (
              <TableRow key={item.id} number={index} item={item} />
            ))}
        </tbody>
      </Table>
      <ToastContainer />
      {tabData?.length > 0 && (
        <div
          className="position-fixed"
          style={{ bottom: "60px", left: "160px" }}
        >
          <span className="btn btn-danger m-2" onClick={() => handleClear()}>
            <Trash />
          </span>
        </div>
      )}
    </>
  );
};

export default SearchCarComponent;
