import { useState } from "react";
import SearchBox from "./SearchBox";
import PaginatedList from "./PaginatedList";
import { renderUniversityFn } from "../util/university";

function SelectionBox({ itemList, onSelect }) {
  const [items, setItems] = useState([]);
  const handleInput = (query) => {
    if (!query) {
      return setItems([]);
    }

    setItems(
      itemList.filter(
        ({ name }) => name.toLowerCase().indexOf(query.toLowerCase()) >= 0
      )
    );
  };

  const handleItemSelect = (item) => {
    onSelect(item);
    setItems([]);
  };

  return (
    <div className="w-full">
      <SearchBox onInput={handleInput} />
      <PaginatedList
        items={items}
        className="border drop-shadow-lg"
        renderItemFn={renderUniversityFn("Allow", handleItemSelect)}
      />
    </div>
  );
}

export default SelectionBox;
