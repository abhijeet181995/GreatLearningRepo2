import { useState } from "react";
import { GoChevronLeft, GoChevronDown } from "react-icons/go";

function Accordion({ items }) {
  const [expandedIndex, setExpandedIndex] = useState(-1);

  const handleExpanded = (index) => {
    if (index === expandedIndex) {
      setExpandedIndex(-1);
    } else {
      setExpandedIndex(index);
    }
  };

  const renderedItems = items.map(({ id, title, body }, index) => {
    const isExpanded = expandedIndex === index;

    const icon = (
      <span>{isExpanded ? <GoChevronDown /> : <GoChevronLeft />}</span>
    );

    return (
      <div key={id}>
        <div
          onClick={() => handleExpanded(index)}
          className="flex justify-between p-3 bg-gray-50 border-b items-center cursor-pointer"
        >
          {title}
          {icon}
        </div>
        {isExpanded && <div className="border-b p-5">{body}</div>}
      </div>
    );
  });
  return <div className="border-x border-t rounded">{renderedItems}</div>;
}

export default Accordion;
