"use client";
import { useEffect, useState } from "react";
import CarComponent from "../components/carComponent";
import { Button,  Modal, Tab, Tabs } from "react-bootstrap";
import Head from "next/head";
import AddModal2 from "@/components/addModal2";
const sec = 10;
function Car() {
  const [categories, setCategories] = useState([]);
  const [show, setShow] = useState(false);
  const [timer, setTimer] = useState(sec);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleDelete = async (id) => {
    const tempArr = await categories.filter((i) => i.id !== id);
    await localStorage.setItem("model2", JSON.stringify(tempArr));
    window.location.reload();
  };
  useEffect(() => {
    const timerInterVal = setInterval(() => {
      if (timer === 1) {
        setTimer(sec);
        return;
      }
      setTimer(timer - 1);
    }, 1000);
    return () => {
      clearInterval(timerInterVal);
    };
  });
  useEffect(() => {
    setCategories(JSON.parse(localStorage.getItem("model2")) || []);
  }, []);

  return (
    <>
      <Head>
        <title>Car</title>
        <meta name="description" content="Car" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="d-flex justify-content-between">
          <AddModal2 />
          <Button variant="warning" onClick={() => setTimer(1)}>
            <strong>{timer}</strong>
          </Button>
        </div>
        <Tabs
          defaultActiveKey={categories && categories[0]?.id}
          className="mb-3"
        >
          {categories.map((item, index) => (
            <Tab
              key={item.id}
              eventKey={item.id}
              title={
                <div style={{ width: "150px" }}>
                  <strong className="me-3">{item?.title}</strong>
                  {/* {item.data.length > 0 && (
                      <Badge bg="success">{item.data.length}</Badge>
                    )} */}

                  <>
                    <span
                      onClick={handleShow}
                      className=" text-dark cursor-pointer"
                      style={{ height: "5px" }}
                    >x</span>
                    <Modal show={show} onHide={handleClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>
                          Do you want to delete <strong>{item?.title}</strong> ?
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body></Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                          Close
                        </Button>
                        <Button
                          variant="primary"
                          onClick={() => {
                            handleDelete(item.id);
                          }}
                        >
                          Yes
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </>
                </div>
              }
            >
              <CarComponent
                indexValue={index}
                key={item.id}
                timer={timer}
                params={item}
              />
            </Tab>
          ))}
        </Tabs>
      </main>
    </>
  );
}

export default Car;
