import { useState } from "react";

const NoteForm = ({ addNote }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [tags, setTags] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // 🚫 Prevent empty note
    if (!title.trim() && !desc.trim()) return;

    const newNote = {
      id: Date.now(),
      title: title.trim(),
      desc: desc.trim(),

      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t),

      pinned: false,
      archived: false,
      trashed: false,

      createdAt: Date.now(), // 🔥 required for sorting
    };

    console.log("NEW NOTE CREATED:", newNote); // 🔍 DEBUG

    addNote(newNote);

    // ✅ Reset form
    setTitle("");
    setDesc("");
    setTags("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/80 backdrop-blur-md p-5 rounded-2xl shadow-lg border border-gray-200"
    >
      {/* 📝 Title */}
      <input
        type="text"
        placeholder="Title..."
        className="w-full p-2 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* 📄 Description */}
      <textarea
        placeholder="Take a note..."
        className="w-full p-2 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
        rows={3}
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />

      {/* 🏷️ Tags */}
      <input
        type="text"
        placeholder="Tags (comma separated)"
        className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />

      {/* 🔘 Button */}
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg shadow hover:scale-105 active:scale-95 transition"
      >
        ➕ Add Note
      </button>
    </form>
  );
};

export default NoteForm;
