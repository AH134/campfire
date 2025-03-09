export type ColorScheme = "dark" | "light" | null;
export const enum COLOR_THEMES {
    DARK = "dark",
    LIGHT = "light",
}

export const setColorScheme = () => {
    const enableDarkTheme = window.matchMedia(
        "(prefers-color-scheme: dark)"
    ).matches;
    const selectedTheme = localStorage.getItem("theme");

    if (enableDarkTheme && !selectedTheme) {
        localStorage.setItem("theme", COLOR_THEMES.DARK);
    }

    document.documentElement.classList.toggle(
        COLOR_THEMES.DARK,
        localStorage.theme === COLOR_THEMES.DARK ||
            (!("theme" in localStorage) && enableDarkTheme)
    );

    return localStorage.getItem("theme") as ColorScheme;
};

export const setTheme = (theme: ColorScheme) => {
    if (theme === COLOR_THEMES.DARK) {
        localStorage.setItem("theme", COLOR_THEMES.LIGHT);
        document.documentElement.classList.remove(COLOR_THEMES.DARK);
    } else {
        localStorage.setItem("theme", COLOR_THEMES.DARK);
        document.documentElement.classList.add(COLOR_THEMES.DARK);
    }
};
