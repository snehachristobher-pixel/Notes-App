const NoteCard = ({ note, deleteNote, togglePin, archiveNote }) => {
  return (
    <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1 relative">
      {/* 📌 Pin Button */}
      <button
        onClick={() => togglePin(note.id)}
        className="absolute top-2 right-2 text-lg hover:scale-125 transition"
      >
        {note.pinned ? "📌" : "📍"}
      </button>

      {/* 📝 Title */}
      <h2 className="font-bold text-lg text-gray-800">{note.title}</h2>

      {/* 📄 Description */}
      <p className="text-gray-600 text-sm mt-1">{note.desc}</p>

      {/* 🏷️ Tags */}
      <div className="flex flex-wrap gap-2 mt-3">
        {note.tags?.map((tag, i) => (
          <span
            key={i}
            className="text-xs bg-gradient-to-r from-gray-200 to-gray-300 px-2 py-1 rounded-full"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* 🔘 Actions */}
      <div className="flex justify-between items-center mt-4">
        {/* 📦 Archive */}
        <button
          onClick={() => archiveNote(note.id)}
          className="text-blue-500 hover:text-blue-700 font-medium transition"
        >
          📦 Archive
        </button>

        {/* 🗑 Delete */}
        <button
          onClick={() => deleteNote(note.id)}
          className="text-red-500 hover:text-red-700 font-medium transition"
        >
          🗑 Delete
        </button>
      </div>
    </div>
  );
};

export default NoteCard;
