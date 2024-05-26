import { lib } from "../ffi.ts";
import { ghe2dTempPathFontsDir } from "../temp.ts";
import { encode } from "../utilty.ts";

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
    Almarai: new Font(`${ghe2dTempPathFontsDir}/Almarai-Regular.ttf`),
    Cairo: new Font(`${ghe2dTempPathFontsDir}/Cairo-Regular.ttf`),
    NotoSans: new Font(`${ghe2dTempPathFontsDir}/NotoSans-Regular.ttf`),
    Rubik: new Font(`${ghe2dTempPathFontsDir}/Rubik-Regular.ttf`),
    Ruwudu: new Font(`${ghe2dTempPathFontsDir}/Ruwudu-Regular.ttf`),
    Tajawal: new Font(`${ghe2dTempPathFontsDir}/Tajawal-Regular.ttf`),
}

