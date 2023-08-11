import classNames from "classnames";

function InputBox({ textarea, value, setValue, ...props }) {
  const classes = classNames(props.className, "border w-full outline-none");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div className="border p-2 w-full">
      {textarea || (
        <input
          value={value}
          className={classes}
          onChange={handleChange}
          {...props}
        />
      )}
      {textarea && (
        <textarea
          value={value}
          className={classes}
          onChange={handleChange}
          {...props}
        />
      )}
    </div>
  );
}

export default InputBox;
