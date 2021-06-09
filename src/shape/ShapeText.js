import { fabric } from "fabric";
import { ShapeType } from "./Common";

const shapeType = ShapeType.ShapeText;

fabric[shapeType] = fabric.util.createClass(fabric.Group, {
  type: shapeType,

  _onDynamicTextChangeCommit(dynamicTextbox) {
    let oldText = this.item(2).text;
    let newText = dynamicTextbox.text;
    let bTextChange = dynamicTextbox.text !== this.item(2).text;

    this.item(2).set({
      text: dynamicTextbox.text,
      visible: true,
    });

    this.canvas.remove(dynamicTextbox);

    if (bTextChange) {
      this.fire("text:change", {
        oldText,
        newText,
      });
    }
  },

  _onDynamicTextChange(dynamicTextbox) {
    this.item(1).set({
      visible: dynamicTextbox.text === "",
    });
  },

  enterEditing() {
    // matrix cal from http://jsfiddle.net/mmalex/2rsevdLa/
    // && http://fabricjs.com/using-transformations

    let tb = this.item(2);
    var mCanvas = this.canvas.viewportTransform;
    let mObject = this.item(2).calcTransformMatrix();
    let mTotal = fabric.util.multiplyTransformMatrices(mCanvas, mObject);
    let trans = fabric.util.qrDecompose(mTotal);
    let textbox = new fabric.Textbox(tb.text, {
      width: tb.width,
      fontSize: tb.fontSize,
      originX: tb.originX,
      originY: tb.originY,
      fontFamily: tb.fontFamily,
      textAlign: tb.textAlign,
      hasControls: false,
      hasBorders: false,
      stroke: tb.stroke,
      fill: tb.fill,
      strokeWidth: tb.strokeWidth,
      scaleX: trans.scaleX,
      scaleY: trans.scaleY,
      splitByGrapheme: true, // auto break line
    });
    textbox.setPositionByOrigin(
      {
        x: trans.translateX,
        y: trans.translateY,
      },
      "center",
      "center"
    );
    textbox.set(trans);

    textbox.on("editing:exited", () => {
      this._onDynamicTextChangeCommit.call(this, textbox);
    });

    textbox.on("deselected", () => {
      this._onDynamicTextChangeCommit.call(this, textbox);
    });

    textbox.on("changed", () => {
      this._onDynamicTextChange.call(this, textbox);
    });

    this.item(2).set({
      visible: false,
    });
    this.canvas.add(textbox);
    this.canvas.setActiveObject(textbox);
    textbox.selectAll();
    textbox.enterEditing();
  },

  initialize: function (objects, options, isAlreadyGrouped) {
    options || (options = {});

    let eles = [];
    if (objects instanceof Array) {
      eles = objects;
    } else {
      options = objects;
      options.shapeOptions || (options.shapeOptions = {});
      options.textOptions || (options.textOptions = {});

      let shape;
      let shapeDefaultOptions = {
        stroke: "#000",
        fill: "transparent",
      };
      switch (options.shapeType) {
        case "rect": {
          shape = new fabric.Rect({
            ...shapeDefaultOptions,
            ...options,
            left: 0,
            top: 0,
            ...options.shapeOptions,
          });
          break;
        }
        case "circle": {
          shape = new fabric.Circle({
            ...shapeDefaultOptions,
            ...options,
            left: 0,
            top: 0,
            radius: options.width / 2,
            ...options.shapeOptions,
          });
          break;
        }
        case "parallelogram": {
          let percent = options.shapeOptions.percent || 1 / 3;
          percent <= 0 && (percent = 0);
          percent >= 1 && (percent = 1);
          shape = new fabric.Polygon(
            [
              { x: options.width * percent, y: 0 },
              { x: options.width, y: 0 },
              { x: options.width * (1 - percent), y: options.height },
              { x: 0, y: options.height },
            ],
            {
              ...shapeDefaultOptions,
              ...options,
              left: 0,
              top: 0,
              ...options.shapeOptions,
            }
          );
          break;
        }
        case "triangle": {
          shape = new fabric.Triangle({
            ...shapeDefaultOptions,
            ...options,
            left: 0,
            top: 0,
            ...options.shapeOptions,
          });
          break;
        }
      }

      let placeholderOptions = {
        fontSize: 16,
        ...options,
        left: 0,
        top: 0,
        stroke: "#999",
        fill: "#999",
        ...options.textOptions,
      };
      Object.assign(placeholderOptions, {
        left: (options.insidePadding || 0) + placeholderOptions.left,
        top: (options.insidePadding || 0) + placeholderOptions.top,
        width: placeholderOptions.width - (options.insidePadding || 0) * 2,
        text: options.placeholder || "",
      });
      let placeholder = new fabric.Textbox(
        options.placeholder,
        placeholderOptions
      );
      if (options.textOptions.text) {
        placeholder.visible = false;
      }

      let textOptions = Object.assign(placeholderOptions, {
        text: options.textOptions.text || "",
        fill: options.textOptions.fill || "#333",
        stroke: options.textOptions.stroke || "#333",
        splitByGrapheme: true, // auto break line
      });
      let text = new fabric.Textbox(options.textOptions.text, textOptions);

      eles = [shape, placeholder, text];
    }

    if (options.editable) {
      this.on("mousedblclick", this.enterEditing);
    }
    this.callSuper("initialize", eles, options, isAlreadyGrouped);
  },

  toObject: function (propertiesToInclude) {
    return fabric.util.object.extend(
      this.callSuper("toObject", ["textOptions", "shapeOptions"])
    );
  },
});

fabric[shapeType].fromObject = function (object, callback) {
  var objects = object.objects,
    options = fabric.util.object.clone(object, true);
  delete options.objects;
  if (typeof objects === "string") {
    // it has to be an url or something went wrong.
    fabric.loadSVGFromURL(objects, function (elements) {
      var group = fabric.util.groupSVGElements(elements, object, objects);
      group.set(options);
      callback && callback(group);
    });
    return;
  }
  fabric.util.enlivenObjects(objects, function (enlivenedObjects) {
    fabric.util.enlivenObjects([object.clipPath], function (enlivedClipPath) {
      var options = fabric.util.object.clone(object, true);
      options.clipPath = enlivedClipPath[0];
      delete options.objects;
      callback &&
        callback(new fabric[shapeType](enlivenedObjects, options, true));
    });
  });
};

fabric[shapeType].async = true;
