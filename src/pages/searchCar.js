"use client";
import AddSearchModal from "@/components/addSearchModel";
import { searchData } from "@/utils/httpRequest";
import axios from "axios";
import { useEffect, useState } from "react";
import Head from "next/head";
import { Button, Modal, Tab, Tabs } from "react-bootstrap";
import SearchCarComponent from "@/components/searchCarComponent";
import { numbers } from "@/constants/cars";
import NotificationComponent from "@/components/notificationComponent";

const SearchCar = () => {
  const [lastId, setLastId] = useState("");
  const [datas, setDatas] = useState(null);
  const [categories, setCategories] = useState([]);
  const [show, setShow] = useState(false);
  // const [timer, setTimer] = useState(sec);
  const [isNotificationAllowed, setIsNotificationAllowed] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleDelete = async (id) => {
    const tempArr = await categories.filter((i) => i.id !== id);
    await localStorage.setItem("searchModel", JSON.stringify(tempArr));
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
    setCategories(JSON.parse(localStorage.getItem("searchModel")) || []);
  }, []);

  useEffect(() => {
    getLastId();
  }, []);

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
      if (lastId && categories?.length > 0) {
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
        <title>Car</title>
        <meta name="description" content="Car" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="d-flex justify-content-between">
          <AddSearchModal />
          <div>
            <NotificationComponent
              toggleNotification={toggleNotification}
              isNotificationAllowed={isNotificationAllowed}
            />
            {lastId && (
              <Button
                variant="warning"
                onClick={() => window.location.reload()}
              >
                Refresh Id:
                <strong>{lastId}</strong>
              </Button>
            )}
          </div>
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
                    >
                      x
                    </span>
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
              <SearchCarComponent
                key={item.id}
                params={item}
                setDatas={setDatas}
                isNotificationAllowed={isNotificationAllowed}
                data={
                  !datas
                    ? null
                    : +item.kmMin <= +datas.km &&
                      +item.kmMax >= +datas.km &&
                      +item.yearMin <= +datas.year &&
                      +item.yearMax >= +datas.year &&
                      datas
                }
              />
            </Tab>
          ))}
        </Tabs>
      </main>
    </>
  );
};

export default SearchCar;
