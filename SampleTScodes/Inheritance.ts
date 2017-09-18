class baseObject {
    constructor(public width: number =  0, public length: number =  0) {

    }
}
class rectangle extends baseObject {
    constructor(width: number, height: number) {
        super(width, height);
    }
    calcSize()  {
        return  this.width  *  this.length;
    };
}
var rect = new rectangle(5, 2);
console.log(rect.calcSize()); // 10