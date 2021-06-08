import { fabric } from "fabric";
import { ShapeType } from "./Common";

const shapeType = ShapeType.TextNote;

fabric[shapeType] = fabric.util.createClass(fabric.Group, {
  type: shapeType,

  initialize: function (objects, options, isAlreadyGrouped) {
    options || (options = {});
    this.callSuper("initialize", objects, options, isAlreadyGrouped);
  },

  toObject: function (propertiesToInclude) {
    return fabric.util.object.extend(this.callSuper("toObject"));
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
