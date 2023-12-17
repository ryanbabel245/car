import { useState } from "react";
import { List, XLg } from "react-bootstrap-icons";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import Sidebar from "./sidebar";

function HamburgerMenu({
  mode,
  setMode,
  toggleNotification,
  isNotificationAllowed,
}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="p-3 hamburger-button">
      <Button variant="light" className="hamburger-button" onClick={handleShow}>
        <List />
      </Button>

      <Offcanvas
        className="bg bg-dark text-white hamburger-button"
        show={show}
        onHide={handleClose}
      >
        <Offcanvas.Header
          className="d-flex justify-content-end pe-4"
          style={{ cursor: "pointer" }}
          onClick={() => handleClose()}
        >
          <XLg />
        </Offcanvas.Header>
        <Offcanvas.Body
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
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default HamburgerMenu;
