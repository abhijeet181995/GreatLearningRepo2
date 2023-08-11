import { useState } from "react";
import CourseAccordion from "./CourseAccordion";
import SearchBox from "./SearchBox";

function FilterCourseBox({ items, onItemSelect }) {
  const filter = ({ name, description, university }, query) => {
    if (!query) return false;
    const queryLC = query.toLowerCase();
    return (
      name.toLowerCase().indexOf(queryLC) >= 0 ||
      description.toLowerCase().indexOf(queryLC) >= 0 ||
      university.name.toLowerCase().indexOf(queryLC) >= 0
    );
  };

  const [displayedItems, setDisplayedItems] = useState([]);

  const filterdisplayedItems = (query) => {
    setDisplayedItems(items.filter((item) => filter(item, query)));
  };

  return (
    <div>
      <SearchBox onInput={filterdisplayedItems} />
      <CourseAccordion
        courses={displayedItems}
        actionName="Apply"
        action={onItemSelect}
      />
    </div>
  );
}

export default FilterCourseBox;
