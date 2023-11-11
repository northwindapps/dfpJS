const {Service} = require('./service');
const Decimal = require('decimal.js');
const service = new Service();
const {Parser} = require('./Parser');

class Differentiate {

    static subComponent = '';
    static combinateionRule = true;
    constructor() {
        // this.propertyMap = new Map();
    }

    calculate(objects) {
    let isAborted = false;
    let resultArray = [];
    for (let index = 0; !isAborted && index < objects.length; index++) {
        const element = objects[index];
        switch (element.type) {
            case 'x^':
                if (this.isNumeric(element.next)) {
                    if(index==0){
                        let coef = new Decimal(element.next);
                        let one = new Decimal(1.0);
                        let sub = coef.minus(one);
                        if (sub.toString() === '1') {
                            console.log('subProduct1', coef + 'x' );
                            resultArray.push(coef + 'x');   
                            if (this.subComponent !== '') {
                                if (this.combinateionRule) {
                                    this.subComponent += '*';
                                    this.combinateionRule = false; 
                                }else{
                                    this.subComponent += '+';   
                                } 
                            }
                            this.subComponent += coef + 'x';
                        }else{
                            console.log('subProduct1', coef + 'x^' + sub.toString());
                            resultArray.push(coef + 'x^' + sub.toString());
                            if (this.subComponent !== '') {
                                if (this.combinateionRule) {
                                    this.subComponent += '*';
                                    this.combinateionRule = false; 
                                }else{
                                    this.subComponent += '+';   
                                }   
                            }
                            this.subComponent += coef + 'x^' + sub.toString();
                        }
                    }else{
                        const indexMinus = index-1;
                        if (this.isNumeric(objects[indexMinus].value)) {
                            let previous = new Decimal(objects[indexMinus].value);
                            let next = new Decimal(element.next);
                            let coef = previous.times(next);
                            let one = new Decimal(1.0);
                            let sub = next.minus(one);
                            if (sub.toString() === '1') {
                                console.log('subProduct1', coef + 'x' );
                                resultArray.push(coef + 'x');      
                                if (this.subComponent !== '') {
                                    if (this.combinateionRule) {
                                        this.subComponent += '*';
                                        this.combinateionRule = false; 
                                    }else{
                                        this.subComponent += '+';   
                                    }   
                                }
                                this.subComponent += coef + 'x';
                            }else{
                                console.log('subProduct1', coef + 'x^' + sub.toString());
                                resultArray.push(coef + 'x^' + sub.toString());
                                if (this.subComponent !== '') {
                                    if (this.combinateionRule) {
                                        this.subComponent += '*';
                                        this.combinateionRule = false; 
                                    }else{
                                        this.subComponent += '+';   
                                    }   
                                }
                                this.subComponent += coef + 'x^' + sub.toString();   
                            }
                        }
                    }
                }
                break;
            case 'x':
                if(index==0){
                    console.log('subProduct1', '1' );
                    resultArray.push('1');
                    if (this.subComponent !== '') {
                        if (this.combinateionRule) {
                            this.subComponent += '*'; 
                            this.combinateionRule = false;
                        }else{
                            this.subComponent += '+';   
                        } 
                    }
                    this.subComponent += '1';

                }else{
                    const indexMinus = index-1;
                    if (this.isNumeric(objects[indexMinus].value)) {
                        let previous = new Decimal(objects[indexMinus].value);
                        console.log('subProduct1', previous );
                        resultArray.push(previous.toString());
                        if (this.subComponent !== '') {
                            if (this.combinateionRule) {
                                this.subComponent += '*';
                                this.combinateionRule = false; 
                            }else{
                                this.subComponent += '+';   
                            }   
                        }
                        this.subComponent += previous.toString();
                    }
                }
                break;
            case 'sqrt':
                if(index==0){
                    console.log('subProduct1', '0.5*' + element.next + '^-0.5');
                    if (this.subComponent !== '') {
                        if (this.combinateionRule) {
                            this.subComponent += '*'; 
                            this.combinateionRule = false;
                        }else{
                            this.subComponent += '+';   
                        } 
                    }
                    this.subComponent += '0.5*' + element.next + '^-0.5';
                }else{
                    const indexMinus = index-1;
                    if (this.isNumeric(objects[indexMinus].value)) {
                        let previous = new Decimal(objects[indexMinus].value);
                        let next = new Decimal(0.5);
                        let coef = previous.times(next);
                        console.log('subProduct1', coef + '*' + element.next + '^-0.5');
                        if (this.subComponent !== '') {
                            if (this.combinateionRule) {
                                this.subComponent += '*';
                                this.combinateionRule = false; 
                            }else{
                                this.subComponent += '+';   
                            }   
                        }
                        this.subComponent += coef + '*' + element.next + '^-0.5';
                    }
                }
                break;
            case 'e^':
                if(index==0){
                    console.log('subProduct1', 'e^' + element.next);
                    if (this.subComponent !== '') {
                                if (this.combinateionRule) {
                                    this.subComponent += '*'; 
                                    this.combinateionRule = false;
                                }else{
                                    this.subComponent += '+';   
                                } 
                            }
                    this.subComponent += 'e^' + element.next;
                }else{
                    const indexMinus = index-1;
                    if (this.isNumeric(objects[indexMinus].value)) {
                        let previous = new Decimal(objects[indexMinus].value);
                        console.log('subProduct1', previous + 'e^' + element.next);
                        if (this.subComponent !== '') {
                            if (this.combinateionRule) {
                                this.subComponent += '*';
                                this.combinateionRule = false; 
                            }else{
                                this.subComponent += '+';   
                            }   
                        }
                        this.subComponent += previous + 'e^' + element.next;
                    }
                }
                break;
            case 'ln':
                if(index==0){
                    console.log('subProduct1', element.next + '^-1');
                    if (this.subComponent !== '') {
                                if (this.combinateionRule) {
                                    this.subComponent += '*'; 
                                    this.combinateionRule = false;
                                }else{
                                    this.subComponent += '+';   
                                } 
                            }
                    this.subComponent += element.next + '^-1';
                }else{
                    const indexMinus = index-1;
                    if (this.isNumeric(objects[indexMinus].value)) {
                        let previous = new Decimal(objects[indexMinus].value);
                        console.log('subProduct1', previous + '*' + element.next + '^-1');
                        if (this.subComponent !== '') {
                            if (this.subComponent !== '') {
                                if (this.combinateionRule) {
                                    this.subComponent += '*';
                                    this.combinateionRule = false; 
                                }else{
                                    this.subComponent += '+';   
                                }   
                            }  
                        }
                        this.subComponent += previous + '*' + element.next + '^-1';
                    }
                }
                break;
            case '(':
                isAborted = true;
                break;
            case '{':
                isAborted = true;
                break;
            case 'cosx':
                if(index==0){
                    console.log('subProduct1', '-sinx' );
                    if (this.subComponent !== '') {
                        if (this.combinateionRule) {
                            this.subComponent += '*-';
                            this.combinateionRule = false; 
                        }else{
                            this.subComponent += '-';   
                        }   
                    }
                    this.subComponent += 'sinx';
                }else{
                    const indexMinus = index-1;
                    if (this.isNumeric(objects[indexMinus].value)) {
                        let previous = new Decimal(objects[indexMinus].value);
                        let next = new Decimal(-1.0);
                        let coef = previous.times(next);
                        console.log('subProduct1', coef + 'sinx' );
                        if (this.subComponent !== '') {
                            if (this.combinateionRule) {
                                this.subComponent += '*-';
                                this.combinateionRule = false; 
                            }else{
                                this.subComponent += '-';   
                            }   
                        }
                        this.subComponent += coef + 'sinx';
                    }
                }
                break;
            case 'sinx':
                if(index==0){
                    console.log('subProduct1', 'cosx' );
                    if (this.subComponent !== '') {
                        if (this.combinateionRule) {
                            this.subComponent += '*';
                            this.combinateionRule = false; 
                        }else{
                            this.subComponent += '+';   
                        } 
                    }
                    this.subComponent += 'cosx';
                }else{
                    const indexMinus = index-1;
                    if (this.isNumeric(objects[indexMinus].value)) {
                        let previous = new Decimal(objects[indexMinus].value);
                        console.log('subProduct1', previous + 'cosx' );
                        if (this.subComponent !== '') {
                            if (this.combinateionRule) {
                                this.subComponent += '*';
                                this.combinateionRule = false; 
                            }else{
                                this.subComponent += '+';   
                            }   
                        }
                        this.subComponent += 'cosx';
                    }
                }
                break;
            case 'tanx':
                if(index==0){
                    console.log('subProduct1', '(secx)^2' );
                    if (this.subComponent !== '') {
                        if (this.combinateionRule) {
                            this.subComponent += '*';
                            this.combinateionRule = false; 
                        }else{
                            this.subComponent += '+';   
                        } 
                    }
                    this.subComponent += '(secx)^2';
                }else{
                    const indexMinus = index-1;
                    if (this.isNumeric(objects[indexMinus].value)) {
                        let previous = new Decimal(objects[indexMinus].value);
                        console.log('subProduct1', previous + '(secx)^2' );
                        if (this.subComponent !== '') {
                            if (this.combinateionRule) {
                                this.subComponent += '*'; 
                                this.combinateionRule = false;
                            }else{
                                this.subComponent += '+';   
                            } 
                        }
                        this.subComponent += previous + '(secx)^2';
                    }
                }
                break;
            case 'frac':
                if(index==0){
                    console.log('subProduct1', 'frac' );
                    this.quotientOperation(objects[index].next,'');
                }else{
                    const indexMinus = index-1;
                    if (this.isNumeric(objects[indexMinus].value)) {
                        let previous = new Decimal(objects[indexMinus].value);
                        this.quotientOperation(objects[index].next,previous.toString());
                    }
                }
                break;
            default:
                break;
        }
    }

    return resultArray;
}

