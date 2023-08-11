import Datepicker from "tailwind-datepicker-react";
import Button from "./Button";
import InputBox from "./InputBox";
import { useState } from "react";

const buildOptions = (title, minDate) => {
  return {
    title,
    autoHide: true,
    todayBtn: false,
    clearBtn: false,
    maxDate: new Date("2099-12-31"),
    minDate,
    theme: {
      background: "",
      todayBtn: "",
      clearBtn: "",
      icons: "",
      text: "",
      disabledText: "bg-red-100",
      input: "",
      inputIcon: "",
      selected: "",
    },
    icons: {
      // () => ReactElement | JSX.Element
      prev: () => <span>&lt;</span>,
      next: () => <span>&gt;</span>,
    },
    datepickerClassNames: "top-12",
    defaultDate: minDate,
    language: "en",
  };
};

function CourseForm({ onSubmit }) {
  const [showStartDate, setShowStartDate] = useState(false);
  const [showEndDate, setShowEndDate] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [instructor, setInstructor] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [totalMarks, setTotalMarks] = useState("");

  const handleStartDateChange = (selectedDate) => {
    setStartDate(selectedDate);
  };
  const handleStartDateClose = (state) => {
    setShowStartDate(state);
  };
  const handleEndDateChange = (selectedDate) => {
    setEndDate(selectedDate);
  };
  const handleEndDateClose = (state) => {
    setShowEndDate(state);
  };

  const handleFormSubmit = () => {
    const course = {
      name,
      description,
      instructor,
      startDate: startDate.getTime(),
      endDate: endDate.getTime(),
      totalMarks,
      students: 0,
    };

    onSubmit(course);

    setName("");
    setDescription("");
    setInstructor("");
    setStartDate(new Date());
    setEndDate(new Date());
    setTotalMarks("");
  };

  return (
    <div className="p-2 border">
      <InputBox value={name} setValue={setName} placeholder="Course Name" />
      <InputBox
        value={description}
        setValue={setDescription}
        placeholder="Description"
        textarea
      />
      <InputBox
        value={instructor}
        setValue={setInstructor}
        placeholder="Instructor"
      />
      <div className="flex">
        <Datepicker
          options={buildOptions("Start Date", new Date())}
          onChange={handleStartDateChange}
          show={showStartDate}
          setShow={handleStartDateClose}
        />
        <Datepicker
          options={buildOptions("End Date", startDate)}
          onChange={handleEndDateChange}
          show={showEndDate}
          setShow={handleEndDateClose}
        />
      </div>
      <InputBox
        value={totalMarks}
        type="number"
        setValue={setTotalMarks}
        placeholder="Total Marks"
      />
      <Button
        primary
        outline
        className="w-full"
        onClick={handleFormSubmit}
        disabled={
          !name ||
          !description ||
          !instructor ||
          !startDate ||
          !endDate ||
          !totalMarks
        }
      >
        CREATE COURSE
      </Button>
    </div>
  );
}
export default CourseForm;
