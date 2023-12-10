import "./Header.css";
import Form from "../form/Form";

export default function Header(props) {
  console.log(props.userColorShemes);
  const headerSchemeTitle =
    props.userColorShemes.length === 0
      ? "You don't have color schemes yet..."
      : props.userColorShemes.length === 1
      ? "Your color scheme"
      : "Your color schemes";
  return (
    <header>
      <h1 className="header__title">Create new color scheme</h1>
      <Form props={props} />
      <h2 className="header__subtitle">{headerSchemeTitle}</h2>
    </header>
  );
}
