import { Search } from "lucide-react";

const ControlBar = () => {
  return (
    <div className="flex items-center w-full justify-between px-4 py-8">
      {/* Search Input */}
      <div className="flex items-center w-full max-w-[40%] border border-[var(--border-color)] rounded-lg px-3 shadow-sm focus-within:ring-2 focus-within:ring-[var(--bg-primary)]">
        <Search className="w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search for items..."
          className="w-full px-2 py-3 bg-transparent outline-none text-sm"
        />
      </div>

      {/* Import Button */}
      <div>
        <button className="flex items-center font-medium bg-[var(--bg-primary)] hover:opacity-80 py-2 px-5 cursor-pointer rounded-md shadow-sm">
          <span className="font-bold text-lg">+</span>
          <span className="ml-2">Import</span>
        </button>
      </div>
    </div>
  );
};

export default ControlBar;
