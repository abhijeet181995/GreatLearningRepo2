import className from "classnames";

function Button({
  children,
  primary,
  secondary,
  success,
  warning,
  danger,
  outline,
  rounded,
  disabled,
  href,
  ...props
}) {
  const classes = className(
    props.className,
    "flex flex-center px-3 py-1.5 border cursor-pointer",
    {
      "border-blue-600": primary,
      "border-blue-400": secondary,
      "border-green-600": success,
      "border-yellow-600": warning,
      "border-red-600": danger,
    },
    {
      " text-white bg-blue-500": !outline && primary,
      " text-white bg-blue-300": !outline && secondary,
      " text-white bg-green-500": !outline && success,
      " text-white bg-yellow-500": !outline && warning,
      " text-white bg-red-500": !outline && danger,
    },
    { "rounded-full": rounded, "bg-white": outline },
    {
      "text-blue-500": outline && primary,
      "text-blue-300": outline && secondary,
      "text-green-500": outline && success,
      "text-yellow-500": outline && warning,
      "text-red-500": outline && danger,
    },
    {
      "bg-gray-400 text-white": disabled,
    }
  );

  return (
    <button {...props} className={classes} disabled={disabled}>
      {children}
    </button>
  );
}

Button.propTypes = {
  checkVariation: ({
    primary,
    secondary,
    success,
    warning,
    danger,
    outline,
    rounded,
  }) => {
    const count =
      Number(!!primary) +
      Number(!!secondary) +
      Number(!!success) +
      Number(!!warning) +
      Number(!!danger);

    if (count > 1) {
      throw Error(
        "only one of primary, secondary, success, warning, danger can be set"
      );
    }
  },
};

export default Button;