    quotientOperation(inputStr,coef=''){

    // Create a regular expression to match text inside curly braces
    const regex = /\{([^}]*)\}/g;

    // Use the `match` method with the regular expression to find all matches
    const matches = inputStr.match(regex);

    // Extract the contents of the curly braces
    const contents = matches.map(match => match.slice(1, -1));
    const parser3 = new Parser();
    const parser4 = new Parser();
    // let ux = parser3.parse(contents[0]); 
    // let vx = parser3.parse(contents[1]);
    // console.log(ux);
    // console.log(vx); 
    // {'(x^3+5x)^2'}    

    let content3 = this.getOuterParencesContent(contents[0]);
    const subsubElements3 = this.splitStringWithBracketsSub(content3);
    let elementListSub3 = [];
    for (let index = 0; index < subsubElements3.length; index++) {
        let counterSub3 = 99;
        let element3 = subsubElements3[index];
        while (counterSub3>0) {
            let resultSub3 = parser3.parse(element3);
            element3= resultSub3.next;
            
            if(resultSub3.value == "" || resultSub3.next == ""){
                counterSub3 = -1;
            }
            elementListSub3.push(resultSub3);
            if (counterSub3 === -1) {
                // elementCalc(elementList);
                elementListSub3.push({ type: 'EOE', value: 'EOE', next: null });
            }
            counterSub3 -= 1;
        }
    }
    // console.log('test',elementListSub3);

