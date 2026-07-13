import { Outlet } from "react-router-dom";

import Navbar from "../components/common/Navbar";
import Sidebar from "../components/common/Sidebar";

const DashboardLayout = () => {
  return (
    <>
      <Navbar />

      <div className="container-fluid">
        <div className="row">

          <div className="col-md-3 col-lg-2 p-0">
            <Sidebar />
          </div>

          <div className="col-md-9 col-lg-10 p-4">
            <Outlet />
          </div>

        </div>
      </div>
    </>
  );
};

export default DashboardLayout;