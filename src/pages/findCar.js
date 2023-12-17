"use client";
import { searchData } from "@/utils/httpRequest";
import axios from "axios";
import { useEffect, useState } from "react";
import Head from "next/head";
import { Button, Col, Modal, Row, Tab, Tabs } from "react-bootstrap";
import SearchCarComponent from "@/components/searchCarComponent";
import { numbers } from "@/constants/cars";
import NotificationComponent from "@/components/notificationComponent";
import HamburgerMenu from "@/components/hamburgerMenu";
import Sidebar from "@/components/sidebar";

const FindCar = () => {
  const [lastId, setLastId] = useState("");
  const [datas, setDatas] = useState(null);
  const [categories, setCategories] = useState([]);
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("dark");
  const [isVisibilityHidden, setIsVisibilityHidden] = useState(false);
  // const [timer, setTimer] = useState(sec);
  const [isNotificationAllowed, setIsNotificationAllowed] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleDelete = async (id) => {
    const tempArr = await categories.filter((i) => i.id !== id);
    await localStorage.setItem("findModel", JSON.stringify(tempArr));
    window.location.reload();
  };

  const getLastId = async () => {
    const response = await axios("/api/catchId");
    const result = await [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
    ].map(async (i) => {
      {
        const res = await searchData({
          id: response.data.id + i * 200,
        });

        if (res?.lastId) {
          return res.lastId;
        }
        return;
      }
    });
    Promise.all(result).then((values) => {
      const filtered = values.filter((i) => i);
      setLastId(filtered ? filtered.at(-1) : null);
    });
    // result && setLastId(tempLastId);
  };
  const searchDataWithId = async () => {
    let tempLastId = lastId;
    if (isVisibilityHidden) return;
    numbers.map(async (i) => {
      const response = await searchData({ id: tempLastId + i });
      if (response?.lastId) {
        if (Object.values(response.data)?.length > 0) {
          setDatas(response.data);
        }
        response.lastId > tempLastId && setLastId(response.lastId);
      }
    });
  };

  const toggleNotification = () =>
    setIsNotificationAllowed(!isNotificationAllowed);

  useEffect(() => {
    setCategories(JSON.parse(localStorage.getItem("findModel")) || []);
  }, []);

  useEffect(() => {
    getLastId();
  }, []);

  useEffect(() => {
    window.addEventListener("visibilitychange", () => {
      // if (lastId && isVisibilityHidden) {
      //   window.location.reload();
      // }
      setIsVisibilityHidden(document.hidden);
    });
    return () => {
      window.removeEventListener("visibilitychange", () => {});
    };
  });

  // useEffect(() => {
  //   if(lastId) {
  //     setTimeout(() => {
  //       searchDataWithId()
  //     }, 5000)
  //   }
  // }, [lastId])

  // useEffect(() => {
  //   const timerInterVal = setInterval(() => {
  //     if (timer === 1) {
  //       setTimer(sec);
  //       return;
  //     }
  //     setTimer(timer - 1);
  //   }, 1000);
  //   return () => {
  //     clearInterval(timerInterVal);
  //   };
  // });

  useEffect(() => {
    const searchInterVal = setInterval(() => {
      if (lastId && categories?.length > 0 && !isVisibilityHidden) {
        searchDataWithId();
      }
    }, 10000);
    return () => {
      clearInterval(searchInterVal);
    };
  });

  return (
    <>
      <Head>
        <title>{isVisibilityHidden ? "Car Hidden" : "Car"}</title>
        <meta name="description" content="Car" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`main-container-${mode} min-vh-100`}>
        <HamburgerMenu
          mode={mode}
          setMode={setMode}
          toggleNotification={toggleNotification}
          isNotificationAllowed={isNotificationAllowed}
        />
        <Row>
          <Col md={3} lg={2} xl={1}>
            <div className="sidebar w-100">
              <div
                className={`bg bg-${
                  mode === "dark" ? "dark" : "light"
                } min-vh-100 d-flex flex-column align-items-center pt-2`}
              >
                <Sidebar
                  mode={mode}
                  setMode={setMode}
                  toggleNotification={toggleNotification}
                  isNotificationAllowed={isNotificationAllowed}
                />
              </div>
            </div>
          </Col>
          <Col lg={10} xl={11}>
            <Tabs
              defaultActiveKey={categories && categories[0]?.id}
              variant={mode}
              className="mb-3 mt-2"
            >
              {categories.map((item, index) => (
                <Tab
                  key={item.id}
                  eventKey={item.id}
                  title={
                    <div
                      className="border rounded p-4"
                      style={{ width: "150px" }}
                    >
                      <strong
                        className={`me-3 text-${
                          mode === "dark" ? "light" : "dark"
                        }`}
                      >
                        {item?.title}
                      </strong>
                      {/* {item.data.length > 0 && (
                    <Badge bg="success">{item.data.length}</Badge>
                  )} */}

                      <>
                        <span
                          onClick={handleShow}
                          className={`text-${
                            mode === "dark" ? "light" : "dark"
                          } cursor-pointer`}
                          style={{ height: "5px" }}
                        >
                          x
                        </span>
                        <Modal show={show} onHide={handleClose}>
                          <Modal.Header closeButton>
                            <Modal.Title>
                              Do you want to delete{" "}
                              <strong>{item?.title}</strong> ?
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
                  <SearchCarComponent
                    key={item.id}
                    params={item}
                    setDatas={setDatas}
                    isNotificationAllowed={isNotificationAllowed}
                    mode={mode}
                    data={
                      !datas
                        ? null
                        : +item.kmMin <= +datas.km &&
                          +item.kmMax >= +datas.km &&
                          +item.priceMin <= +datas.price &&
                          +item.priceMax >= +datas.price &&
                          +item.yearMin <= +datas.year &&
                          +item.yearMax >= +datas.year &&
                          datas
                    }
                  />
                </Tab>
              ))}
            </Tabs>
          </Col>
        </Row>
      </main>
      <footer
        className="position-fixed bottom-0 right-0  d-flex justify-content-between align-items-center py-2 bg bg-dark min-vw-100 pe-2"
        style={{ height: "50px" }}
      >
        <div className="d-flex justify-content-end w-100">
          <span className="text-white ">©2023</span>
        </div>
        <div
          className="bg bg-dark text-white p-2 border-none w-100 d-flex justify-content-end"
          style={{ cursor: "pointer" }}
          onClick={() => window.location.reload()}
        >
          <strong>{lastId}</strong>
        </div>
      </footer>
    </>
  );
};

export default FindCar;
