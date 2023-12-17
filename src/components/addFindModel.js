import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

function AddFindModel({mode}) {
  const [formData, setFormData] = useState({
    id: null,
    kmMin: 0,
    kmMax: 1000000,
    priceMin: 1000,
    priceMax: 30000,
    yearMin: 2000,
    yearMax: 2023,
  });
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedData = JSON.parse(localStorage.getItem("findModel"));
    localStorage.setItem(
      "findModel",
      storedData
        ? JSON.stringify([
            ...storedData,
            { ...formData, id: new Date().getTime() },
          ])
        : JSON.stringify([{ ...formData, id: new Date().getTime() }])
    );
    window.location.reload();
  };

  const handleChange = ({ currentTarget: input }) => {
    const tempFormData = { ...formData };
    tempFormData[input.name] = input.value;

    setFormData(tempFormData);
  };
  return (
    <>
      <button
        className={`btn btn-${mode} rounded border-text-${
          mode === "dark" ? "white" : "dark"
        }  d-flex justify-content-center align-items-center `}
        style={{ width: "50px", height: "50px" }}
        onClick={handleShow}
      >
         Add
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Title</Form.Label>
              <Form.Control
                onChange={handleChange}
                type="text"
                placeholder="Write a Title"
                name="title"
                autoFocus
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="kmMin">
              <Form.Label>Km Min</Form.Label>
              <Form.Control
                onChange={handleChange}
                type="text"
                name="kmMin"
                placeholder="0"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="kmMax">
              <Form.Label>Km Max</Form.Label>
              <Form.Control
                onChange={handleChange}
                type="text"
                name="kmMax"
                placeholder="1000000"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="priceMin">
              <Form.Label>Price Min</Form.Label>
              <Form.Control
                onChange={handleChange}
                type="text"
                name="priceMin"
                placeholder="1000"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="priceMax">
              <Form.Label>Price Max</Form.Label>
              <Form.Control
                onChange={handleChange}
                type="text"
                name="priceMax"
                placeholder="30000"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="yearMin">
              <Form.Label>Year Min</Form.Label>
              <Form.Control
                onChange={handleChange}
                type="text"
                name="yearMin"
                placeholder="2000"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="yearMax">
              <Form.Label>Year Max</Form.Label>
              <Form.Control
                onChange={handleChange}
                type="text"
                name="yearMax"
                placeholder="2023"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={(e) => {
              handleSubmit(e);
              handleClose();
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddFindModel;
