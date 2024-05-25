import { setX, setY, setXAndY, setColor, setRgba, setRgb, setSize, setFont, setText, encode, rgba_to_buffer } from "../utilty.ts";
import { lib } from "../ffi.ts";
import { Ghe2dReturn, Rgba, TextOptions, TextReturn } from "../types.ts";
import { Font, defaultFonts } from "./font.ts";

export function createText(img: Deno.PointerValue<unknown>, options: TextOptions) : Ghe2dReturn<TextOptions, TextReturn> {
    if(!options) options ={};
    if(!options.x) options.x = 0;
    if(!options.y) options.y = 0;
    if(!options.size && options.size != 0) options.size = 50;
    if(!options.text) options.text = "";
    if(!options.color) options.color = {red: 0, green: 0, blue: 0, alpha: 255};
    if(!options.font) options.font = defaultFonts.Cairo;
    return ({
        x:options.x,
        y:options.y,
        size:options.size,
        text: options.text,
        color:options.color,
        font: options.font,
        draw(options?: TextOptions) { return draw(this, img, options) },
        setX(x) { return setX(this, x)},
        setY(y) { return setY(this, y)},
        setXAndY(x, y) { return setXAndY(this, x, y)},
        setSize(size) { return setSize(this, size) },
        setText(text){ return setText(this, text) },
        setFont(font) { return setFont(this, font)},
        setRgb(red, green, blue) { return setRgb(this, red, green, blue)},
        setRgba(red, green, blue, alpha) { return setRgba(this, red, green, blue, alpha)},
        setColor(color) { return setColor(this, color)}
    })
}

function draw(data_return: Ghe2dReturn<TextOptions, TextReturn>, img: Deno.PointerValue<unknown>, options?: TextOptions): Ghe2dReturn<TextOptions, TextReturn> {
    if(!options) options ={};
    data_return.x = options.x ?? data_return.x as number;
    data_return.y = options.y ?? data_return.y as number;
    data_return.size = options.size ?? data_return.size as number;
    data_return.text = options.text ?? data_return.text as string;
    data_return.color = options.color ?? data_return.color as Rgba;
    data_return.font = options.font ?? data_return.font as Font;
    const buffer_text = encode(data_return.text);
    lib.symbols.draw_text(img, data_return.font.data as Deno.PointerValue<unknown>, buffer_text, buffer_text.length, data_return.x, data_return.y, data_return.size, rgba_to_buffer(data_return.color))
    return data_return;
}