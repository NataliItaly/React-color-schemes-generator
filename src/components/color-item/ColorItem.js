import "./ColorItem.css";

export default function ColorItem({ color }) {
  const itemStyle = { background: color.colorValue };

  return (
    <div className="color-item">
      <div className="color-item__bg" style={itemStyle}></div>
      <h3 className="color-item__title color-item__data">{color.colorName}</h3>
      <div className="color-item__subtitle color-item__data">
        {color.colorValue}
      </div>
    </div>
  );
}
