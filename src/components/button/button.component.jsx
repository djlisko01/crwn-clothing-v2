import "./button.styles.scss";

const DEFAULT_BUTTON_TYPE = {
  google: "google-sign-in",
  inverted: "inverted",
};
const Button = ({ children, buttonType, ...otherProps }) => {
  return (
    <button
      className={`button-container ${DEFAULT_BUTTON_TYPE[buttonType]}`}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default Button;
