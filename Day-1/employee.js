const { info } = require("console")

class Employee{
    constructor(name,des){
        this.name=name
        this.des=des
    }
    info(){
        console.log(`I am ${this.name} from ${this.des}`);
    }
}

module.exports = Employee
