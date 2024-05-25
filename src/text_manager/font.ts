import { lib } from "../ffi.ts";
import { __dirname, encode } from "../utilty.ts";

export class Font {
    public data: unknown
    public path: string
    constructor(path: string) {
        const buffer_path = encode(path);
        this.data = lib.symbols.load_font(buffer_path, buffer_path.length);
        this.path = path;
    }
}

export const defaultFonts = {
    Almarai: new Font(`${__dirname()}/../fonts/Almarai-Regular.ttf`),
    Cairo: new Font(`${__dirname()}/../fonts/Cairo-Regular.ttf`),
    NotoSans: new Font(`${__dirname()}/../fonts/NotoSans-Regular.ttf`),
    Rubik: new Font(`${__dirname()}/../fonts/Rubik-Regular.ttf`),
    Ruwudu: new Font(`${__dirname()}/../fonts/Ruwudu-Regular.ttf`),
    Tajawal: new Font(`${__dirname()}/../fonts/Tajawal-Regular.ttf`),
}

