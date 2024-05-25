import { existsSync } from "https://deno.land/std@0.224.0/fs/mod.ts";
import { __dirname } from "./utilty.ts";

let libSuffix = "";
switch (Deno.build.os) {
  case "windows":
    libSuffix = "dll";
    break;
  case "darwin":
    libSuffix = "dylib";
    break;
  default:
    libSuffix = "so";
    break;
}



const path = `${__dirname()}/../native/target/release/ghe2d.${libSuffix}`;

if(!existsSync(path)) {
    const command = new Deno.Command("cargo", {
        args: [
            "build",
            `--manifest-path=${__dirname()}/../native/Cargo.toml`,
            "-r"
        ]
    });
    
    await command.spawn().status;
}

// 

export const lib = Deno.dlopen(path, {
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

