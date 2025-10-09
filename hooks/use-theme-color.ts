/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { Colors } from '@/constants/theme';

/**
 * Simplified theme color hook — returns only light colors and ignores OS color scheme.
 * This project removed dark mode support, so we always fallback to light palette.
 */
export function useThemeColor(
  props: { light?: string },
  colorName: keyof typeof Colors.light
) {
  const colorFromProps = props?.light;

  if (colorFromProps) {
    return colorFromProps;
  }

  return Colors.light[colorName];
}
