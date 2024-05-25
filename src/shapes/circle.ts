import { setX, setY, setXAndY, setRadius, setType,setColor, setRgba, setRgb, setStart, setEnd, rgba_to_buffer } from "../utilty.ts";
import { lib } from "../ffi.ts";
import { CircleOptions, CircleReturn, Ghe2dReturn, Rgba } from "../types.ts";

export function createCircle(img: Deno.PointerValue<unknown>, options: CircleOptions) : Ghe2dReturn<CircleOptions, CircleReturn> {
    if(!options) options ={};
    if(!options.x) options.x = 0;
    if(!options.y) options.y = 0;
    if(!options.start) options.start = 0;
    if(!options.end && options.radius != 0) options.end = 2 * 3.14;
    if(!options.radius && options.radius != 0) options.radius = 50;
    if(!options.color) options.color = {red: 0, green: 0, blue: 0, alpha: 255};
    if(!options.type) options.type = "fill";
    return ({
        x:options.x,
        y:options.y,
        radius:options.radius,
        start: options.start,
        end: options.end,
        color:options.color,
        type: options.type,
        draw(options?: CircleOptions) { return draw(this, img, options) },
        setX(x) { return setX(this, x)},
        setY(y) { return setY(this, y)},
        setXAndY(x, y) { return setXAndY(this, x, y)},
        setRadius(radius) { return setRadius(this, radius) },
        setstart(start){ return setStart(this, start) },
        setEnd(end) { return setEnd(this, end) },
        setType(type) { return setType(this, type)},
        setRgb(red, green, blue) { return setRgb(this, red, green, blue)},
        setRgba(red, green, blue, alpha) { return setRgba(this, red, green, blue, alpha)},
        setColor(color) { return setColor(this, color)}
    })
}

function draw(data_return: Ghe2dReturn<CircleOptions, CircleReturn>, img: Deno.PointerValue<unknown>, options?: CircleOptions): Ghe2dReturn<CircleOptions, CircleReturn> {
    if(!options) options ={};
    data_return.x = options.x ?? data_return.x as number;
    data_return.y = options.y ?? data_return.y as number;
    data_return.radius = options.radius ?? data_return.radius as number;
    data_return.start = options.start ?? data_return.start as number;
    data_return.end = options.end ?? data_return.end as number;
    data_return.color = options.color ?? data_return.color as Rgba;
    data_return.type = options.type ?? data_return.type as "fill";
    lib.symbols.draw_circle(img, data_return.x, data_return.y, data_return.radius, data_return.start, data_return.end, rgba_to_buffer(data_return.color))
    return data_return;
}