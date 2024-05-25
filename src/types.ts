import { Font } from "./text_manager/font.ts";

export interface CircleOptions{
    x?:number
    y?:number
    radius?: number
    start?: number
    end?: number
    color?: Rgba
    type?: "fill" | "stroke"
}

export interface ImageOptions{
    path?:string,
    x?:number,
    y?:number,
    width?:number,
    height?:number, 
    radius?:number, 
    isCircle?:boolean
}

export interface RectOptions{
    x?:number,
    y?:number,
    width?:number,
    height?:number
    color?: Rgba
    type?: "fill" | "stroke"
}

export interface TextOptions{
    x?:number,
    y?:number,
    text?:string,
    size?:number, 
    font?: Font,
    color?: Rgba
}

export type Ghe2dReturn<O, R> = R & O & {
    draw(options?: O): Ghe2dReturn<O, R>
    setX(x: number): Ghe2dReturn<O, R>
    setY(y: number): Ghe2dReturn<O, R>
    setXAndY(x: number, y: number): Ghe2dReturn<O, R>
}

export interface Ghe2dColorReturn {
    setRgb(red: number, green: number, blue: number): this
    setRgba(red: number, green: number, blue: number, alpha: number): this
    // setGradient(gradient: Gradient): this
    setColor(color: Color): this
}

export interface CircleReturn extends Ghe2dColorReturn {
    setRadius(radius: number): this
    setstart(start: number): this
    setEnd(end: number): this
    setType(type: "fill" | "stroke"): this
}

export interface RectReturn extends Ghe2dColorReturn {
    setWidth(width: number): this
    setHeight(height: number): this
    setType(type: "fill" | "stroke"): this
}

export interface TextReturn extends Ghe2dColorReturn {
    setSize(size: number): this
    setText(text: string): this
    setFont(font: Font): this
}

export interface ImageReturn {
    setWidth(width: number): this
    setHeight(height: number): this
    setCircleImage(isCircle: boolean): this
    setPath(path: string): this
}

export interface Rgb {
    red: number,
    green: number,
    blue: number
}

export interface Rgba extends Rgb {
    alpha: number
}

export type Color = Rgba;