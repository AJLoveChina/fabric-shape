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
    title: "Basic shape (Triangle) with text",
    height: 500,
    callback(canvasEle, setFabCanvas) {
      let canvas = new fabric.Canvas(canvasEle, {
        isDrawingMode: false,
      });

      setFabCanvas(canvas);

      let shapeTextOptions: IShapeTextOptions<"triangle"> = {
        placeholder: "Type Text",
        editable: true,
        shapeType: "triangle",
        width: 200,
        height: 200,
        insidePadding: 10,
      };
      canvas.add(new fabAny.ShapeText(shapeTextOptions));

      let shapeTextOptions1_2: IShapeTextOptions<"triangle"> = {
        placeholder: "Type Text",
        editable: true,
        shapeType: "triangle",
        width: 150,
        height: 150,
        insidePadding: 10,
        top: 300,
        textOptions: {
          text: `\n\nthis is \nshape text \ninside a triangle`,
          top: 65,
          textAlign: "center",
          originY: "center",
          stroke: "#333",
        },
        shapeOptions: {
          fill: "rgb(127,198,173, 0.4)",
          stroke: "rgb(127,198,173, 0.9)",
        },
      };
      canvas.add(new fabAny.ShapeText(shapeTextOptions1_2));

      let shapeTextOptions2: IShapeTextOptions<"triangle"> = {
        placeholder: "Type Text",
        editable: true,
        shapeType: "triangle",
        width: 200,
        height: 200,
        insidePadding: 10,
        left: 300,
        top: 0,
        textOptions: {
          textAlign: "center",
          top: 90,
        },
        shapeOptions: {},
      };
      canvas.add(new fabAny.ShapeText(shapeTextOptions2));

      let shapeTextOptions2_2: IShapeTextOptions<"triangle"> = {
        placeholder: "Type Text",
        editable: true,
        shapeType: "triangle",
        width: 100,
        height: 200,
        insidePadding: 10,
        left: 300,
        top: 250,
        textOptions: {
          textAlign: "center",
          top: 120,
        },
        shapeOptions: {},
      };
      canvas.add(new fabAny.ShapeText(shapeTextOptions2_2));
    },
  });

  useCanvas({
    ref,
    title: "Basic shape (parallelogram) with text",
    height: 500,
    callback(canvasEle, setFabCanvas) {
      let canvas = new fabric.Canvas(canvasEle, {
        isDrawingMode: false,
      });

      setFabCanvas(canvas);

      let shapeTextOptions: IShapeTextOptions<"parallelogram"> = {
        placeholder: "Type Text",
        editable: true,
        shapeType: "parallelogram",
        width: 200,
        height: 200,
        insidePadding: 10,
      };
      canvas.add(new fabAny.ShapeText(shapeTextOptions));

      let shapeTextOptions1_2: IShapeTextOptions<"parallelogram"> = {
        editable: true,
        shapeType: "parallelogram",
        width: 100,
        height: 100,
        insidePadding: 10,
        top: 300,
        textOptions: {
          text: `this is
a text
from shape`,
          textAlign: "center",
        },
      };
      canvas.add(new fabAny.ShapeText(shapeTextOptions1_2));

      let shapeTextOptions2: IShapeTextOptions<"parallelogram"> = {
        placeholder: "Type Text",
        editable: true,
        shapeType: "parallelogram",
        width: 200,
        height: 100,
        insidePadding: 10,
        left: 300,
        top: 0,
        textOptions: {
          textAlign: "center",
          top: 40,
          originY: "center",
        },
        shapeOptions: {
          percent: 0.2,
        },
      };
      canvas.add(new fabAny.ShapeText(shapeTextOptions2));
    },
  });

  useCanvas({
    ref,
    title: "Basic shape (Circle) with text",
    height: 500,
    callback(canvasEle, setFabCanvas) {
      let canvas = new fabric.Canvas(canvasEle, {
        isDrawingMode: false,
      });

      setFabCanvas(canvas);

      let shapeTextOptions: IShapeTextOptions<"circle"> = {
        placeholder: "Type Text",
        editable: true,
        shapeType: "circle",
        width: 200,
        height: 200,
        insidePadding: 10,
      };
      canvas.add(new fabAny.ShapeText(shapeTextOptions));

      let shapeTextOptions1_2: IShapeTextOptions<"circle"> = {
        placeholder: "Type Text Right Align",
        editable: true,
        shapeType: "circle",
        left: 0,
        top: 300,
        width: 150,
        height: 150,
        insidePadding: 10,
        textOptions: {
          textAlign: "right",
        },
      };
      canvas.add(new fabAny.ShapeText(shapeTextOptions1_2));

      let shapeTextOptions2: IShapeTextOptions<"circle"> = {
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

      let shapeTextOptions3: IShapeTextOptions<"circle"> = {
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

      let shapeTextOptions: IShapeTextOptions<"rect"> = {
        placeholder: "Type Text",
        editable: true,
        shapeType: "rect",
        width: 200,
        height: 200,
        insidePadding: 10,
      };
      canvas.add(new fabAny.ShapeText(shapeTextOptions));

      let shapeTextOptions2: IShapeTextOptions<"rect"> = {
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

      let shapeTextOptions3: IShapeTextOptions<"rect"> = {
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
