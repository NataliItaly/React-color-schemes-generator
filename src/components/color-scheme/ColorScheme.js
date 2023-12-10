import ColorItem from "../color-item/ColorItem";
import "./ColorScheme.css";

export default function ColorScheme({ scheme, deleteScheme }) {
  const colors = scheme.schemeColors.map((color, i) => (
    <ColorItem color={color} key={`${color.colorValue}-${i}`} />
  ));

  return (
    <div
      className="colors-scheme"
      data-scheme={`${scheme.colorValue}-${scheme.colorName}-${scheme.mode}-${scheme.schemeTitle}`}
    >
      <h2 className="colors-scheme__title">{scheme.schemeTitle}</h2>
      <button
        className="colors-scheme__delete-btn"
        id="delete-scheme-btn"
        onClick={deleteScheme}
      ></button>
      {colors}
    </div>
  );
}
