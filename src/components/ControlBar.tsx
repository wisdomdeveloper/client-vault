import { Search, Upload } from "lucide-react";
import { ChangeEventHandler, RefObject } from "react";

type controlProps = {
  search: string;
  setSearchFunc: ChangeEventHandler<HTMLInputElement>;
  handleClickFunc: () => void;
  handleUploadFunc: (event: React.ChangeEvent<HTMLInputElement>) => void;
  fileInput: RefObject<HTMLInputElement | null>;
};

const ControlBar = ({
  search,
  setSearchFunc,
  handleClickFunc,
  handleUploadFunc,
  fileInput,
}: controlProps) => {
  return (
    <div className="flex items-center w-full justify-between py-6">
      <div className="flex items-center w-full max-w-[40%] border border-gray-700 rounded-lg px-3 shadow-sm bg-[#111] focus-within:ring-2 focus-within:ring-blue-500">
        <Search className="w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search files..."
          value={search}
          onChange={setSearchFunc}
          className="w-full px-2 py-3 bg-transparent outline-none text-sm text-gray-200"
        />
      </div>
      <button
        onClick={handleClickFunc}
        className="flex items-center font-medium bg-blue-600 hover:bg-blue-700 py-2 px-5 cursor-pointer rounded-md shadow text-white transition"
      >
        <Upload className="w-5 h-5" />
        <span className="ml-2">Upload</span>
      </button>
      <input type="file" ref={fileInput} hidden onChange={handleUploadFunc} />
    </div>
  );
};

export default ControlBar;
