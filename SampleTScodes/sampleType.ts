class  bankAccount {
    money: number = 2000;
    deposit(value) {
        this.money += value;
    }
}
class  mySelf  {
    name: string =  "Asaad";
    bankAccount: bankAccount = new bankAccount();
    hobbies: string[] =  ["Violin", "Cooking"];
};
var obj = new mySelf();
obj.bankAccount.deposit(3000);
console.log(obj);
