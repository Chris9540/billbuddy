export class Utils {
    //format text to look nice in option elements
    capitalize(value:string) {
        value = value.toLocaleLowerCase();
        let textArray = value.split(' ');
        let result = '';
        for(let i = 0; i < textArray.length; i++) {
            result += textArray[i].charAt(0).toUpperCase() + textArray[i].slice(1) + ' '
        }
        return result;
    }
}