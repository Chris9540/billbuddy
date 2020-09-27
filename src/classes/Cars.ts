import {Car} from './Car.js'
import {iCar} from './interfaces.js'

export class Cars {
    
    cars:Car[] = [];
    results:Car[] = [];
    filter:{[key:string]: string | number} = {};
    
    constructor(data:Array<iCar>) {
        data.forEach(element => {
            this.cars.push(new Car(element))
        });
        this.results = this.cars;
    }//end constructor

    /*
    This is the main function of this class used to
    filter the list of cars. Makes use of Array.prototype.filter()
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
    */
    filterCars() {
        //console.log('Filter:',this.filter);
        if(this.filter) {
            this.results = this.cars.filter(item=>{
                //get controlled filter data rather than comapring whole class
                const car = item.getFilterData()
                let pass = true;
                for(const key in this.filter) {
                    if(car[key] != this.filter[key]) {
                        pass = false;
                    }
                }
                return pass;
            })
        }
    }//end filterCars

    /*
    All get*****Options() functions are used to
    generate a new array of options for the select
    elements to use for the given data.
    */
    getBodyDescOptions() {
        let test:string[] = [];
        let array:{value:string}[] = [];
        this.results.forEach(car=>{
            if(!test.includes(car.bodyDesc)) {
                array.push({value:car.bodyDesc})
                test.push(car.bodyDesc)
            }
        })
        this.logOptions('body description', array);
        return array;    
    }//getBodyDescOptions

    getFuelTypeOptions() {
        let test:string[] = [];
        let array:{value:string, text:string}[] = [];
        this.results.forEach(car=>{
            if(!test.includes(car.fuelType)) {
                test.push(car.fuelType)
            }
        })
        if(test.includes("P")) {
            array.push({value: 'P', text : 'Petrol'})
        }
        if(test.includes("D")) {
            array.push({value: 'D', text : 'Diesel'})
        }
        this.logOptions('fuel type', array);
        return array;    
    }//end getFuelTypeOptions

    getTransmissionOptions() {
        let test:string[] = [];
        let array:{value:string, text:string}[] = [];
        this.results.forEach(car=>{
            if(!test.includes(car.transmission)) {
                test.push(car.transmission)
            }
        })
        if(test.includes("M")) {
            array.push({value: 'M', text : 'Manual'})
        }
        if(test.includes("M")) {
            array.push({value: 'A', text : 'Automatic'})
        }
        this.logOptions('transmission', array);
        return array;          
    }//end getTransmissionOptions

    getSecurityStatusOptions() {
        let test:string[] = [];
        let array:{value:string}[] = [];
        this.results.forEach(car=>{
            if(!test.includes(car.securityStatus)) {
                array.push({value:car.securityStatus})
                test.push(car.securityStatus)
            }
        })
        this.logOptions('security status', array);
        return array;   
    }//end getSecurityStatusOptions

    getCCOptions() {
        let test:number[] = [];
        let array:{value:string, text:string}[] = [];
        this.results.forEach(car=>{
            if(!test.includes(car.cc)) {
                array.push({value:car.cc.toString(), text : `${car.cc.toString()}cc`})
                test.push(car.cc)
            }
        })
        if(array.length < 10) {
            this.logOptions('engine cc', array);
            return array;
        }           
        return [];
    }//end getCCOptions

    getModelOptions() {
        let test:string[] = [];
        let array:{value:string}[] = [];
        this.results.forEach(car=>{
            if(!test.includes(car.model)) {
                array.push({value:car.model})
                test.push(car.model)
            }
        })
        if(array.length < 10) {
            this.logOptions('model', array);          
            return array;
        }           
        return []; 
    }//end getModelOptions

    getGroupStatusOptions() {
        let test:string[] = [];
        let array:{value:string}[] = [];
        this.results.forEach(car=>{
            if(!test.includes(car.groupStatus)) {
                array.push({value:car.groupStatus})
                test.push(car.groupStatus)
            }
        })
        this.logOptions('group status', array);
        return array;  
    }

    getBHPCountOptions() {
        let test:number[] = [];
        let array:{value:string, text:string}[] = [];
        this.results.forEach(car=>{
            if(!test.includes(car.bhpCount)) {
                array.push({value:car.bhpCount.toString(), text : `${car.bhpCount.toString()}bhp`})
                test.push(car.bhpCount)
            }
        })
        if(array.length < 10) {
            this.logOptions('bhp count', array);
            return array;
        }           
        return [];
    }

    private logOptions(name:string, array:{value:string, text?:string}[]) {
        //console.log(`Updating ${name} opptions with:`, array)
        //console.log('-------------------------------------')
    }


}//end class
