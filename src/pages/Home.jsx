import { useState, useEffect } from "react";
import NoteForm from "../components/NoteForm";
import NoteCard from "../components/NoteCard";
import SearchBar from "../components/SearchBar";

const Home = ({ notes, setNotes }) => {
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState("");

  const [viewNote, setViewNote] = useState(null);
  const [editNote, setEditNote] = useState(null);

  // 🔍 DEBUG (optional but helpful)
  useEffect(() => {
    console.log("NOTES UPDATED:", notes);
  }, [notes]);

  // ✅ Add Note
  const addNote = (note) => {
    setNotes((prev) => {
      const updated = [note, ...prev];
      return updated;
    });
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

  // ✅ Pin / Unpin
  const togglePin = (id) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, pinned: !n.pinned } : n)),
    );
  };

  // 👁 View
  const openView = (note) => setViewNote(note);

  // ✏️ Edit
  const openEdit = (note) => setEditNote(note);

  // 🔥 FIXED UPDATE (no data loss)
  const updateNote = (updatedNote) => {
    setNotes((prev) =>
      prev.map((n) =>
        n.id === updatedNote.id
          ? {
              ...n,
              title: updatedNote.title,
              desc: updatedNote.desc,
              tags: updatedNote.tags || n.tags,
            }
          : n,
      ),
    );

    setEditNote(null);
  };

  // 🏷️ Get all tags
  const allTags = [...new Set(notes.flatMap((n) => n.tags || []))];

  // ✅ Filter + Sort
  const activeNotes = notes
    .filter((n) => !n.trashed && !n.archived)
    .filter(
      (n) =>
        n.title.toLowerCase().includes(search.toLowerCase()) ||
        n.desc.toLowerCase().includes(search.toLowerCase()),
    )
    .filter((n) => (selectedTag ? n.tags?.includes(selectedTag) : true))
    .sort((a, b) => {
      if (a.pinned !== b.pinned) return b.pinned - a.pinned;
      return (b.createdAt || 0) - (a.createdAt || 0);
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
            className={`px-3 py-1 rounded-lg text-sm ${
              selectedTag === tag ? "bg-blue-500 text-white" : "bg-gray-200"
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

      {/* 📄 Section */}
      <h2 className="text-xl font-semibold mb-4">Your Notes</h2>

      {/* 🧾 Notes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {activeNotes.length > 0 ? (
          activeNotes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              deleteNote={deleteNote}
              togglePin={togglePin}
              archiveNote={archiveNote}
              openView={openView}
              openEdit={openEdit}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 text-lg">
            No notes found 😔
          </p>
        )}
      </div>

      {/* 👁 VIEW MODAL */}
      {viewNote && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl w-96">
            <h2 className="text-xl font-bold mb-2">{viewNote.title}</h2>
            <p>{viewNote.desc}</p>

            <button
              onClick={() => setViewNote(null)}
              className="mt-4 text-red-500"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* ✏️ EDIT MODAL */}
      {editNote && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="bg-white p-6 rounded-xl w-96">
            <h2 className="text-xl font-bold mb-3">Edit Note</h2>

            <input
              className="w-full p-2 border mb-2"
              value={editNote.title}
              onChange={(e) =>
                setEditNote({
                  ...editNote,
                  title: e.target.value,
                })
              }
            />

            <textarea
              className="w-full p-2 border mb-2"
              value={editNote.desc}
              onChange={(e) =>
                setEditNote({
                  ...editNote,
                  desc: e.target.value,
                })
              }
            />

            <div className="flex justify-between">
              <button
                onClick={() => updateNote(editNote)}
                className="text-green-500"
              >
                Save
              </button>

              <button
                onClick={() => setEditNote(null)}
                className="text-red-500"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
