const Decimal = require('decimal.js');
const propertyMap = new Map();
class Service {
    static reservedWords = [
        'pi',
        'e',
        'asin',
        'acos',
        'atan',
        'sin',
        'cos',
        'tan',
        'exp',
        'logb',
        'logd',
        'log',
        'abs',
        'sqrt'
    ];

    constructor() {
        this.propertyMap = new Map();
    }

    setProperties(propertyMap) {
    for (const [key, value] of propertyMap) {
        this.propertyMap.set(key, value);
    }
    }

    getProperty(key) {
    return this.propertyMap.get(key);
    }
    
    replace_constant(source){
        let input = source;
        input = input.replaceAll('pi', Math.PI.toString());
        input = input.replaceAll(/(?<![a-zA-Z])e(?![a-zA-Z])/g, Math.E.toString());
        const words = input.match(/[a-zA-Z][0-9]*\b/g) ||  [];
        for (let index = 0; index < words.length; index++) {
            if (!Service.reservedWords.includes(words[index]) && this.getProperty(words[index]) != null) {
                let value =  this.getProperty(words[index]).toString();
                input = input.replaceAll(words[index], value);
            } 
        }
        return input;
    }
    
    num_check(source){
        var regex = /[^-0123456789.]/g;
        // Replace characters not in the set with an empty string
        var numonly = source.replace(regex, "");
        return numonly;
    }

    extractMostNestedBraces(input) {
        let depth = 0;
        let currentDepth = 0;
        let startIndex = -1;
        let endIndex = -1;

        for (let i = 0; i < input.length; i++) {
            if (input[i] === '(') {
                currentDepth++;
                if (currentDepth > depth) {
                    depth = currentDepth;
                    startIndex = i;
                }
            } else if (input[i] === ')') {
                if (currentDepth === depth) {
                    endIndex = i;
                    break;
                }
                currentDepth--;
            }
        }

        if (startIndex !== -1 && endIndex !== -1) {
            return input.substring(startIndex + 1, endIndex);
        } else {
            return null;
        }
    }
    
