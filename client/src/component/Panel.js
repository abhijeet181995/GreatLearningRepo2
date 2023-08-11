import classNames from "classnames";

function Panel({ children, className, ...props }) {
  const classes = classNames("border rounded p-3 bg-white w-full", className);
  return (
    <div {...props} className={classes}>
      {children}
    </div>
  );
}

export default Panel;