    let content4 = this.getOuterParencesContent(contents[1]);
    const subsubElements4 = this.splitStringWithBracketsSub(content4);
    let elementListSub4 = [];
    for (let index = 0; index < subsubElements4.length; index++) {
        let counterSub4 = 99;
        let element4 = subsubElements4[index];
        while (counterSub4>0) {
            let resultSub4 = parser4.parse(element4);
            element4= resultSub4.next;
            
            if(resultSub4.value == "" || resultSub4.next == ""){
                counterSub4 = -1;
            }
            elementListSub4.push(resultSub4);
            if (counterSub4 === -1) {
                // elementCalc(elementList);
                elementListSub4.push({ type: 'EOE', value: 'EOE', next: null });
            }
            counterSub4 -= 1;
        }
    }
    // console.log('test',elementListSub4);


    // check if arg is a polynomial
    let ux = contents[0];
    let vx = contents[1];
    let resu = this.calculate(elementListSub3);
    let resv = this.calculate(elementListSub4);
    let resuDifStr = (resu.length > 0) ? resu.join('+') : (resu.length === 1) ? resu[0] : '';
    let resvDifStr = (resv.length > 0) ? resv.join('+') : (resv.length === 1) ? resv[0] : '';
    let result = ''
    if (coef) {
        result += coef;
    }
    result += 'frac{' + resuDifStr + '*' + vx + '-' + ux + '*' + resvDifStr + '}{(' + vx + ')^2}';
    console.log('fracProduct',result);
    this.subComponent = '';
    this.subComponent += result;
}

parenthesisCheck(inputStr) {
    const regex = /^\(.+\)$/; // Regular expression pattern
    if (regex.test(inputStr)) {
        // console.log("The string starts with '(' and ends with ')'");
        return true;
    } else {
        // console.log("The string does not start with '(' and end with ')'");
        return false;
    }
}

parseFraction(input) {
    // Use a regular expression to match the fraction pattern
    const regex = /frac{(\d+)\/(\d+)}/;
    const match = input.match(regex);
  
    if (match) {
      // Extract the numerator and denominator from the matched groups
      const numerator = new Decimal(match[1]);
      const denominator = new Decimal(match[2]);
  
      const result = numerator.dividedBy(denominator);
      result.toString();
    } else {
      // Return an error message or handle invalid input as needed
      return input; // Or throw an error
    }
  }

