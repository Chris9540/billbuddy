interface iModel {
    make:string;
    model:string;
    baseModel:string;
    series:string;
    cc:number;
    yearFrom:string;
    yearTo:string;
    type:null;
    doorCount:number;
    seatCount:number;
    fuelType:string;
    transmission:string;
    abiCode:string;
    cdlCode:null;
    co2:number;
}

interface iDetails {
    manufacturedDate:null;
    registrationDate:null;
    vinEnding:null;
    colour:null;
    registration:null;
    bodyDesc:string;
    bodyClass:string;
    importedUk:null;
    grossWeight:number;
    kerbWeight:number;
    bhpCount:number;
}


interface iSecurity {
    securityStatus:string;
    securityStatusDescription:null;
    groupStatus:string;
    groupStatusDescription:null;
    groupRatings:Array<iRating>;
}

interface iRating {
    range:string;
    rating:string;
}
//represents the json structure
export interface iCar {
    model:iModel;
    keeper:null;
    details:iDetails;
    security:iSecurity;
    valuations:[];
}

