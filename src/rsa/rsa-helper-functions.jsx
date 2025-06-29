export function isAllUppercase(str) {
    for (let i = 0; i < str.length; i++) {
        if (!/[A-Z]/.test(str[i])) {
            return false;
        }
    }
    return true;
  }
  
export function textToNum(text) {
    if (!isAllUppercase(text)){
        return {
            error: true,
            message: "Text validation failed: Your text must consist only of uppercase letters (A-Z). Please remove any lowercase letters, numbers, spaces, or special characters."
        };
    } else {
        let num = 0;
        for (let i = 0; i < text.length; i++){
        num += (text.charCodeAt(i) - 'A'.charCodeAt(0) + 1) * (100 ** i);
        }
        return {
            error: false,
            result: num
        };
    }
}
export function numToText(num){
    let text = "";
    while (num > 0){
        let last_two_digits = num % 100;
        text = text + "ABCDEFGHIJKLMNOPQRSTUVWXYZ".at(last_two_digits);
        num = Math.floor(num / 10);
    }
    return text;
}