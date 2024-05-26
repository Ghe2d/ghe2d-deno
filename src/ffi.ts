import { existsSync } from "https://deno.land/std@0.224.0/fs/mod.ts";
import { __dirname } from "./utilty.ts";
// import { dlopen } from "jsr:@denosaurs/plug";
import { decompress } from "https://deno.land/x/zip@v1.2.5/mod.ts";

import deno from "../deno.json" with { type: "json" };
// import { createDownloadURL } from "jsr:@denosaurs/plug/download";

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

// chack in temp
// mkdir into temp
// download into temp
// run rust command

// ? dir ver@name-deno-rs

let getOSTempDir = Deno.env.get('TMPDIR') || Deno.env.get('TMP') || Deno.env.get('TEMP') || '/tmp';

if(!existsSync(getOSTempDir)) {
    if(existsSync("./.temp")) Deno.mkdirSync("./.temp");
    getOSTempDir = "./.temp";
}

const ghe2dTempNameDir = `${deno.version}@Ghe2d-deno-rs`;
const ghe2dTempPathDir = `${getOSTempDir}/${ghe2dTempNameDir}`;
const ghe2dTempPathNativeFile = `${ghe2dTempPathDir}/native.zip`;
const ghe2dTempPathNativeDir = `${ghe2dTempPathDir}/native`;

if(!existsSync(ghe2dTempPathDir)) Deno.mkdirSync(ghe2dTempPathDir);

if(!existsSync(ghe2dTempPathNativeDir)) {
    // const d = createDownloadURL("https://github.com/Ghe2d/ghe2d-deno/archive/refs/tags/v0.0.5-alpha.zip");
    const download = new URL(`${deno.github}/releases/download/${deno.version}/native.zip`);
    const response = await fetch(download);
    await Deno.writeFile(ghe2dTempPathNativeFile, new Uint8Array(await response.arrayBuffer()));
    await decompress(ghe2dTempPathNativeFile, ghe2dTempPathNativeDir);
}

// const path = `${__dirname()}/../native/target/release/ghe2d.${libSuffix}`;
const path = `${ghe2dTempPathNativeDir}/target/release/ghe2d.${libSuffix}`;

// const path = new URL(
//     `../native/target/release/ghe2d.${libSuffix}`,
//     import.meta.url
// )

if(!existsSync(path)) {
    const command = new Deno.Command("cargo", {
        args: [
            "build",
            `--manifest-path=${ghe2dTempPathNativeDir}/Cargo.toml`,
            "-r"
        ]
    });
    await command.spawn().status;
}

// if(!existsSync(path)) {
//     const command = new Deno.Command("cargo", {
//         args: [
//             "build",
//             `--manifest-path=${__dirname()}/../native/Cargo.toml`,
//             "-r",
//             "--target-dir",
//             "."
//         ]
//     });
    
//     await command.spawn().status;
// }

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

