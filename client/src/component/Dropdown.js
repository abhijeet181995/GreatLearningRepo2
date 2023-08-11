import { useEffect, useRef, useState } from "react";
import { GoChevronDown, GoChevronLeft } from "react-icons/go";
import Panel from "./Panel";
function Dropdown({ items, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selection, setSelection] = useState(null);

  const divEl = useRef();

  useEffect(() => {
    const handler = (event) => {
      if (!divEl.current) return;
      if (!divEl.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handler, true);

    return () => {
      document.removeEventListener("click", handler);
    };
  }, []);

  function handleSelected(item) {
    onSelect(item);
    setIsOpen(false);
    setSelection(item.value);
  }

  const renderedItems = items.map((item) => {
    const { id, value } = item;
    return (
      <div
        className="hover:bg-sky-100 rounded courser-pointer p-1"
        key={id}
        onClick={() => handleSelected(item)}
      >
        {value}
      </div>
    );
  });

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div ref={divEl} className="w-48 relative">
      <Panel
        className="flex justify-between items-center cursor-pointer border rounded p-3 shadow bg-white w-full"
        onClick={handleOpen}
      >
        {selection || "Select"}
        {isOpen ? <GoChevronDown /> : <GoChevronLeft />}
      </Panel>
      {isOpen && (
        <Panel className="absolute top-full border rounded p-3 shadow bg-white w-full">
          {renderedItems}
        </Panel>
      )}
    </div>
  );
}

export default Dropdown;
