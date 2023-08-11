import { useState } from "react";

function SearchBox({ onInput }) {
  const [query, setQuery] = useState("");

  const handleInput = (event) => {
    setQuery(event.target.value);
    onInput(event.target.value);
  };

  return (
    <div className="border w-full p-2 flex">
      <input
        value={query}
        onChange={handleInput}
        className="w-full border p-1 focus:bg-blue-100 focus:outline-none"
      />
    </div>
  );
}

export default SearchBox;
