// themeManager.js
import { ref, watch } from "vue";

const activeTheme = ref("Dark"); // Change this line to set Dark as default
const customThemes = ref({});

const Light = {
  text: "#2C3E50",            // Dark text color
  textLight: "#F9F9F9",      // Light text color
  textLighter: "#FFFFFF",     // Lighter text color
  textDark: "#1A1A1A",       // Darker text color for better contrast
  textDarker: "#000000",      // Black text color
  cardLight: "#FFFFFF",        // White card background
  cardDark: "#F0F0F0",        // Slightly off-white card background
  background: "#dfdede",       // White background
  primary: "#B8860B",         // Dark yellow color for primary elements
  secondary: "#B8860B",       // Dark yellow for secondary elements
  tertiary: "#000000",        // Black for tertiary elements
  menubg: "#2C3E50",          // Dark background for menus
  backgroundHover: "#DAA520", // Lighter yellow for hover states
  webPrimary: "#B8860B",      // Dark yellow for web primary elements
  webSecondary: "#B8860B",    // Dark yellow for web secondary elements
  webBackground: "#FFFFFF",    // White for web background
  webBackgroundDark: "#1A1A1A",// Darker background for web
  webPrimaryHover: "#DAA520", // Hover color for web primary elements
  webSecondaryHover: "#F1F1F1",// Light grey for web secondary hover
  webBackgroundHover: "#F9F9F9", // Light background hover
  webBackgroundDarkHover: "#222222", // Dark background hover
};

const Dark = { // Move Dark theme out of premadeThemes for easier access
  text: "#F9F9F9",
  textLight: "#FFFFFF",
  textLighter: "#F0F0F0",
  textDark: "#E0E0E0",
  textDarker: "#C7C7C7",
  cardLight: "#2F2F2F",
  cardDark: "#222222",
  background: "#1A1A1A",
  primary: "#B8860B",
  secondary: "#B8860B",
  tertiary: "#000000",
  menubg: "#1F2C3A",
  backgroundHover: "#DAA520",
  webPrimary: "#B8860B",
  webSecondary: "#B8860B",
  webBackground: "#2F2F2F",
  webBackgroundDark: "#151515",
  webPrimaryHover: "#DAA520",
  webSecondaryHover: "#2795AE",
  webBackgroundHover: "#1E1E1E",
  webBackgroundDarkHover: "#0F0F0F",
};

const premadeThemes = {
  Light: Light,
  Dark: Dark,
};

export function useThemeManager() {
  function setTheme(themeName) {
    activeTheme.value = themeName;
    applyTheme(themeName);
  }

  function addCustomTheme(name, colors) {
    customThemes.value[name] = colors;
  }

  function applyTheme(themeName) {
    let theme = premadeThemes[themeName] || Dark; // Change this line to use Dark as default
    Object.entries(theme).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--${key}`, value);
    });
  }

  function saveThemesToStorage() {
    localStorage.setItem("customThemes", JSON.stringify(customThemes.value));
    localStorage.setItem("activeTheme", activeTheme.value);
  }

  function loadThemesFromStorage() {
    const storedThemes = localStorage.getItem("customThemes");
    if (storedThemes) {
      customThemes.value = JSON.parse(storedThemes);
    }

    const storedActiveTheme = localStorage.getItem("activeTheme");
    if (storedActiveTheme) {
      setTheme(storedActiveTheme);
    } else {
      setTheme("Dark"); // Change this line to set Dark as default
    }
  }

  function removeCustomTheme(themeName) {
    if (customThemes.value[themeName]) {
      delete customThemes.value[themeName];
      if (activeTheme.value === themeName) {
        setTheme("default");
      }
    }
  }

  function getThemeNames() {
    return [
      "default",
      ...Object.keys(premadeThemes),
      ...Object.keys(customThemes.value),
    ];
  }

  function getThemeColors(themeName) {
    if (themeName === "default") {
      return Dark; // Change this line to return Dark as default
    } else if (premadeThemes[themeName]) {
      return premadeThemes[themeName];
    } else {
      return customThemes.value[themeName];
    }
  }

  // Watch for changes in customThemes and activeTheme
  watch(customThemes, saveThemesToStorage, { deep: true });
  watch(activeTheme, saveThemesToStorage);

  // Initial load from storage
  loadThemesFromStorage();

  return {
    activeTheme,
    customThemes,
    setTheme,
    addCustomTheme,
    removeCustomTheme,
    getThemeNames,
    getThemeColors,
    Dark, // Change this line to export Dark instead of Light
    premadeThemes,
  };
}
