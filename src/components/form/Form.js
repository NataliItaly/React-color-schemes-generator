import "./Form.css";

export default function Form(props) {
  return (
    <form
      action="@"
      className="form"
      id="color-form"
      onSubmit={props.props.handleSubmit}
    >
      <input
        type="color"
        name="colorValue"
        className="form__input form__input_color"
        id="color-input"
        onChange={props.props.handleChange}
        value={props.props.colorState.colorValue}
      />
      <select
        name="mode"
        className="form__input"
        id="color-select"
        onChange={props.props.handleChange}
        value={props.props.colorState.mode}
      >
        <option value="monochrome">Monochrome</option>
        <option value="monochrome-dark">Monochrome-dark</option>
        <option value="monochrome-light">Monochrome-light</option>
        <option value="analogic">Analogic</option>
        <option value="complement">Complement</option>
        <option value="analogic-complement">Analogic-complement</option>
        <option value="triad">Triad</option>
        <option value="quad">Quad</option>
      </select>
      <input
        className="form__input"
        type="text"
        name="schemeTitle"
        value={props.props.colorState.schemeTitle}
        placeholder="Title you color scheme"
        onChange={props.props.handleChange}
      />
      <button className="form__get-color-btn form__input"></button>
    </form>
  );
}
