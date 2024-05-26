import { lib } from "./src/ffi.ts";
import { createImage } from "./src/image.ts";
import { createCircle } from "./src/shapes/circle.ts";
import { createRect } from "./src/shapes/rect.ts";
import { createText } from "./src/text_manager/text.ts";
import { CircleOptions, ImageOptions, RectOptions, TextOptions } from "./src/types.ts";
import { encode, get_buffer } from "./src/utilty.ts";

export class Ghe2d {
    private img: Deno.PointerValue<unknown>;
    constructor(width: number, height: number) {
        this.img = lib.symbols.create_img(width, height);
    }

    createCircle(options: CircleOptions) {
        return createCircle(this.img, options)
    }

    createRect(options: RectOptions) {
        return createRect(this.img, options)
    }

    createText(options: TextOptions) {
        return createText(this.img, options)
    }

    createImage(options: ImageOptions) {
        return createImage(this.img, options)
    }

    toBuffer() {
        return get_buffer(lib.symbols.buffer(this.img))
    }

    save(path: string) {
        const buffer_path = encode(path);
        lib.symbols.save(this.img, buffer_path, buffer_path.length);
    }
}

export * from "./src/image.ts";
export * from "./src/shapes/circle.ts";
export * from "./src/shapes/rect.ts";
export * from "./src/text_manager/text.ts";
export * from "./src/text_manager/font.ts";
export * from "./src/utilty.ts";
export * from "./src/types.ts";
