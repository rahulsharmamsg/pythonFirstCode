import { Link, useNavigate } from "react-router-dom"
import { getToken, getUserName, getUserRole, logout } from "./Auth"
const Header = () => {
  const navigate = useNavigate()
  const userName = getUserName()
  const token = getToken()
  const userRole = getUserRole()
  const handleLogout = () => {
    logout()
    navigate("/login");
  }
  return (<>
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Brand / Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">
            A
          </div>
          <span className="text-lg font-semibold text-gray-800">
            Python+React
          </span>
        </div>

        {/* Center Menu */}
        <nav className="hidden md:flex items-center gap-8">
          {token && userRole == 'user' && (
            <>
              <Link
                to="/"
                className="text-gray-600 hover:text-indigo-600 font-medium transition"
              >
                Home
              </Link>
              {/* <Link
                to="/about"
                className="text-gray-600 hover:text-indigo-600 font-medium transition"
              >
                About
              </Link> */}
            </>
          )}

          {token && userRole == 'admin' && (
            <>
             <Link
                to="/dashboard"
                className="text-gray-600 hover:text-indigo-600 font-medium transition"
              >
                Dashboard
              </Link>
              <Link
                to="task"
                className="text-gray-600 hover:text-indigo-600 font-medium transition"
              >
                Create Task
              </Link>
              <Link
                to="addproject"
                className="text-gray-600 hover:text-indigo-600 font-medium transition"
              >
                Add Project
              </Link>
                
              {/* <Link
                to="/about"
                className="text-gray-600 hover:text-indigo-600 font-medium transition"
              >
                About
              </Link> */}
            </>
          )}
        </nav>

        {/* Right Auth Section */}
        <div className="flex items-center gap-4">
          {token ? (
            <>
              <span className="text-sm text-gray-600">
                Hi, <b>{userName}</b>
              </span>
              <Link
                to="/profile"
                className="text-gray-600 hover:text-indigo-600 font-medium transition"
              >
                Profile
              </Link>

              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (<>
            <Link
              to="/login"
              className="text-gray-600 hover:text-indigo-600 font-medium transition"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition shadow-sm"
            >
              Register
            </Link>
          </>)}

        </div>

      </div>
    </header>
  </>)
}
export default Header