import {iCar} from './interfaces.js'

export class Car {
    rawData:iCar;
    abiCode:string;
    transmission:string;
    bodyDesc:string;
    cc:number;
    fuelType:string;
    securityStatus:string;
    model:string;
    groupStatus:string;
    bhpCount:number;

    constructor(data:iCar) {
        this.rawData = data;
        this.abiCode = data.model.abiCode;
        this.transmission = data.model.transmission;
        this.bodyDesc = data.details.bodyDesc;
        this.cc = data.model.cc;
        this.fuelType = data.model.fuelType;
        this.securityStatus = data.security.securityStatus;
        this.model = data.model.model;
        this.groupStatus = data.security.groupStatus;
        this.bhpCount = data.details.bhpCount;

        //handle some data to make sure there are avalible values.
        if(this.groupStatus == '') {
            this.groupStatus = 'Not Applicable'
        }
        if(this.securityStatus == '') {
            this.securityStatus = 'Not Applicable'
        }
        if(this.bhpCount == null) {
            this.bhpCount = 0;
        }
    }//end constructor

    //used to control what data goes through the filter so 
    //that the whole class with methods is not compared
    getFilterData() {
        let data:{[key:string]: string | number} = {
            'transmission':this.transmission,
            'bodyDesc':this.bodyDesc,
            'cc':this.cc.toString(),
            'securityStatus':this.securityStatus,
            'fuelType':this.fuelType,
            'groupStatus':this.groupStatus,
            'bhpCount':this.bhpCount.toString(),
            'model': this.model,
        };
        return data;
    }//end getFilterData
}//end class




