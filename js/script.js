function enableColorSchemeMode(mode) {
  const activeColorScheme = resolveToColorScheme(mode);

  setColorSchemeMode(mode);
  setActiveColorScheme(activeColorScheme);
  saveColorSchemeMode(mode);
}

function resolveToColorScheme(mode) {
  if (mode === "system") {
    return querySystemColorScheme()
  } else {
    return mode;
  }
}

function querySystemColorScheme() {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return "dark"
  }
  return "light"
}

function listenForSystemColorSchemeChange() {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    let mode = fetchColorSchemeMode();
    if (mode === "system") {
      enableColorSchemeMode("system")
    }
  });
}

function setColorSchemeMode(mode) {
  document.documentElement.dataset.colorSchemeMode = mode;
}

function setActiveColorScheme(colorScheme) {
  document.documentElement.dataset.activeColorScheme = colorScheme;
}

function saveColorSchemeMode(mode) {
  sessionStorage.setItem("color-scheme-mode", mode);
}

function fetchColorSchemeMode() {
  return sessionStorage.getItem("color-scheme-mode");
}

function setColorSchemeRadioInputChecked(colorSchemeMode) {
  if (colorSchemeMode) {
    let selectedInput;
    switch (colorSchemeMode) {
      case "light":
        selectedInput = document.getElementById("color-scheme-selected-light");
        break;
      case "dark":
        selectedInput = document.getElementById("color-scheme-selected-dark");
        break;
      case "system":
        selectedInput = document.getElementById("color-scheme-selected-system");
        break;
      default:
        selectedInput = document.getElementById("color-scheme-selected-system");
    }
    selectedInput.checked = true;
  }
}

const colorSchemeMode = fetchColorSchemeMode()
if (colorSchemeMode) {
  enableColorSchemeMode(colorSchemeMode);
} else {
  enableColorSchemeMode("system");
}
listenForSystemColorSchemeChange();


document.addEventListener("DOMContentLoaded", function () {
  if (colorSchemeMode) {
    setColorSchemeRadioInputChecked(colorSchemeMode);
  } else {
    setColorSchemeRadioInputChecked("system");
  }
});
