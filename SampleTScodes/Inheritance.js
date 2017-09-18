var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var baseObject = /** @class */ (function () {
    function baseObject(width, length) {
        if (width === void 0) { width = 0; }
        if (length === void 0) { length = 0; }
        this.width = width;
        this.length = length;
    }
    return baseObject;
}());
var rectangle = /** @class */ (function (_super) {
    __extends(rectangle, _super);
    function rectangle(width, height) {
        return _super.call(this, width, height) || this;
    }
    rectangle.prototype.calcSize = function () {
        return this.width * this.length;
    };
    ;
    return rectangle;
}(baseObject));
var rect = new rectangle(5, 2);
console.log(rect.calcSize()); // 10
