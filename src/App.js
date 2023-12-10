import React from "react";
import "./App.css";
import Header from "./components/header/Header";
import ColorScheme from "./components/color-scheme/ColorScheme";
import Footer from "./components/footer/Footer";

function App() {
  const [colorState, setColorState] = React.useState({
    colorValue: "#000000",
    mode: "monochrome",
    schemeTitle: "",
  });

  const [userColorShemes, setUserColorSchemes] = React.useState(
    JSON.parse(localStorage.getItem("userColorShemes"))
      ? JSON.parse(localStorage.getItem("userColorShemes"))
      : []
  );

  localStorage.setItem("userColorShemes", JSON.stringify(userColorShemes));

  function handleChange(event) {
    setColorState((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    //console.log(colorState);
    const color = colorState.colorValue.slice(1);
    const colorsMode = colorState.mode;
    const newScheme = {
      colorValue: colorState.colorValue,
      mode: "monochrome",
      schemeTitle: colorState.schemeTitle,
      colorName: "",
      schemeColors: [],
    };

    fetch(`https://www.thecolorapi.com/id?hex=${color}&format=json`)
      .then((response) => response)
      .then((scheme) => {
        fetch(scheme.url)
          .then((response) => response.json())
          .then((scheme) => {
            newScheme.colorValue = scheme.hex.value;
            newScheme.colorName = scheme.name.value;
            newScheme.schemeColors.push({
              colorValue: scheme.hex.value,
              colorName: scheme.name.value,
            });

            fetch(
              `https://www.thecolorapi.com/scheme?hex=${color}&format=json&mode=${colorsMode}&count=5`
            )
              .then((response) => response)
              .then((data) => {
                fetch(data.url)
                  .then((response) => response.json())
                  .then((data) => {
                    newScheme.mode = data.mode;
                    const colors = data.colors.map((color) => ({
                      colorValue: color.hex.value,
                      colorName: color.name.value,
                    }));
                    newScheme.schemeColors = [
                      ...newScheme.schemeColors,
                      ...colors,
                    ];
                    setUserColorSchemes((prev) => [newScheme, ...prev]);
                    setColorState({
                      colorValue: "#000000",
                      mode: "monochrom",
                      schemeTitle: "",
                    });
                    localStorage.setItem(
                      "userColorShemes",
                      JSON.stringify(userColorShemes)
                    );
                  });
              });
          });
      });
    //submitToApi(formData);
  }

  function deleteScheme(event) {
    const deletedScheme = event.target.closest(".colors-scheme");
    setUserColorSchemes((prev) =>
      prev.filter(
        (scheme) =>
          `${scheme.colorValue}-${scheme.colorName}-${scheme.mode}-${scheme.schemeTitle}` !==
          deletedScheme.dataset.scheme
      )
    );
    localStorage.setItem("userColorShemes", JSON.stringify(userColorShemes));
  }

  const allSchemes = userColorShemes.map((scheme) => (
    <ColorScheme
      scheme={scheme}
      deleteScheme={deleteScheme}
      key={scheme.schemeTitle}
    />
  ));

  return (
    <div className="App">
      <div className="container">
        <Header
          colorState={colorState}
          userColorShemes={userColorShemes}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />

        <main>{allSchemes}</main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
