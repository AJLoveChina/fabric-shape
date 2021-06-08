import { useEffect, useState } from "react";

export function useCanvas({
  ref,
  title = "",
  width = 900,
  height = 600,
  callback,
}: {
  ref: React.RefObject<HTMLElement>;
  title?: string;
  width?: number;
  height?: number;
  callback: (canvas: HTMLCanvasElement, e: (e: fabric.Canvas) => any) => void;
}) {
  let [fabCanvas, setFabCanvas] = useState<fabric.Canvas>();
  let [container, setContainer] = useState<HTMLElement>();

  useEffect(() => {
    if (!container || !fabCanvas) {
      return;
    }
    let button = document.createElement("button");
    button.innerText = "GetActiveObj";
    button.onclick = () => {
      let win: any = window;
      win.temp1 = fabCanvas?.getActiveObject();
      console.log("temp1", win.temp1);
    };

    container?.appendChild(button);
  }, [container, fabCanvas]);
  useEffect(() => {
    let span = document.createElement("span");

    if (title) {
      let p = document.createElement("p");
      p.innerText = title;
      p.setAttribute("style", "font-weight:bold; padding: 0 10px;");
      span.appendChild(p);
    }

    let canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    canvas.style.border = "1px solid #ccc";
    span.appendChild(canvas);

    if (ref.current) {
      ref.current.appendChild(span);
    }
    setContainer(span);
    callback && callback(canvas, setFabCanvas);

    return () => {
      if (ref.current) {
        ref.current.removeChild(span);
      }
    };
  }, [ref]);
}
