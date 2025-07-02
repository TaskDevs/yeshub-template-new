const Modal = ({ onClose, title, children }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
    <div className="bg-white rounded-md shadow-lg w-full max-w-md p-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">{title}</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-black">
          ✕
        </button>
      </div>
      <div>{children}</div>
    </div>
  </div>
);

export default Modal;
