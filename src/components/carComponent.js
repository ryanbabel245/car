"use client";
import { fetchData } from "@/utils/httpRequest";
import React, { useEffect, useRef, useState } from "react";
import { Button, Container, Modal, Spinner, Table } from "react-bootstrap";
const CarComponent = ({ timer, indexValue, params }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const audioPlayer = useRef(null);
  const playAudio = () => {
    audioPlayer?.current?.play();
    setTimeout(() => {
      audioPlayer?.current?.pause();
    }, 2000);
  };
  const getData = async () => {
    setLoading(true);
    const response = await fetchData(params);
    const storedData = JSON.parse(localStorage.getItem(params.id)) || [];
    const ids = storedData.map((i) => i.id);
    const filteredData = response.filter((i) => !ids.includes(i.id));

    setData(filteredData);
    setLoading(false);
    return response;
  };

  const handleClear = () => {
    let storedData = JSON.parse(localStorage.getItem(params.id)) || [];
    console.log("storedData :>> ", storedData);
    storedData = [...storedData, ...data];
    console.log("storedData2 :>> ", storedData);
    localStorage.setItem(params.id, JSON.stringify(storedData));
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const handleGo = (item) => {
    console.log(item);
    // const storedData = JSON.parse(localStorage.getItem(params.id)) || [];
    // storedData.push(item);
    // localStorage.setItem(params.id, JSON.stringify(storedData));
    // setTimeout(() => {
    //   window.location.reload();
    // }, 1000);
  };

  useEffect(() => {
    if (timer === 1) {
      setTimeout(() => {
        getData();
      }, 1 + indexValue * 1000);
    }
  }, [timer]);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (data.length > 0 && audioPlayer?.current) {
      handleShow();
        playAudio();
    }
  }, [data]);
  return (
    <>
      {data.length > 0 && <audio ref={audioPlayer} src="/ring.mp3" />}

      {!loading ? (
        <Table
          striped
          bordered
          hover
          responsive
          className="whitespace-nowrap car-table"
        >
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title> New Car </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <span className="fw-bold text-xl text-uppercase text-success">
                {params?.title}
              </span>
            </Modal.Body>
          </Modal>
          <thead>
            <tr>
              <th></th>
              <th>Id</th>
              <th>
                <span
                  className="bg bg-danger text-white btn btn-danger m-2"
                  onClick={handleClear}
                >
                  Clear
                </span>
              </th>
              <th>Title</th>
              <th>Description</th>
              <th>Year</th>
              <th>Km</th>
              <th>Price</th>
              <th>Date</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.id}</td>
                <td>
                  <a href={item.url} target="_blank" rel="noreferrer">
                    <span
                      className="btn btn-primary"
                      onClick={() => handleGo(item)}
                    >
                      Go
                    </span>
                  </a>
                </td>
                <td>{item.title}</td>
                <td>{item.description}</td>
                <td>{item.year}</td>
                <td>{item.km}</td>
                <td>{item.price}</td>
                <td>{item.date}</td>
                <td>{item.location}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <Container
          fluid
          className="d-flex align-items-center justify-content-center spinner-container"
        >
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </Container>
      )}
    </>
  );
};

export default CarComponent;
