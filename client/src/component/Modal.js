import { useEffect } from "react";
import ReactDOM from "react-dom";
import Button from "./Button";

function Modal({ positive, negative, dismiss, children }) {
  useEffect(() => {
    document.body.classList.add("overflow-hidden");
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  return ReactDOM.createPortal(
    <div>
      <div
        className="fixed inset-0 bg-gray-300 opacity-80"
        onClick={dismiss && dismiss.eventHandler}
      ></div>
      <div className="fixed inset-40 p-10 bg-white">
        <div className="flex flex-col justify-between h-full">
          {children}
          <div className="flex justify-end">
            {negative && (
              <div>
                <Button danger onClick={negative.eventHandler}>
                  {negative.title}
                </Button>
              </div>
            )}
            {positive && (
              <div>
                <Button success onClick={positive.eventHandler}>
                  {positive.title}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.querySelector(".modal-container")
  );
}

export default Modal;
