import { setX, setY, setXAndY, setType,setColor, setRgba, setRgb, setWidth, setHeight, rgba_to_buffer } from "../utilty.ts";
import { lib } from "../ffi.ts";
import { RectOptions, RectReturn, Ghe2dReturn, Rgba } from "../types.ts";

export function createRect(img: Deno.PointerValue<unknown>, options: RectOptions) : Ghe2dReturn<RectOptions, RectReturn> {
    if(!options) options ={};
    if(!options.x) options.x = 0;
    if(!options.y) options.y = 0;
    if(!options.width && options.width != 0) options.width = 50;
    if(!options.height && options.height != 0) options.height = 50;
    if(!options.color) options.color = {red: 0, green: 0, blue: 0, alpha: 255};
    if(!options.type) options.type = "fill";
    return ({
        x:options.x,
        y:options.y,
        width:options.width,
        height: options.height,
        color:options.color,
        type: options.type,
        draw(options?: RectOptions) { return draw(this, img, options) },
        setX(x) { return setX(this, x)},
        setY(y) { return setY(this, y)},
        setXAndY(x, y) { return setXAndY(this, x, y)},
        setWidth(width) { return setWidth(this, width) },
        setHeight(height){ return setHeight(this, height) },
        setType(type) { return setType(this, type)},
        setRgb(red, green, blue) { return setRgb(this, red, green, blue)},
        setRgba(red, green, blue, alpha) { return setRgba(this, red, green, blue, alpha)},
        setColor(color) { return setColor(this, color)}
    })
}

function draw(data_return: Ghe2dReturn<RectOptions, RectReturn>, img: Deno.PointerValue<unknown>, options?: RectOptions): Ghe2dReturn<RectOptions, RectReturn> {
    if(!options) options ={};
    data_return.x = options.x ?? data_return.x as number;
    data_return.y = options.y ?? data_return.y as number;
    data_return.width = options.width ?? data_return.width as number;
    data_return.height = options.height ?? data_return.height as number;
    data_return.color = options.color ?? data_return.color as Rgba;
    data_return.type = options.type ?? data_return.type as "fill";
    lib.symbols.draw_rect(img, data_return.x, data_return.y, data_return.width, data_return.height, rgba_to_buffer(data_return.color))
    return data_return;
}