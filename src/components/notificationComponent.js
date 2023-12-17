import React from "react";
import { Form } from "react-bootstrap";

const NotificationComponent = ({
  isNotificationAllowed,
  toggleNotification,
  mode,
}) => {
  return (
    <Form>
      <Form.Check
        onChange={(e) => toggleNotification()}
        type="switch"
        id="custom-switch"
        className={`py-3 text-${mode === 'dark' ? "white" : "dark"}`}
        label={`Sound ${isNotificationAllowed ? "On" : "Off"}`}
      />
    </Form>
  );
};

export default NotificationComponent;
