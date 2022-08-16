export declare type Mode = 'light' | 'dark';
export declare type Accent = 'blue' | 'lightBlue' | 'green' | 'indigo' | 'orange' | 'pink' | 'purple' | 'red' | 'lightRed' | 'teal' | 'lightYellow' | 'yellow' | 'grey';
export declare type Gradients = 'blue' | 'green' | 'red';
export declare const accentsRaw: {
    [key in Mode]: {
        [key in Accent]: string;
    };
};
export declare const accents: {
    [key in Mode]: {
        [key in Accent]: string;
    };
};
export declare const shadesRaw: {
    light: {
        background: string;
        backgroundSecondary: string;
        backgroundTertiary: string;
        foreground: string;
        groupBackground: string;
    };
    dark: {
        background: string;
        backgroundSecondary: string;
        backgroundTertiary: string;
        foreground: string;
        groupBackground: string;
    };
};
export declare const shades: {
    light: {
        accent: string;
        accentSecondary: string;
        accentSecondaryHover: string;
        backgroundHide: string;
        backgroundHideFallback: string;
        foregroundSecondary: string;
        foregroundSecondaryHover: string;
        foregroundTertiary: string;
        groupBorder: string;
        border: string;
        borderSecondary: string;
        borderTertiary: string;
        text: string;
        textSecondary: string;
        textSecondaryHover: string;
        textTertiary: string;
        textTertiaryHover: string;
        textPlaceholder: string;
    };
    dark: {
        accent: string;
        accentSecondary: string;
        accentSecondaryHover: string;
        backgroundHide: string;
        backgroundHideFallback: string;
        foregroundSecondary: string;
        foregroundSecondaryHover: string;
        foregroundTertiary: string;
        groupBorder: string;
        border: string;
        borderSecondary: string;
        borderTertiary: string;
        text: string;
        textSecondary: string;
        textSecondaryHover: string;
        textTertiary: string;
        textTertiaryHover: string;
        textPlaceholder: string;
    };
};
export declare const colors: {
    base: {
        black: string;
        white: string;
        current: string;
        inherit: string;
        transparent: string;
    };
    light: {
        blue: string;
        lightBlue: string;
        green: string;
        indigo: string;
        orange: string;
        pink: string;
        purple: string;
        red: string;
        lightRed: string;
        teal: string;
        lightYellow: string;
        yellow: string;
        grey: string;
        accent: string;
        accentSecondary: string;
        accentSecondaryHover: string;
        accentTertiary: string;
        accentText: string;
        accentGradient: string;
        background: string;
        backgroundHide: string;
        backgroundSecondary: string;
        backgroundTertiary: string;
        border: string;
        borderSecondary: string;
        borderTertiary: string;
        foreground: string;
        foregroundSecondary: string;
        foregroundSecondaryHover: string;
        foregroundTertiary: string;
        groupBackground: string;
        groupBorder: string;
        gradients: {
            blue: string;
            green: string;
            red: string;
        };
        text: string;
        textPlaceholder: string;
        textSecondary: string;
        textTertiary: string;
    };
    dark: {
        blue: string;
        lightBlue: string;
        green: string;
        indigo: string;
        orange: string;
        pink: string;
        purple: string;
        red: string;
        lightRed: string;
        teal: string;
        lightYellow: string;
        yellow: string;
        grey: string;
        accent: string;
        accentSecondary: string;
        accentSecondaryHover: string;
        accentTertiary: string;
        accentText: string;
        accentGradient: string;
        background: string;
        backgroundHide: string;
        backgroundSecondary: string;
        backgroundTertiary: string;
        border: string;
        borderSecondary: string;
        borderTertiary: string;
        foreground: string;
        foregroundSecondary: string;
        foregroundSecondaryHover: string;
        foregroundTertiary: string;
        groupBackground: string;
        groupBorder: string;
        gradients: {
            blue: string;
            green: string;
            red: string;
        };
        text: string;
        textPlaceholder: string;
        textSecondary: string;
        textTertiary: string;
    };
};
