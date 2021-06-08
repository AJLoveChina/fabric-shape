import { ICircleOptions, IRectOptions, ITextOptions } from "fabric/fabric-impl";

export interface IShapeTextType {
  rect: IRectOptions;
  circle: ICircleOptions;
}
export interface IShapeTextOptions<T extends keyof IShapeTextType> {
  shapeType: T;
  placeholder?: string;
  textOptions?: ITextOptions;
  shapeOptions?: IShapeTextType[T];
  insidePadding?: number;
  editable?: boolean;
}

export const font = `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif`;
