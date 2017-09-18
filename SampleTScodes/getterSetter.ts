class person {
    private _firstName: string = "";
    get firstName(): string {
        return this._firstName;
    }
    set firstName(value: string) {
        this._firstName = value;
    }
}
var obj = new person();
obj.firstName = "Asaad";
console.log(obj.firstName); // ASAAD