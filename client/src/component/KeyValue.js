import classNames from "classnames";

function KeyValue({ label, value, className }) {
  const classes = classNames(className, "border p-4");

  return (
    <div className={classes}>
      {label && (
        <span className="mr-2">
          <b>{label}</b>:
        </span>
      )}
      {value}
    </div>
  );
}

export default KeyValue;
