import { models } from "@/constants/cars";
import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

function AddModal2() {
  const [formData, setFormData] = useState({
    id: null,
    title: "",
    brand: "",
    model: "",
    kmMin: 0,
    kmMax: 10000,
  });
  const [show, setShow] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`submitted ==>`, formData);
    const storedData = JSON.parse(localStorage.getItem("model2"));
    localStorage.setItem(
      "model2",
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
      <Button variant="primary" onClick={handleShow}>
        Add New Model
      </Button>

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

            <Form.Group className="mb-3" controlId="model">
              <Form.Label>Brand</Form.Label>
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  {selectedBrand || "Choose a Brand"}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {models.map((brand) => (
                    <Dropdown.Item
                      onClick={() => {
                        setSelectedBrand(brand.title);
                        setFormData({ ...formData, brand: brand.title });
                      }}
                      key={brand.title}
                    >
                      {brand.title}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>

            <Form.Group className="mb-3" controlId="brand">
              <Form.Label>Model</Form.Label>
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  {selectedModel || "Choose a Model"}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {models
                    .find((i) => i.title === selectedBrand)
                    ?.models.map((model) => (
                      <Dropdown.Item
                        onClick={() => {
                          setSelectedModel(model);
                          setFormData({ ...formData, model });
                        }}
                        key={model}
                      >
                        {model}
                      </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
              </Dropdown>
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
                placeholder="1000"
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

export default AddModal2;
