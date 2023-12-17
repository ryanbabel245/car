import Head from "next/head";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Badge,
  Button,
  CloseButton,
  Container,
  Modal,
  Spinner,
  Tab,
  Tabs,
} from "react-bootstrap";
// import CarComponent from "@/components/carComponent";
import AddModal from "@/components/addModal";
export default function Home() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [allData, setAllData] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleDelete = async (id) => {
    const tempArr = await categories.filter((i) => i.id !== id);
    await localStorage.setItem("model", JSON.stringify(tempArr));
    window.location.reload();
  };
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("model"));
    const options = {
      url: "/api/hello",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      data: {
        brand: "ford",
        model: "focus",
        kmMin: 0,
        kmMax: 100000,
      },
    };
    setLoading(true);

    axios(options)
      .then((response) => {
        setAllData(response.data.data);
        setCategories(
          storedData?.map((item, index) => {
            return {
              ...item,
              data:
                index === 1
                  ? []
                  : response.data.data.slice(index, index * 3 + 1),
            };
          }) || []
        );
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
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
        <div>
          <AddModal />
        </div>
        {!loading ? (
          <Tabs defaultActiveKey={allData && allData[0]?.id} className="mb-3">
            <Tab eventKey={allData[0]?.id} title="All">
              {/* <CarComponent data={allData} /> */}
            </Tab>
            {categories &&  categories?.map((item) => (
              <Tab
                key={item.id}
                eventKey={item.id}
                title={
                  <div style={{ width: "150px" }}>
                    <strong className="me-3">{item.title}</strong>
                    {item.data.length > 0 && (
                      <Badge bg="success">{item.data.length}</Badge>
                    )}

                    <>
                      <CloseButton
                        onClick={handleShow}
                        className="btn"
                        style={{ height: "2px" }}
                      />
                      <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                          <Modal.Title>
                            Do you want to delete{" "}
                            <strong>{item.title}</strong> ?
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
                {/* <CarComponent data={item.data} /> */}
              </Tab>
            ))}
          </Tabs>
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
      </main>
    </>
  );
}
