type deleteType = {
  deleteFunc: (idx: number) => void;
  id: number;
  show: boolean;
  showFunc: React.Dispatch<React.SetStateAction<boolean>>;
};

const ConfirmDelete = ({ deleteFunc, id, show, showFunc }: deleteType) => {
  return (
    <div
      className={`p-8 bg-gray-800/40 ${
        show ? "absolute" : "hidden"
      } rounded-md absolute z-50 top-[45%] left-[45%]`}
    >
      <div>
        <p className="font-medium text-[length:var(--body-l)]">Are you sure you want to delete?</p>
        <div className="flex justify-between items-center mt-10">
          <button
            onClick={() => deleteFunc(id)}
            className="py-3 px-3 max-w-[50%] font-bold hover:bg-[#f443362a] w-full cursor-pointer rounded-full border border-[#f4433680]"
          >
            Yes
          </button>
          <button
            onClick={() => showFunc(!show)}
            className="border max-w-[50%] w-full ml-6 font-bold border-[#ffffff4f] hover:bg-[#ffffff31] py-3 px-3 cursor-pointer rounded-full"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDelete;
