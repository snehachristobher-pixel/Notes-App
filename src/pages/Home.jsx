import { useState } from "react";
import NoteForm from "../components/NoteForm";
import NoteCard from "../components/NoteCard";
import SearchBar from "../components/SearchBar";

const Home = ({ notes, setNotes }) => {
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState("");

  // ✅ Add Note
  const addNote = (note) => {
    setNotes((prev) => [note, ...prev]);
  };

  // ✅ Delete (move to trash)
  const deleteNote = (id) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, trashed: true } : n)),
    );
  };

  // ✅ Archive
  const archiveNote = (id) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, archived: true } : n)),
    );
  };

  // ✅ Pin / Unpin (FIXED 🔥)
  const togglePin = (id) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, pinned: !n.pinned } : n)),
    );
  };

  // 🏷️ Get all unique tags
  const allTags = [...new Set(notes.flatMap((n) => n.tags || []))];

  // ✅ Filter + Sort Notes
  const activeNotes = notes
    .filter((n) => !n.trashed && !n.archived)
    .filter(
      (n) =>
        n.title.toLowerCase().includes(search.toLowerCase()) ||
        n.desc.toLowerCase().includes(search.toLowerCase()),
    )
    .filter((n) => (selectedTag ? n.tags?.includes(selectedTag) : true))
    .sort((a, b) => {
      // 📌 pinned notes first
      if (a.pinned !== b.pinned) return b.pinned - a.pinned;

      // ⏱️ maintain original order
      return b.createdAt - a.createdAt;
    });

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* 🏷️ Title */}
      <h1 className="text-3xl font-bold mb-6 text-center">Notes App 📝</h1>

      {/* 🔍 Search */}
      <SearchBar search={search} setSearch={setSearch} />

      {/* 🏷️ Tag Filter */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-3 py-1 rounded-lg text-sm transition ${
              selectedTag === tag
                ? "bg-blue-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            #{tag}
          </button>
        ))}

        {allTags.length > 0 && (
          <button
            onClick={() => setSelectedTag("")}
            className="text-sm underline ml-2"
          >
            Clear
          </button>
        )}
      </div>

      {/* 📝 Form */}
      <div className="mb-8">
        <NoteForm addNote={addNote} />
      </div>

      {/* 📄 Section Title */}
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Your Notes</h2>

      {/* 🧾 Notes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {activeNotes.length > 0 ? (
          activeNotes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              deleteNote={deleteNote}
              togglePin={togglePin}
              archiveNote={archiveNote}
            />
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">
            No notes found 😔
          </p>
        )}
      </div>
    </div>
  );
};

export default Home;
