import { Link, useLocation } from "react-router-dom";

const Navbar = ({ notes }) => {
  const location = useLocation();

  const archiveCount = notes.filter((n) => n.archived).length;
  const trashCount = notes.filter((n) => n.trashed).length;

  const linkStyle = (path) =>
    location.pathname === path
      ? "text-blue-500 font-bold"
      : "text-gray-600";

  return (
    <div className="flex gap-6 p-4 bg-white shadow mb-4">

      <Link to="/" className={linkStyle("/")}>
        🏠 Home
      </Link>

      <Link to="/archive" className={linkStyle("/archive")}>
        📦 Archive
        {archiveCount > 0 && (
          <span className="ml-2 bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">
            {archiveCount}
          </span>
        )}
      </Link>

      <Link to="/trash" className={linkStyle("/trash")}>
        🗑️ Trash
        {trashCount > 0 && (
          <span className="ml-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
            {trashCount}
          </span>
        )}
      </Link>

    </div>
  );
};

export default Navbar;