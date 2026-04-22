import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Archive from "./pages/Archive";
import Trash from "./pages/Trash";
import Navbar from "./components/Navbar";

function App() {
  const [notes, setNotes] = useState([]);

  // ✅ LOAD from localStorage (SAFE)
  useEffect(() => {
    const data = localStorage.getItem("notes");

    if (data && data !== "[]") {
      setNotes(JSON.parse(data));
    }
  }, []);

  // ✅ SAVE to localStorage (FIXED 🔥)
  useEffect(() => {
    // 🚫 Prevent overwriting on initial empty render
    if (notes.length === 0) return;

    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200">
        <Navbar notes={notes} />

        <Routes>
          <Route
            path="/"
            element={<Home notes={notes} setNotes={setNotes} />}
          />
          <Route
            path="/archive"
            element={<Archive notes={notes} setNotes={setNotes} />}
          />
          <Route
            path="/trash"
            element={<Trash notes={notes} setNotes={setNotes} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
