const NoteCard = ({
  note,
  deleteNote,
  togglePin,
  archiveNote,
  openView,
  openEdit,
}) => {
  return (
    <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 relative">
      {/* 📌 Pin */}
      <button
        onClick={() => togglePin(note.id)}
        className="absolute top-2 right-2 text-lg hover:scale-125 transition"
        title="Pin / Unpin"
      >
        {note.pinned ? "📌" : "📍"}
      </button>

      {/* 📝 Title */}
      <h2 className="font-bold text-lg text-gray-800 line-clamp-1">
        {note.title || "Untitled"}
      </h2>

      {/* 📄 Description */}
      <p className="text-gray-600 text-sm mt-1 line-clamp-2">
        {note.desc || "No content"}
      </p>

      {/* 🏷️ Tags */}
      {note.tags?.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {note.tags.map((tag, i) => (
            <span
              key={i}
              className="text-xs bg-gradient-to-r from-gray-200 to-gray-300 px-2 py-1 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* 🔘 Actions */}
      <div className="flex justify-between items-center mt-4 text-sm">
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={() => openView(note)}
            className="text-purple-500 hover:text-purple-700 transition"
          >
            👁 View
          </button>

          <button
            onClick={() => openEdit(note)}
            className="text-green-500 hover:text-green-700 transition"
          >
            ✏️ Edit
          </button>

          <button
            onClick={() => archiveNote(note.id)}
            className="text-blue-500 hover:text-blue-700 transition"
          >
            📦 Archive
          </button>
        </div>

        <button
          onClick={() => deleteNote(note.id)}
          className="text-red-500 hover:text-red-700 transition"
        >
          🗑 Delete
        </button>
      </div>
    </div>
  );
};

export default NoteCard;