    scientific_operation(source){
        var input = source;//sin60,sqrt4,log
        //(elements)
        //(cos60+sin60+8)
        input = input.replaceAll('(','');
        input = input.replaceAll(')','');
        const elements = input.match(/[a-z]+\s*-?\d+(\.\d+)?/gi);
        if (elements) {
            for (let i = 0; i < elements.length; i++){
                if (elements[i].includes("asin")) {
                    if (this.isFloat(elements[i].replaceAll("asin", ""))){
                        let exp = elements[i].replaceAll("asin", "");
                        let arg = new Decimal(exp);
                        let radian = new Decimal(this.degreesToRadians(arg));
                        let resultvalue = new Decimal(Math.asin(radian));
                        input = input.replaceAll(elements[i], resultvalue.toString());
                    }
                }
                if (elements[i].includes("acos")) {
                    if (this.isFloat(elements[i].replaceAll("acos", ""))){
                        let exp = elements[i].replaceAll("acos", "");
                        let arg = new Decimal(exp);
                        let radian = new Decimal(this.degreesToRadians(arg));
                        let resultvalue = new Decimal(Math.acos(radian));
                        input = input.replaceAll(elements[i], resultvalue.toString());
                    }
                }
                if (elements[i].includes("atan")) {
                    if (this.isFloat(elements[i].replaceAll("atan", ""))){
                        let exp = elements[i].replaceAll("atan", "");
                        let arg = new Decimal(exp);
                        let radian = new Decimal(this.degreesToRadians(arg));
                        let resultvalue = new Decimal(Math.atan(radian));
                        input = input.replaceAll(elements[i], resultvalue.toString());
                    }
                }
                if (elements[i].includes("sin")) {
                    if (this.isFloat(elements[i].replaceAll("sin", ""))){
                        let exp = elements[i].replaceAll("sin", "");
                        let arg = new Decimal(exp);
                        let radian = new Decimal(this.degreesToRadians(arg));
                        let resultvalue = new Decimal(Math.sin(radian));
                        input = input.replaceAll(elements[i], resultvalue.toString());
                    }
                }
                if (elements[i].includes("cos")) {
                    if (this.isFloat(elements[i].replaceAll("cos", ""))){
                        let exp = elements[i].replaceAll("cos", "");
                        let arg = new Decimal(exp);
                        let radian = new Decimal(this.degreesToRadians(arg));
                        let resultvalue = new Decimal(Math.cos(radian));
                        input = input.replaceAll(elements[i], resultvalue.toString());
                    }
                }
                if (elements[i].includes("tan")) {
                    if (this.isFloat(elements[i].replaceAll("tan", ""))){
                        let exp = elements[i].replaceAll("tan", "");
                        let arg = new Decimal(exp);
                        let radian = new Decimal(this.degreesToRadians(arg));
                        let resultvalue = new Decimal(Math.tan(radian));
                        input = input.replaceAll(elements[i], resultvalue.toString());
                    }
                }   
                if (elements[i].includes("sqrt")) {
                    if (this.isFloat(elements[i].replaceAll("sqrt", ""))){
                        let exp = elements[i].replaceAll("sqrt", "");
                        let arg = new Decimal(exp);
                        let resultvalue = new Decimal(Math.sqrt(arg));
                        input = input.replaceAll(elements[i], resultvalue.toString());
                    }
                }    
                if (elements[i].includes("abs")) {
                    if (this.isFloat(elements[i].replaceAll("abs", ""))){
                        let exp = elements[i].replaceAll("abs", "");
                        let arg = new Decimal(exp);
                        let resultvalue = new Decimal(Math.abs(arg));
                        input = input.replaceAll(elements[i], resultvalue.toString());
                    }
                }  
                if (elements[i].includes("exp")) {
                    if (this.isFloat(elements[i].replaceAll("exp", ""))){
                        let exp = elements[i].replaceAll("exp", "");
                        let arg = new Decimal(exp);
                        let resultvalue = new Decimal(Math.exp(arg));
                        input = input.replaceAll(elements[i], resultvalue.toString());
                    }
                }
                if (elements[i].includes("logd")) {
                    if (this.isFloat(elements[i].replaceAll("logd", ""))){
                        let exp = elements[i].replaceAll("logd", "");
                        let arg = new Decimal(exp);
                        let resultvalue = new Decimal(Math.log10(arg));
                        input = input.replaceAll(elements[i], resultvalue.toString());
                    }
                } 
                if (elements[i].includes("logb")) {
                    if (this.isFloat(elements[i].replaceAll("logb", ""))){
                        let exp = elements[i].replaceAll("logb", "");
                        let arg = new Decimal(exp);
                        let resultvalue = new Decimal(Math.log2(arg));
                        input = input.replaceAll(elements[i], resultvalue.toString());
                    }
                }
                if (elements[i].includes("log")) {
                    if (this.isFloat(elements[i].replaceAll("log", ""))){
                        let exp = elements[i].replaceAll("log", "");
                        let arg = new Decimal(exp);
                        let resultvalue = new Decimal(Math.log(arg));
                        input = input.replaceAll(elements[i], resultvalue.toString());
                    }
                }
            }   
        }
        return input;
    }
    
    isFloat(str) {
        return /^-?\d+(\.\d+)?$/.test(str);
    }  

    areAllFloats(item) {
        return !isNaN(parseFloat(item));
      }

    containsAlphabetChars(str) {
        return /[a-zA-Z]/.test(str);
    }

    degreesToRadians(degrees) {
        return degrees * (Math.PI / 180);
      }

