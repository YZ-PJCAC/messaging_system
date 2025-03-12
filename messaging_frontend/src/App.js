import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Chat from "./components/Chat";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center">
        {/* Navigation Bar */}
        <nav className="w-full bg-blue-500 p-4 shadow-md text-white">
          <div className="container mx-auto flex justify-between">
            <h1 className="text-xl font-bold">Messaging App</h1>
            <div className="space-x-4">
              <Link to="/register" className="hover:underline">Register</Link>
              <Link to="/login" className="hover:underline">Login</Link>
              <Link to="/dashboard" className="hover:underline">Chat</Link>
            </div>
          </div>
        </nav>

        {/* Tailwind Test */}
        <div className="text-3xl font-bold text-red-500 mt-6">
          Tailwind CSS is working!
        </div>

        {/* Page Content */}
        <div className="w-full max-w-lg mt-6">
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Chat />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
