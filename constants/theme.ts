/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

// New project palette
const primary = '#0F1640'; // deep navy
const secondary = '#42628C'; // blue-gray
const muted = '#C7D1D9'; // light gray-blue
const accent = '#8C3C1F'; // warm accent
const neutral = '#F2F2F2'; // light background

export const Colors = {
  light: {
    text: primary,
    background: neutral,
    tint: secondary,
    icon: muted,
    tabIconDefault: muted,
    tabIconSelected: secondary,
    accent,
  },
  dark: {
    text: '#ECEDEE',
    background: '#0A0A0A',
    tint: secondary,
    icon: muted,
    tabIconDefault: muted,
    tabIconSelected: secondary,
    accent,
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
