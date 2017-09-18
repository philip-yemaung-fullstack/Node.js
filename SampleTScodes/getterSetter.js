var person = /** @class */ (function () {
    function person() {
        this._firstName = "";
    }
    Object.defineProperty(person.prototype, "firstName", {
        get: function () {
            return this._firstName;
        },
        set: function (value) {
            this._firstName = value;
        },
        enumerable: true,
        configurable: true
    });
    return person;
}());
var obj = new person();
obj.firstName = "Asaad";
console.log(obj.firstName); // ASAAD
