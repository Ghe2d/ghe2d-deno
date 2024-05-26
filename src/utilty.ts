import { CircleReturn, TextReturn, Ghe2dReturn, CircleOptions, TextOptions, Color, ImageOptions, ImageReturn, Rgba } from "./types.ts";
import { Font } from "./text_manager/font.ts";

export function setX<R extends {x?: number}>(data_return: R, x: number): R {
    data_return.x = x;
    return data_return;
}

export function setY<R extends {y?: number}>(data_return: R, y: number): R {
    data_return.y = y;
    return data_return;
}

export function setXAndY<R extends {x?: number, y?: number}>(data_return: R, x: number, y: number): R {
    data_return.x = x;
    data_return.y = y;
    return data_return;
}

// export function setAngle(data_return: TriangleReturn, x: number, y: number, num: number): TriangleReturn {
//     if(num == 1) {
//         data_return.x1 = x;
//         data_return.y1 = y;
//     }
//     else if(num == 2) {
//         data_return.x2 = x;
//         data_return.y2 = y;
//     }
//     else if(num == 3) {
//         data_return.x3 = x;
//         data_return.y3 = y;
//     }
//     return data_return;
// }

// export function setLine(data_return: LineReturn, x: number, y: number, num: number): LineReturn {
//     if(num == 1) {
//         data_return.x1 = x;
//         data_return.y1 = y;
//     }
//     else if(num == 2) {
//         data_return.x2 = x;
//         data_return.y2 = y;
//     }
//     return data_return;
// }

export function setRadius(data_return: Ghe2dReturn<CircleOptions, CircleReturn>, radius: number): Ghe2dReturn<CircleOptions, CircleReturn> {
    data_return.radius = radius;
    return data_return;
}

export function setStart(data_return: Ghe2dReturn<CircleOptions, CircleReturn>, start: number): Ghe2dReturn<CircleOptions, CircleReturn> {
    data_return.start = start;
    return data_return;
}

export function setEnd(data_return: Ghe2dReturn<CircleOptions, CircleReturn>, end: number): Ghe2dReturn<CircleOptions, CircleReturn> {
    data_return.end = end;
    return data_return;
}

export function setWidth<R extends {width?: number}>(data_return: R, width: number): R {
    data_return.width = width;
    return data_return;
}

export function setSize(data_return: Ghe2dReturn<TextOptions, TextReturn>, size: number): Ghe2dReturn<TextOptions, TextReturn> {
    data_return.size = size;
    return data_return;
}

export function setHeight<R extends {height?: number}>(data_return: R, height: number): R {
    data_return.height = height;
    return data_return;
}

export function setText(data_return: Ghe2dReturn<TextOptions, TextReturn>, text: string): Ghe2dReturn<TextOptions, TextReturn> {
    data_return.text = text;
    return data_return;
}

export function setCircleImage(data_return: Ghe2dReturn<ImageOptions, ImageReturn>, isCircle: boolean): Ghe2dReturn<ImageOptions, ImageReturn> {
    data_return.isCircle = isCircle;
    return data_return;
}

export function setPath(data_return: Ghe2dReturn<ImageOptions, ImageReturn>, path: string): Ghe2dReturn<ImageOptions, ImageReturn> {
    data_return.path = path;
    return data_return;
}

export function setFont(data_return: Ghe2dReturn<TextOptions, TextReturn>, font: Font): Ghe2dReturn<TextOptions, TextReturn> {
    data_return.font = font;
    return data_return;
}

export function setType<R extends {type?: "fill" | "stroke"}>(data_return: R, type: "fill" | "stroke"): R {
    data_return.type = type;
    return data_return;
}
export function setRgb<R extends {color?: Color}>(data_return: R, red: number, green: number, blue: number) : R {
    data_return.color = {red, green, blue, alpha: 255};
    return data_return;
}

export function setRgba<R extends {color?: Color}>(data_return: R, red: number, green: number, blue: number, alpha: number) : R {
    data_return.color = {red, green, blue, alpha};
    return data_return;
}

// export function setGradient(data_return: R, gradient: Gradient) : R {
//     data_return.color = {Gradients: gradient.stops};
//     return data_return;
// }

export function setColor<R extends {color?: Color}>(data_return: R, color: Color) : R {
    data_return.color = color;
    return data_return;
}

export function encode(v: string | Uint8Array): Uint8Array {
    if (typeof v !== "string") return v
    return new TextEncoder().encode(v)
}

export function decode(v: Uint8Array): string {
    return new TextDecoder().decode(v)
}

export function rgba_to_buffer(rgba: Rgba) {
    const keys = Object.keys(rgba);
    if(keys.length <= 0) return new Uint8Array(0);
    const buffer = new Uint8Array(keys.length);
    for(const key of keys) {
        // const bytes = new ByteSet(8);
        // bytes.write.uint32(rgba[key as "red"]);
        if(key == "red") buffer.set([rgba[key as "red"]], 0);
        else if(key == "green") buffer.set([rgba[key as "red"]], 1);
        else if(key == "blue") buffer.set([rgba[key as "red"]], 2);
        else if(key == "alpha") buffer.set([rgba[key as "red"]], 3);
    }
    return buffer;
}