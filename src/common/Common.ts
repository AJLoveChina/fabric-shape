import {
  ICircleOptions,
  IGroupOptions,
  IObjectOptions,
  IRectOptions,
  ITextOptions,
  ITriangleOptions,
} from "fabric/fabric-impl";

export type IParallelogramOptions = IRectOptions & { percent?: number };
export interface IShapeTextType {
  rect: IRectOptions;
  circle: ICircleOptions;
  parallelogram: IParallelogramOptions;
  triangle: ITriangleOptions;
}

export interface IShapeTextOptions<T extends keyof IShapeTextType>
  extends IGroupOptions {
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
