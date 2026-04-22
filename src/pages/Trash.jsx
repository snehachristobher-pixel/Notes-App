const Trash = ({ notes, setNotes }) => {
  // 🗑️ Get trashed notes
  const trashedNotes = notes.filter((n) => n.trashed);

  // 🔄 Restore note
  const restoreNote = (id) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, trashed: false } : n)),
    );
  };

  // ❌ Delete permanently
  const deleteForever = (id) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Trash 🗑️</h1>

      {trashedNotes.length === 0 ? (
        <p>No deleted notes</p>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {trashedNotes.map((note) => (
            <div key={note.id} className="bg-white p-4 rounded-xl shadow">
              <h2 className="font-bold">{note.title}</h2>
              <p>{note.desc}</p>

              <div className="flex gap-3 mt-2">
                <button
                  onClick={() => restoreNote(note.id)}
                  className="text-blue-500"
                >
                  Restore
                </button>

                <button
                  onClick={() => deleteForever(note.id)}
                  className="text-red-500"
                >
                  Delete Forever
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Trash;
