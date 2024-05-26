import { ffi_path } from "./temp.ts";

export const lib = Deno.dlopen(ffi_path, {
    create_img: {
        parameters: ["i32", "i32"],
        result: "pointer"
    },
    buffer: {
        parameters: ["pointer"],
        result: {
            struct: ["pointer", "isize"]
        }
    },
    save: {
        parameters: ["pointer", "buffer", "usize"],
        result: "void"
    },
    draw_circle: {
        parameters: ["pointer", "f32", "f32", "f32", "f32", "f32", {struct : ["u8", "u8", "u8", "u8"]}],
        result: "void"
    },
    draw_rect: {
        parameters: ["pointer", "f32", "f32", "f32", "f32", {struct : ["u8", "u8", "u8", "u8"]}],
        result: "void"
    },
    draw_text: {
        parameters: ["pointer", "pointer", "buffer", "usize", "f32", "f32", "f32", {struct : ["u8", "u8", "u8", "u8"]}],
        result: "void"
    },
    load_font: {
        parameters: ["buffer", "usize"],
        result: "pointer"
    },
    load_image: {
        parameters: ["pointer", "buffer", "usize", "f32", "f32", "f32", "f32", "bool"],
        result: "void"
    }
});
