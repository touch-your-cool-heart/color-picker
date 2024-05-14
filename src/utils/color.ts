import convert from 'color-convert';

type RGB = [number, number, number];

export function hueToRgb(hue: number) {
    const hsv: RGB = [hue, 100, 100];
    return convert.hsv.rgb(hsv);
}

export function rgbToHue(r: number, g: number, b: number) {
    const rgb: RGB = [r, g, b];
    return convert.rgb.hsv(rgb);
}

export function rgbToHex(r: number, g: number, b: number) {
    const rgb: RGB = [r, g, b];
    return `#${convert.rgb.hex(rgb)}`;
}

export function hexToRgb(hex: string) {
    return convert.hex.rgb(hex);
}