isNumeric(str) {
    // Use a regular expression to check if the string is numeric
    // It allows for an optional sign (+ or -), followed by digits (integer part)
    // Optionally followed by a decimal point and more digits (fractional part)
    const numericRegex = /^[-+]?[0-9]*\.?[0-9]+$/;
    return numericRegex.test(str);
  }

stringToFloatAndCheckValidity(str) {
    if (str.includes('.')) {
        const floatValue = parseFloat(str);  
        // Check if the parsed value is a valid number
        if (!isNaN(floatValue) && isFinite(floatValue)) {
        // floatValue is a valid floating-point number
        return floatValue;
        } else {
        // Invalid input or couldn't parse as a float
        return null; // You can return null, throw an error, or handle it as needed
        }
    }else{
        const intValue = parseInt(str);  
        // Check if the parsed value is a valid number
        if (!isNaN(intValue) && isFinite(intValue)) {
        // floatValue is a valid floating-point number
        return intValue;
        } else {
        // Invalid input or couldn't parse as a float
        return null; // You can return null, throw an error, or handle it as needed
        }
    }
}
  
getOuterParencesContent(inputStr) {
    let openIndex = inputStr.indexOf("(");
    let closeIndex = inputStr.lastIndexOf(")");
    let outerContent = '';
    if (openIndex !== -1 && closeIndex !== -1 && closeIndex > openIndex) {
        outerContent = inputStr.substring(openIndex + 1, closeIndex);
        // console.log(outerContent);
    } 
    return outerContent !== '' ? outerContent : inputStr;
}



    splitStringWithBrackets(inputString) {
        // Use regular expression to split the string
        const parts = inputString.split(/([+-])(?![^{]*}|[^\[]*]|[^\(]*\))/g);
        
        // Filter out empty strings from the result
        const result = parts.filter(part => part.trim() !== "");
        
        return result;
    }

    filterConstantTerms(inputAry) {
        let newAry = [];
        let isNG = false;
        const size = inputAry.length;
        for (let index = 0; index < inputAry.length; index++) {
            if (index) {
                if (isNG) {
                    isNG = false;
                }else{
                    if (this.isNumeric(inputAry[index]) && (inputAry[index-1] == '-' || inputAry[index-1] == '+')) {
                        newAry.splice(index-1, 1);
                    }else{
                        newAry.push(inputAry[index]);
                    }
                }
            }else{
                if (this.isNumeric(inputAry[index]) && index !== size-1 && (inputAry[index+1] == '-' || inputAry[index+1] == '+')) {
                    isNG = true;
                }else{
                    newAry.push(inputAry[index]);
                }
            }
        }
        
        return newAry;
    }

    splitStringWithBracketsSub(inputString){
        const parts = inputString.split(/([+-])/).filter(Boolean);
        // Filter out empty strings from the result
        const result = parts.filter(part => part.trim() !== "");
        
        return result;
    }

    elementCheck(element) {
        // console.log('rootElement',element); 
        //TODO read remaining
       
        let openIndex = element[0].next.indexOf("(");
        let closeIndex = element[0].next.lastIndexOf(")");
        let outerContent = '';
        if (openIndex !== -1 && closeIndex !== -1 && closeIndex > openIndex) {
            outerContent = element[0].next.substring(openIndex + 1, closeIndex);
            // console.log(outerContent);
        } 
    
        let listSub = [];
        const resultArraySub = this.splitStringWithBracketsSub(outerContent);
        for (let index = 0; index < resultArraySub.length; index++) {
            // console.log('resultArraySub[' + index + ']');
            let elementSub = resultArraySub[index];
            // console.log(elementSub);
            const parser = new Parser();
            let counterSub = 99;
            let elementListSub = [];
            while (counterSub>0) {
                let resultSub = parser.parse(elementSub);
                // console.log(resultSub);    
                elementSub = resultSub.value;
                if(resultSub.value == "" || resultSub.next == ""){
                    counterSub = -1;
                }
                listSub.push(resultSub);
                elementListSub.push(resultSub);
    
                if (counterSub === -1) {
                    // elementCalc(elementList);
                
                    listSub.push({ type: 'EOE', value: 'EOE', next: null });
                }
                counterSub -= 1;
            }
        
        }
    
        return (Object.keys(listSub).length === 0) ? false : listSub;
    }

    execute(expression) {
            // let inputString = 'sqrt(5)-4x^2t-e^(2x^2+3x+5)-10ln(x^3+5x)+frac{sinx}{cosx}';
        // str = 'logd(10*10)+(sqrt(sqrt4 + 2 * (sin60^2 + cos60^2)))*2';
        // str = '(cos45 * sin45)';
        // str = '(0 + 5) * (0 - 5)';
        // str = 'sqrt(2)';
        // let result = excecute(str);
        // console.log(result);
        let inputString = 'tanx-x^2-5x^3+sqrt(x^0.75-4x^2+4x)-4x^2*a^(x-3)*y^3-e^(2x^2+3x+5)-10ln(x^3+5x)+5frac{x^2}{x^3+5x}-4t+sinx-4cosx';
        let nospace = expression.replace(/\s/g, '');
        console.log('inputString',expression);
        // nputString = x^frac{3}{4};
        // inputString = parseFraction(inputString);
        // const separator = /(?=[+-])(?![^{]*})/g;
        if (expression == null) {
            nospace = inputString;
        }

        let resultArray = this.splitStringWithBrackets(nospace);
        resultArray = this.filterConstantTerms(resultArray);
        const originalArray = Array.from(resultArray);
        console.log('originalArray',originalArray);
        // ['-', 
        //'5x^3', 
        //'+', 
        //'sqrt(x^frac{3}{4}-4x^2+4x)', 
        //'-', 
        //'4x^2a^(x-3)y^3', 
        //'-', 
        //'e^(2x^2+3x+5)', 
        //'-', 
        //'10ln(x^3+5x)', 
        //'+', 
        //'frac{sin(x)}{cos(x)}', 
        //'-', 
        //'4t']
        let list = [];
        for (let index = 0; index < resultArray.length; index++) {
            let element = resultArray[index];
            const parser = new Parser();
            const parser2 = new Parser();
            let counter = 999;
            let elementList = [];
            while (counter>0) {
                let result = parser.parse(element);    
                element = result.next;
                if(element == ""){
                    counter = -1;
                }
                list.push(result);
                elementList.push(result);
                if (counter === -1) {
                    //this method is fishy
                    let subElements = this.elementCheck(elementList);
                    if(subElements){
                        // for (let index = 0; index < elementList.length; index++) {
                        //     const subElement = elementList[index];
                        //     console.log('subelement-each', subElement);
                            
                        // }

                        const isWrapedWithParenthesis = this.parenthesisCheck(elementList[0].next);
                        const isWrapedWithParenthesis2 = this.parenthesisCheck(elementList[1].next);
                        if (isWrapedWithParenthesis || isWrapedWithParenthesis2) {
                            this.calculate(elementList);
                        }
                        let content = this.getOuterParencesContent(elementList[0].next);
                        const subsubElements = this.splitStringWithBracketsSub(content);
                        console.log('subsub-element',subsubElements);
                        for (let index = 0; index < subsubElements.length; index++) {
                            let counterSub2 = 99;
                            let elementListSub2 = [];
                            let element2 = subsubElements[index];
                            while (counterSub2>0) {
                                let resultSub2 = parser2.parse(element2);
                                element2= resultSub2.next;
                            
                                if(resultSub2.value == "" || resultSub2.next == ""){
                                    counterSub2 = -1;
                                }
                                elementListSub2.push(resultSub2);
                                
                    
                                if (counterSub2 === -1) {
                                    // elementCalc(elementList);
                                
                                    elementListSub2.push({ type: 'EOE', value: 'EOE', next: null });
                                }
                                counterSub2 -= 1;
                            }
                            console.log('subsub-elements',elementListSub2);   
                            this.calculate(elementListSub2);
                        }
                    }else{
                        if (elementList.length !== 0 && elementList[0].next.length > 0) {
                            console.log('ready-to-calculate');    
                        }
                        this.calculate(elementList);
                    }
                    list.push({ type: 'EOE', value: 'EOE', next: null });
                }
                if (this.subComponent) {
                    console.log('beforeReplaced',resultArray[index]);
                    var index2 = originalArray.indexOf(resultArray[index]);
                    if (index2 !== -1) {
                        originalArray[index2] = this.subComponent;
                    } else {
                        console.log("Element not found in the array.");
                    } 
                }
                this.subComponent = '';
                this.combinateionRule = true;
                counter -= 1;
            }
        }

        // here is the final result
        console.log('resultArray',resultArray);
        console.log('outputArray',originalArray);
        let joined = originalArray.join('');
        let finalResult = joined.replace(/--/g, '+').replace(/\+\-/g, '-');
        console.log('inputString',inputString);
        console.log('outputString',finalResult);   
        return finalResult; 
    }

}

module.exports = {
    Differentiate,
};