import { setX, setY, setXAndY, setWidth, setHeight, setCircleImage, setPath, encode } from "./utilty.ts";
import { lib } from "./ffi.ts";
import { Ghe2dReturn, ImageOptions, ImageReturn } from "./types.ts";

export function createImage(img: Deno.PointerValue<unknown>, options: ImageOptions) : Ghe2dReturn<ImageOptions, ImageReturn> {
    if(!options) options ={};
    if(!options.x) options.x = 0;
    if(!options.y) options.y = 0;
    if(!options.width && options.width != 0) options.width = 50;
    if(!options.height && options.height != 0) options.height = 50;
    if(!options.isCircle) options.isCircle = false;
    if(!options.path) options.path = "";
    return ({
        x:options.x,
        y:options.y,
        width:options.width,
        height: options.height,
        isCircle:options.isCircle,
        path:options.path,
        draw(options?: ImageOptions) { return draw(this, img, options) },
        setX(x) { return setX(this, x)},
        setY(y) { return setY(this, y)},
        setXAndY(x, y) { return setXAndY(this, x, y)},
        setWidth(width) { return setWidth(this, width) },
        setHeight(height) { return setHeight(this, height) },
        setPath(path: string) { return setPath(this, path) },
        setCircleImage(setIsCircle) { return setCircleImage(this, setIsCircle)},
    })
}

function draw(data_return: Ghe2dReturn<ImageOptions, ImageReturn>, img: Deno.PointerValue<unknown>, options?: ImageOptions): Ghe2dReturn<ImageOptions, ImageReturn> {
    if(!options) options ={};
    data_return.x = options.x ?? data_return.x as number;
    data_return.y = options.y ?? data_return.y as number;
    data_return.width = options.width ?? data_return.width as number;
    data_return.height = options.height ?? data_return.height as number;
    data_return.isCircle = options.isCircle ?? data_return.isCircle as boolean;
    data_return.path = options.path ?? data_return.path as string;
    const buffer_path = encode(data_return.path);
    lib.symbols.load_image(img, buffer_path, buffer_path.length, data_return.x, data_return.y, data_return.width, data_return.height, data_return.isCircle)
    return data_return;
}