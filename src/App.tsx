import React, { useEffect, useRef } from "react";
import "./App.css";
import { fabric } from "fabric";
import "./shape/index.js";
import { useCanvas } from "./hook";
import { IGroupOptions, IRectOptions, ITextOptions } from "fabric/fabric-impl";
import { font, IShapeTextOptions } from "./common/Common";

const fabAny: any = fabric;
const win: any = window;
win.fabric = fabAny;
function App() {
  let ref = useRef<HTMLDivElement>(null);

  useCanvas({
    ref,
    title: "Basic shape (rect) with text",
    height: 400,
    callback(canvasEle, setFabCanvas) {
      let canvas = new fabric.Canvas(canvasEle, {
        isDrawingMode: false,
      });

      setFabCanvas(canvas);

      let shapeTextOptions: IShapeTextOptions<"circle"> & IGroupOptions = {
        placeholder: "Type Text",
        editable: true,
        shapeType: "circle",
        width: 200,
        height: 200,
        insidePadding: 10,
      };
      canvas.add(new fabAny.ShapeText(shapeTextOptions));

      let shapeTextOptions2: IShapeTextOptions<"circle"> & IGroupOptions = {
        placeholder: "Type Text",
        shapeType: "circle",
        left: 300,
        top: 0,
        stroke: "#333",
        width: 200,
        height: 200,
        insidePadding: 10,
        textOptions: {
          fontSize: 14,
          fontWeight: 100,
          fontFamily: font,
          textAlign: "center",
          top: 200 / 2 - 10,
          originY: "center",
        },
        shapeOptions: {
          radius: 100,
          strokeWidth: 1,
          fill: "transparent",
        },
      };
      canvas.add(new fabAny.ShapeText(shapeTextOptions2));

      let shapeTextOptions3: IShapeTextOptions<"circle"> & IGroupOptions = {
        placeholder: "Type Text",
        editable: true,
        shapeType: "circle",
        left: 600,
        top: 0,
        stroke: "#333",
        width: 200,
        height: 200,
        insidePadding: 10,
        textOptions: {
          text: "I am Editable",
          fontSize: 14,
          fontWeight: 100,
          fontFamily: font,
          textAlign: "center",
          top: 200 / 2 - 10,
          originY: "center",
        },
        shapeOptions: {
          strokeWidth: 1,
          fill: "transparent",
        },
      };
      let shapeText = new fabAny.ShapeText(shapeTextOptions3);
      shapeText.on("text:change", console.log);
      canvas.add(shapeText);
    },
  });

  useCanvas({
    ref,
    title: "Basic shape (rect) with text",
    height: 400,
    callback(canvasEle, setFabCanvas) {
      let canvas = new fabric.Canvas(canvasEle, {
        isDrawingMode: false,
      });

      setFabCanvas(canvas);

      let shapeTextOptions: IShapeTextOptions<"rect"> & IGroupOptions = {
        placeholder: "Type Text",
        editable: true,
        shapeType: "rect",
        width: 200,
        height: 200,
        insidePadding: 10,
      };
      canvas.add(new fabAny.ShapeText(shapeTextOptions));

      let shapeTextOptions2: IShapeTextOptions<"rect"> & IGroupOptions = {
        placeholder: "Type Text",
        shapeType: "rect",
        left: 300,
        top: 0,
        stroke: "#333",
        width: 200,
        height: 200,
        insidePadding: 10,
        textOptions: {
          fontSize: 14,
          fontWeight: 100,
          fontFamily: font,
          textAlign: "center",
          top: 200 / 2 - 10,
          originY: "center",
        },
        shapeOptions: {
          strokeWidth: 1,
          fill: "transparent",
        },
      };
      canvas.add(new fabAny.ShapeText(shapeTextOptions2));

      let shapeTextOptions3: IShapeTextOptions<"rect"> & IGroupOptions = {
        placeholder: "Type Text",
        editable: true,
        shapeType: "rect",
        left: 600,
        top: 0,
        stroke: "#333",
        width: 200,
        height: 200,
        insidePadding: 10,
        textOptions: {
          text: "I am Editable",
          fontSize: 14,
          fontWeight: 100,
          fontFamily: font,
          textAlign: "center",
          top: 200 / 2 - 10,
          originY: "center",
        },
        shapeOptions: {
          strokeWidth: 1,
          fill: "transparent",
        },
      };
      let shapeText = new fabAny.ShapeText(shapeTextOptions3);
      shapeText.on("text:change", console.log);
      canvas.add(shapeText);
    },
  });

  useCanvas({
    ref,
    title: "arrow line demo",
    height: 400,
    callback(canvasEle, setFabCanvas) {
      let canvas = new fabric.Canvas(canvasEle, {
        isDrawingMode: false,
      });
      setFabCanvas(canvas);

      canvas.add(
        new fabAny.ArrowLine([100, 100, 200, 200], {
          strokeWidth: 2,
          stroke: "#333",
        })
      );

      canvas.add(
        new fabAny.ArrowLine([200, 100, 300, 200], {
          strokeWidth: 2,
          stroke: "#333",
          doubleArrow: true,
        })
      );
    },
  });

  useCanvas({
    ref,
    title: "arrow line demo (stroke strokeUniform)",
    height: 400,
    callback(canvasEle, setFabCanvas) {
      let canvas = new fabric.Canvas(canvasEle, {
        isDrawingMode: false,
      });
      setFabCanvas(canvas);

      canvas.add(
        new fabAny.ArrowLine([100, 100, 200, 200], {
          strokeWidth: 2,
          stroke: "#333",
          strokeUniform: true,
        })
      );

      canvas.add(
        new fabAny.ArrowLine([200, 100, 300, 200], {
          strokeWidth: 2,
          stroke: "#333",
          doubleArrow: true,
          strokeUniform: true,
          scaleX: 2,
          scaleY: 2,
        })
      );
    },
  });
  return <div className="App" ref={ref}></div>;
}

export default App;