    basic_operation(source){
        var resultvalue = new Decimal("0.0");
        var input = source;
        input = input.replaceAll("--" , "+");
        input = input.replaceAll("+" , " + ");
        input = input.replaceAll("/" , " / ");
        input = input.replaceAll("-" , " -");
        input = input.replaceAll("*" , " * ");
        input = input.replaceAll("^" , " ^ ");

        
        
        let elements = input.split(' ');
        elements = elements.filter(function(item) {
            return item !== "nil" && item !== "" && item !== null && item !== undefined;
        });
        
        let checkings = Array.from(elements);
        checkings = checkings.filter(function(item) {
            return item !== "+";
        });

        if (checkings.every(this.areAllFloats)) {
            elements = checkings;        
            //MUST NEED
            if (elements.length > 1) {
                for (let i = 0; i < elements.length; i++){
                    if (this.isFloat(elements[i-1]) && this.isFloat(elements[i])){
                        let a = new Decimal(elements[i-1]);
                        let b = new Decimal(elements[i]);
                        let resultvalue = a.plus(b);
                        elements[i] = resultvalue.toString();
                        elements[i-1] = "nil";
                    }
                }
            }
            elements = elements.filter(function(item) {
                return item !== "nil";
            });
            return elements.join('');
        
            
        }else{
            if (elements.includes('^')) {
                for (let i = 0; i < elements.length; i++) {
                    if (elements[i] == "^" &&  typeof elements[i-1] !== "undefined" && this.isFloat(elements[i-1]) && typeof elements[i+1] !== "undefined" && this.isFloat(elements[i+1])) {                    
                        let a = new Decimal(elements[i-1]);
                        let b = new Decimal(elements[i+1]);
                        var c =  a.pow(b);
                        elements[i+1] = "+";
                        elements[i-1] = "nil";
                        elements[i] = c.toString();                
                    }
                }
            }else{
                for (let i = 0; i < elements.length; i++) {
                    if (elements[i] == "*" && typeof elements[i-1] !== "undefined" && this.isFloat(elements[i-1]) && typeof elements[i+1] !== "undefined" && this.isFloat(elements[i+1])) {
                        let a = new Decimal(elements[i-1])
                        let b = new Decimal(elements[i+1])
                        resultvalue = a.times(b); 
                        elements[i+1] = resultvalue.toString();
                        elements[i-1] = "nil";
                        elements[i] = "nil";
                    }
                    
                    if (elements[i] == "/" && this.isFloat(elements[i-1]) && this.isFloat(elements[i+1])){
                        let a = new Decimal(elements[i-1]);
                        let b = new Decimal(elements[i+1]);
                        if (elements[i+1] == "0") {
                            elements[i-1] = "nil";
                            elements[i] = "nil";
                            elements[i+1] = "nil";
                        }
                        else{
                            resultvalue = a.dividedBy(b);
                            elements[i+1] = resultvalue.toString();
                            elements[i-1] = "nil";
                            elements[i] = "nil";
                        }
                    }
                }
            }
            elements = elements.filter(function(item) {
                return item !== "nil";
            });

            return elements.join('');
        }
    }
    
