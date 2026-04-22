const Archive = ({ notes, setNotes }) => {
  
  // 📦 Filter archived notes
  const archivedNotes = notes.filter((n) => n.archived);

  // 🔄 Unarchive
  const unarchiveNote = (id) => {
    setNotes((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, archived: false } : n
      )
    );
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Archive 📦</h1>

      {archivedNotes.length === 0 ? (
        <p>No archived notes</p>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {archivedNotes.map((note) => (
            <div
              key={note.id}
              className="bg-white p-4 rounded-xl shadow"
            >
              <h2 className="font-bold">{note.title}</h2>
              <p>{note.desc}</p>

              <button
                onClick={() => unarchiveNote(note.id)}
                className="mt-2 text-blue-500"
              >
                Unarchive
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Archive;