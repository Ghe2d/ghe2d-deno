import { existsSync } from "https://deno.land/std@0.224.0/fs/mod.ts";
import { __dirname } from "./utilty.ts";
import { dlopen } from "jsr:@denosaurs/plug";

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

const getOSTempDir = () => Deno.env.get('TMPDIR') || Deno.env.get('TMP') || Deno.env.get('TEMP') || '/tmp';
console.log(getOSTempDir());

const ff = Deno.makeTempDirSync({prefix: "ghe2d"});

console.log(ff);

// const path = `${__dirname()}/../native/target/release/ghe2d.${libSuffix}`;

const path = new URL(
    `../native/target/release/ghe2d.${libSuffix}`,
    import.meta.url
)

if(!existsSync(path)) {
    const command = new Deno.Command("cargo", {
        args: [
            "build",
            `--manifest-path=${__dirname()}/../native/Cargo.toml`,
            "-r",
            "--target-dir",
            "."
        ]
    });
    
    await command.spawn().status;
}

// 

export const lib = await dlopen(path, {
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