    excecute(expression) {
        let tempStr = null;
        const charset = new Set("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
        if ([...expression].some(char => charset.has(char))) {
            return false;
        } else {
            tempStr = expression.replace(/=/g, "");
            // Continue using tempStr or perform other operations
        }

        //screening
        let firstChar = tempStr[0];
        if (firstChar === "^"){        
            return false;
        }else if (firstChar === "/"){
            return false;
        }else if (firstChar === "*"){
            return false;
        }else if (firstChar === "+"){
            return false;
        }
        
        const MAXIMUM_LOOP_NUM = 50;
        let loopcounter = MAXIMUM_LOOP_NUM;
        
        //PREPARATION
        tempStr = this.replace_constant(tempStr);
        
        //Comma Free
        tempStr = tempStr.replaceAll(",", "");    
        if(!tempStr.includes("(")){
            loopcounter = 50;
            //no braces
            if (!this.isFloat(tempStr)){
                while (loopcounter > 0)  {                
                    tempStr = this.scientific_operation(tempStr);
                    tempStr = this.basic_operation(tempStr);

                    if (this.isFloat(tempStr)){
                        loopcounter = 0;
                    }
                    loopcounter -= 1;
                }
            }
        }
        
        while (loopcounter > 0)  {
            tempStr = tempStr.replaceAll(' ','');
            //let matches = tempStr.match(/\(([^)]+)\)/g);
            let match = this.extractMostNestedBraces(tempStr);
            if (match) {
                let cloned = '(' + match + ')';//Array.from(match);
                let result = null;
                let j = 10;
                for (let i = 0; i < cloned.length; i++){
                    if(this.containsAlphabetChars(cloned)){
                        result = this.scientific_operation(cloned.replace('(','').replace(')',''));
                        while (j > 0) {
                            if (result && this.isFloat(result)) {
                                tempStr = tempStr.replace(cloned,result);
                                j=0;
                            }else{
                                if(this.containsAlphabetChars(result)){
                                    result = this.scientific_operation(result);
                                }else{
                                    result = this.basic_operation(result);
                                }
                            }  
                            j-=1;
                        } 
                    }else{
                        let k = 50;
                        let basicExp = cloned.replace('(','').replace(')','');
                        while (k > 0)  {                
                            result = this.basic_operation(basicExp);
                            if (this.isFloat(result)){
                                k = 0;
                            }
                            basicExp = result;
                            k -= 1;
                        }
                        if (result) {
                            let ptn = cloned;
                            tempStr = tempStr.replace(ptn,result);
                        }           
                    }
                }
            }

            match = this.extractMostNestedBraces(tempStr);
            if (!match) {
                tempStr = this.scientific_operation(tempStr);
                tempStr = this.basic_operation(tempStr);   
            }
            if (this.isFloat(tempStr)){
                loopcounter = 0;
            }
            loopcounter -= 1;
        }
        
        if (this.isFloat(tempStr)){
            return tempStr;
        }else{
            return false;
        }
    }

    runge_kutta_method(fx,x0,y0,h,l=10) {
        // fx = y - x
        //k1
        let xi = new Decimal(x0);
        let k1_x0 = parseFloat(x0) ;
        let k1_y0 = parseFloat(y0);
        propertyMap.set("h", h);
        let xAry = Array();
        let yAry = Array();

        xAry.push(x0.toString());
        yAry.push(y0.toString());

        for (let index = 0; index < l; index++) {

            xi = xi.plus(h);
            k1_x0 = x0 + parseFloat(h) * index
            propertyMap.set("x0", k1_x0);
            propertyMap.set("y0", k1_y0);
            propertyMap.set("x", k1_x0);
            propertyMap.set("y", k1_y0);
            this.setProperties(propertyMap);
            let r1 = this.excecute(fx);
            propertyMap.set("r1", r1);
            this.setProperties(propertyMap);
            let k1 = this.excecute('h*r1');
            propertyMap.set("k1", k1);
            this.setProperties(propertyMap);

            //k2
            let k2_x0 = this.excecute('x0 + 0.5 * h');
            propertyMap.set("x", k2_x0);
            this.setProperties(propertyMap);
            let k2_y0 = this.excecute('y0 + 0.5 * ' + k1);
            propertyMap.set("y", k2_y0);
            this.setProperties(propertyMap);
            let r2 = this.excecute(fx);
            propertyMap.set("r2", r2);
            this.setProperties(propertyMap);
            let k2 = this.excecute('h*r2');
            propertyMap.set("k2", k2);
            this.setProperties(propertyMap);

            //k3
            let k3_y0 = this.excecute('y0 + 0.5 * ' + k2);
            propertyMap.set("y", k3_y0);
            this.setProperties(propertyMap);
            let r3 = this.excecute(fx);
            propertyMap.set("r3", r3);
            this.setProperties(propertyMap);
            let k3 = this.excecute('h*r3');
            propertyMap.set("k3", k3);
            this.setProperties(propertyMap);

            //k4
            let k4_x0 = this.excecute('x0 + h');
            propertyMap.set("x", k4_x0);
            this.setProperties(propertyMap);
            let k4_y0 = this.excecute('y0  + ' +k3);
            propertyMap.set("y", k4_y0);
            this.setProperties(propertyMap);
            let r4 = this.excecute(fx);
            propertyMap.set("r4", r4);
            this.setProperties(propertyMap);
            let k4 = this.excecute('h*r4');
            propertyMap.set("k4", k4);
            this.setProperties(propertyMap);

            propertyMap.set("y", k1_y0);
            this.setProperties(propertyMap);
            let y = this.excecute('y + ((k1 + 2*k2 + 2*k3 + k4)/6)');
            k1_y0 = y;          
            xAry.push(xi.toString());
            yAry.push(y);
            console.log(fx);
            console.log(y);
        }

        return [xAry,yAry];
    }
}

module.exports = {
    Service,
};