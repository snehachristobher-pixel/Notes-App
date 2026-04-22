const SearchBar = ({ search, setSearch }) => {
  return (
    <div className="relative mb-4">
      {/* 🔍 Icon */}
      <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>

      <input
        type="text"
        placeholder="Search notes..."
        className="w-full pl-10 pr-8 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* ❌ Clear button */}
      {search && (
        <button
          onClick={() => setSearch("")}
          className="absolute right-3 top-2 text-gray-500 hover:text-black"
        >
          ✖
        </button>
      )}
    </div>
  );
};

export default SearchBar;
