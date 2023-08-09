import Accordion from "./Accordion";
import KeyValue from "./KeyValue";
import Button from "./Button";

const inHumanFormat = function (duration) {
  let val = Math.floor(duration / (30 * 24 * 3600 * 1000));
  const months = val > 12 ? val % 12 : val;
  const years = val > 12 ? val / 12 : 0;
  return (
    (years > 0 ? years + " year" + (years > 1 ? "s" : "") : "") +
    (months > 0 ? months + " month" + (months > 1 ? "s" : "") : "")
  );
};

const ddmmyyyy = function (date) {
  const today = new Date(date);
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // Months start at 0!
  let dd = today.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  return dd + "/" + mm + "/" + yyyy;
};

const toAccordionItem =
  (action, actionName, certificateId, actionNeeded) => (course, index) => {
    const {
      name,
      startDate,
      endDate,
      instructor,
      university,
      description,
      marks,
      totalMarks,
      students,
    } = course;

    const title = (
      <div className="flex w-full justify-between">
        <span className="text-2xl">{name}</span>
        <div className="text-sm/[12px] text-right mr-2">
          <div>{inHumanFormat(endDate - startDate)}</div>
          <div>
            ({ddmmyyyy(startDate)} - {ddmmyyyy(endDate)})
          </div>
        </div>
      </div>
    );

    const performAction = (
      <div>
        <hr />
        <div className="flex justify-end mt-4 w-full">
          <div className="text-sm p-2 border m-2 break-all">
            {certificateId}
          </div>
          <Button
            success
            outline
            className="col-start-2"
            onClick={() => action(course)}
          >
            {actionName}
          </Button>
        </div>
      </div>
    );

    const body = (
      <div className="">
        <div className="border text-justify p-4">{description}</div>
        <div className="grid grid-cols-2">
          <KeyValue className="" label={"Insturctor"} value={instructor} />
          <KeyValue
            className="text-right"
            label={"University"}
            value={university.name}
          />
          {marks !== undefined && (
            <KeyValue className="" label={"Marks Obtained"} value={marks} />
          )}
          {students !== undefined && (
            <KeyValue
              className=""
              label={"Students Enrolled"}
              value={students}
            />
          )}
          <KeyValue
            className="text-right"
            label={"Total Marks"}
            value={totalMarks}
          />
        </div>
        <br />
        {actionNeeded(course) && performAction}
      </div>
    );

    return { id: index, title, body };
  };
/**
 *
 * @param name name of the course
 * @param start start timestamp of the course
 * @param end end timestamp of the course
 * @param instructor instructor of the course
 * @param university university giving this course
 * @param description description about the course
 * @param marks marks obtained by the student
 * @param totalMarks total marks for the course
 * @param students number of students enrolled for the course
 * @param certificate true/false should the certificate be downloadable
 * @param action (course) => {}
 * @returns
 */
function CourseAccordion({
  courses,
  action,
  actionName,
  certificateId,
  actionNeeded = (course) => true,
}) {
  const items = courses.map(
    toAccordionItem(action, actionName, certificateId, actionNeeded)
  );

  return <Accordion items={items}></Accordion>;
}
export default CourseAccordion;
