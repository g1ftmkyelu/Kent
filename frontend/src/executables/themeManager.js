// themeManager.js
import { ref, watch } from "vue";
import { theme } from 'ant-design-vue';
import { generate } from '@ant-design/colors';

const activeTheme = ref("default");
const customThemes = ref({});
const antDesignTheme = ref({});

const Light = {
  text: "#2C3E50",
  textLight: "#F9F9F9",
  textLighter: "#9c9b9b",
  textDark: "#1A1A1A",
  textDarker: "#000000",
  fill:"#3C2312",
  cardLight: "#FFFFFF",
  cardDark: "#F0F0F0",
  background: "#F5F5F5",
  primary: "#fcae1c",
  secondary: "#fcae1c",
  tertiary: "#000000",
  menubg: "#2C3E50",
  backgroundHover: "#8d5b2f",
  webPrimary: "#fcae1c",
  webSecondary: "#fcae1c",
  webBackground: "#FFFFFF",
  webBackgroundDark: "#1A1A1A",
  webPrimaryHover: "#8d5b2f",
  webSecondaryHover: "#F1F1F1",
  webBackgroundHover: "#F9F9F9",
  webBackgroundDarkHover: "#222222",
};

const premadeThemes = {
  Light: Light,
  Dark: {
    text: "#F9F9F9",
    textLight: "#FFFFFF",
    textLighter: "#F0F0F0",
    textDark: "#E0E0E0",
    fill:"#6F421E",
    textDarker: "#C7C7C7",
    cardLight: "#2F2F2F",
    cardDark: "#222222",
    background: "#222222",
    primary: "#fcae1c",
    secondary: "#fcae1c",
    tertiary: "#000000",
    menubg: "#1F2C3A",
    backgroundHover: "#8d5b2f",
    webPrimary: "#fcae1c",
    webSecondary: "#fcae1c",
    webBackground: "#1f1f1f",
    webBackgroundDark: "#151515",
    webPrimaryHover: "#8d5b2f",
    webSecondaryHover: "#2795AE",
    webBackgroundHover: "#1E1E1E",
    webBackgroundDarkHover: "#0F0F0F",
  },
};

export function useThemeManager() {
  function setTheme(themeName) {
    activeTheme.value = themeName;
    applyTheme(themeName);
  }

  function addCustomTheme(name, colors) {
    customThemes.value[name] = colors;
  }

  function updateAntDesignTheme(colors) {
    const primaryColor = colors.primary;
    const primaryColors = generate(primaryColor);

    antDesignTheme.value = {
      token: {
        colorPrimary: primaryColor,
        colorBgContainer: colors.background,
        colorText: colors.text,
        colorTextSecondary: colors.textLight,
      },
      algorithm: colors === premadeThemes.Dark ? theme.darkAlgorithm : theme.defaultAlgorithm,
    };
  }

  function applyTheme(themeName) {
    let theme = premadeThemes[themeName] || customThemes.value[themeName] || Light;
    Object.entries(theme).forEach(([key, value]) => {
      document.documentElement.style.setProperty(`--${key}`, value);
    });
    updateAntDesignTheme(theme);
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
      setTheme("default");
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
      return Light;
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
    Light,
    premadeThemes,
    antDesignTheme,
  };
}