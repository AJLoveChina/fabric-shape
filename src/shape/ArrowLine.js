import {fabric} from "fabric";
import {ShapeType} from "./Common";

const supportsLineDash = fabric.StaticCanvas.supports('setLineDash');

fabric[ShapeType.ArrowLine] = fabric.util.createClass(fabric.Line, {
    type: ShapeType.ArrowLine,

    initialize: function (points, options) {
        options || (options = { });
        this.callSuper('initialize', points, options);
    },

    toObject: function() {
        return fabric.util.object.extend(this.callSuper("toObject"));
    },

    _render: function(ctx) {
        this.drawLine(ctx);

        this.drawArrow(ctx, 2);

        if (this.doubleArrow === true) {
            this.drawArrow(ctx, 1);
        }
    },

    drawLine(ctx) {
        ctx.beginPath();

        if (!this.strokeDashArray || this.strokeDashArray && supportsLineDash) {
            // move from center (of virtual box) to its left/top corner
            // we can't assume x1, y1 is top left and x2, y2 is bottom right
            var p = this.calcLinePoints();
            ctx.moveTo(p.x1, p.y1);
            ctx.lineTo(p.x2, p.y2);
        }

        ctx.lineWidth = this.strokeWidth;

        // TODO: test this
        // make sure setting "fill" changes color of a line
        // (by copying fillStyle to strokeStyle, since line is stroked, not filled)
        var origStrokeStyle = ctx.strokeStyle;
        ctx.strokeStyle = this.stroke || ctx.fillStyle;
        this.stroke && this._renderStroke(ctx);
        ctx.strokeStyle = origStrokeStyle;
    },

    drawArrow: function (ctx, arrowIndex) {
        ctx.save();

        let p = this.calcLinePoints();
        let angle;

        if (arrowIndex === 1) {
            angle = Math.atan2(this.x2 - this.x1, this.y2 - this.y1);
        } else {
            angle = Math.atan2(this.x1 - this.x2, this.y1 - this.y2)
        }
        if (arrowIndex === 1) {
            ctx.translate(p.x2, p.y2);
        } else{
            ctx.translate(p.x1, p.y1);
        }
        ctx.rotate(angle);
        if (this.strokeUniform) {
            ctx.scale(1 / this.scaleX, 1 / this.scaleY);
        }

        ctx.beginPath();
        let lineHalf = Math.round(this.strokeWidth / 2);
        lineHalf = lineHalf < 2 ? 2 : lineHalf;
        ctx.moveTo(lineHalf, 0);
        ctx.lineTo(-lineHalf, lineHalf * 2);
        ctx.lineTo(-lineHalf * 2, 0);
        ctx.lineTo(-lineHalf, -lineHalf * 2);
        ctx.closePath();

        ctx.fillStyle = this.stroke || ctx.fillStyle;
        ctx.fill();
        ctx.restore();
    },
})

fabric[ShapeType.ArrowLine].fromObject = function (object, callback) {
    callback &&
    callback(
        new fabric[ShapeType.ArrowLine](
            [object.x1, object.y1, object.x2, object.y2],
            object
        )
    );
};

fabric[ShapeType.ArrowLine].async = true;
