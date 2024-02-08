import React from 'react';
import { IoCloseOutline } from 'react-icons/io5';

const Modal = ({ children, id, onClose, btnText, showBtn = true }) => {
  return (
    <>
      {showBtn && (
        <button
          onClick={() => document.getElementById(id).showModal()}
          className="btn bg-green-500"
        >
          {btnText}
        </button>
      )}

      <dialog id={id} className="modal">
        <div className="modal-box hidde-scrollbar">
          <button
            className="text-xl fixed right-2 top-2 text-black"
            onClick={() => {
              if (onClose) {
                onClose();
              }
              document.getElementById(id).close();
            }}
          >
            <IoCloseOutline />
          </button>
          <div className="w-full mt-5">{children}</div>
        </div>
      </dialog>
    </>
  );
};

export default Modal;
