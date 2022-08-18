import "./Button.styles.scss";

const Button = ({ children, buttonType, ...otherProps }) => {
  const BUTTON_TYPE_CLASSES = {
    google: "google-sign-in",
    inverted: "inverted",
  };

  return (
    <button className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`}>
      {children}
    </button>
  );
};

export default Button;
