import { existsSync } from "https://deno.land/std@0.224.0/fs/exists.ts";
import { decompress } from "https://deno.land/x/zip@v1.2.5/decompress.ts";

import deno from "../deno.json" with { type: "json" };
import native from "../deno.json" with { type: "json" };


export let getOSTempDir = Deno.env.get('TMPDIR') || Deno.env.get('TMP') || Deno.env.get('TEMP') || '/tmp';

if(!existsSync(getOSTempDir)) {
    if(existsSync("./.temp")) Deno.mkdirSync("./.temp");
    getOSTempDir = "./.temp";
}

const ghe2dTempNameDir = `${deno.version}@Ghe2d-deno-rs`;
export const ghe2dTempPathDir = `${getOSTempDir}/${ghe2dTempNameDir}`;
export const ghe2dTempPathNativeFile = `${ghe2dTempPathDir}/native.zip`;
export const ghe2dTempPathNativeDir = `${ghe2dTempPathDir}/native`;
export const ghe2dTempPathFontsFile = `${ghe2dTempPathDir}/Fonts.zip`;
export const ghe2dTempPathFontsDir = `${ghe2dTempPathDir}/Fonts`;

if(!existsSync(ghe2dTempPathDir)) Deno.mkdirSync(ghe2dTempPathDir);

if(!existsSync(ghe2dTempPathNativeDir)) {
    const download = new URL(`${native.github}/releases/download/${native.version}/native.zip`);
    const response = await fetch(download);
    await Deno.writeFile(ghe2dTempPathNativeFile, new Uint8Array(await response.arrayBuffer()));
    await decompress(ghe2dTempPathNativeFile, ghe2dTempPathNativeDir);
}

if(!existsSync(ghe2dTempPathFontsDir)) {
    const download = new URL(`${native.github}/releases/download/${native.version}/Fonts.zip`);
    const response = await fetch(download);
    await Deno.writeFile(ghe2dTempPathFontsFile, new Uint8Array(await response.arrayBuffer()));
    await decompress(ghe2dTempPathFontsFile, ghe2dTempPathFontsDir);
}

const libSuffix = Deno.build.os == "windows" ? "dll" : Deno.build.os == "darwin" ? "dylib" : "so";
export const ffi_path = `${ghe2dTempPathNativeDir}/target/release/ghe2d.${libSuffix}`;

if(!existsSync(ffi_path)) {
    const command = new Deno.Command("cargo", {
        args: [
            "build",
            `--manifest-path=${ghe2dTempPathNativeDir}/Cargo.toml`,
            "-r"
        ]
    });
    await command.spawn().status;
}