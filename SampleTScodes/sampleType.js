var bankAccount = /** @class */ (function () {
    function bankAccount() {
        this.money = 2000;
    }
    bankAccount.prototype.deposit = function (value) {
        this.money += value;
    };
    return bankAccount;
}());
var mySelf = /** @class */ (function () {
    function mySelf() {
        this.name = "Asaad";
        this.bankAccount = new bankAccount();
        this.hobbies = ["Violin", "Cooking"];
    }
    return mySelf;
}());
;
var obj = new mySelf();
obj.bankAccount.deposit(3000);
console.log(obj);
