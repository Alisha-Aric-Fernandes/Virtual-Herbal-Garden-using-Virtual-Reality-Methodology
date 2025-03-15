import React from "react";
import { NavLink } from "react-router-dom";
const AdminMenu = () => {
  return (
    <>
      <div className="text-center">
        <div className="list-group dashboard-menu">
          <h4>Admin Panel</h4>
          <NavLink
            to="/dashboard/admin/create-category"
            className="list-group-item list-group-item-action"
          >
            Create Category
          </NavLink>
          <NavLink
            to="/dashboard/admin/create-plant"
            className="list-group-item list-group-item-action"
          >
            Create Model
          </NavLink>
          <NavLink
            to="/dashboard/admin/plants"
            className="list-group-item list-group-item-action"
          >
       Plants
          </NavLink>
          {/* <NavLink
            to="/dashboard/admin/users"
            className="list-group-item list-group-item-action"
          >
       Users
          </NavLink> */}
          
          
        </div>
      </div>
    </>
  );
};

export default AdminMenu;