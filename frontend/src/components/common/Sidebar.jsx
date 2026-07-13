import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const Sidebar = () => {
  const { user } = useAuth();

  const adminLinks = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
    },
    {
      name: "Users",
      path: "/admin/users",
    },
    {
      name: "Create User",
      path: "/admin/users/create",
    },
    {
      name: "Stores",
      path: "/admin/stores",
    },
    {
      name: "Create Store",
      path: "/admin/stores/create",
    },
  ];

  const userLinks = [
    {
      name: "Stores",
      path: "/user/stores",
    },
  ];

  const ownerLinks = [
    {
      name: "Dashboard",
      path: "/store-owner/dashboard",
    },
  ];

  let links = [];

  switch (user?.role) {
    case "ADMIN":
      links = adminLinks;
      break;

    case "USER":
      links = userLinks;
      break;

    case "STORE_OWNER":
      links = ownerLinks;
      break;

    default:
      links = [];
  }

  return (
    <div
      className="bg-light border-end vh-100"
      style={{ minHeight: "100vh" }}
    >
      <div className="p-3">

        <h5 className="fw-bold mb-4">
          Navigation
        </h5>

        <div className="nav flex-column nav-pills">

          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `nav-link mb-2 ${
                  isActive
                    ? "active"
                    : "text-dark"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}

        </div>
      </div>
    </div>
  );
};

export default Sidebar;