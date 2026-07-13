import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import DashboardLayout from "../layouts/DashboardLayout";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import AdminDashboard from "../pages/admin/Dashboard";
import Users from "../pages/admin/Users";
import Stores from "../pages/admin/Stores";
import CreateUser from "../pages/admin/CreateUser";
import CreateStore from "../pages/admin/CreateStore";

import StoreList from "../pages/user/StoreList";
import StoreDetails from "../pages/user/StoreDetails";
import UserDetails from "../pages/admin/UserDetails";

import OwnerDashboard from "../pages/owner/Dashboard";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        
        <Route
          path="/admin"
          element={
            <ProtectedRoute roles={["ADMIN"]}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route
            path="dashboard"
            element={<AdminDashboard />}
          />
          <Route path="users" element={<Users />} />
          <Route
            path="users/create"
            element={<CreateUser />}
          />
          <Route path="stores" element={<Stores />} />
          <Route
            path="stores/create"
            element={<CreateStore />}
          />
          <Route
            path="users/:id"
            element={<UserDetails />}
           />

        </Route>

        
        <Route
          path="/user"
          element={
            <ProtectedRoute roles={["USER"]}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route path="stores" element={<StoreList />} />
          <Route
            path="stores/:id"
            element={<StoreDetails />}
          />
        </Route>

        
        <Route
          path="/store-owner"
          element={
            <ProtectedRoute roles={["STORE_OWNER"]}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route
            path="dashboard"
            element={<OwnerDashboard />}
          />
        </Route>

        
        <Route
          path="*"
          element={<Navigate to="/login" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;