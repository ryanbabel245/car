import { MoonStarsFill, Sun } from "react-bootstrap-icons";
import AddFindModel from "./addFindModel";
import NotificationComponent from "./notificationComponent";

const Sidebar = ({
  mode,
  setMode,
  toggleNotification,
  isNotificationAllowed,
}) => {
  return (
    <div className="d-flex flex-column  align-items-center h-100">
      <div className="d-flex align-items-center">
        <NotificationComponent
          toggleNotification={toggleNotification}
          isNotificationAllowed={isNotificationAllowed}
          mode={mode}
        />
      </div>
      <div
        onClick={() => setMode(mode === "dark" ? "white" : "dark")}
        className={`bg bg-${mode} text-${
          mode === "dark" ? "white" : "dark"
        } border p-3 py-2 my-2 rounded`}
      >
        {mode === "dark" ? <MoonStarsFill /> : <Sun />}
      </div>
      <AddFindModel mode={mode} />
    </div>
  );
};

export default Sidebar;
