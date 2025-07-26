import { Link } from "react-router-dom";
const Sidebar = () => (
  <aside className="w-64 bg-gray-50 p-4 border-r">
    <nav>
      <ul>
        <li>
          <Link to="/">Users</Link>
        </li>
        <li>
          <Link to="/user/create">Create User</Link>
        </li>
        <li>
          <Link to="/user/create/formik">Create User (Formik)</Link>
        </li>
      </ul>
    </nav>
  </aside>
);
export default Sidebar;
