/**
 * @param {number} num minutes 
 */
 function minutesToTme(num) {
    if (num / 60  < 1)
        return num + "m ago";
    
    if (num / 3840 < 1)
        return Math.floor(num/60) + "h ago";
    
    return Math.floor(num/3840) + "d ago";
}
/**
 * @param {number} num 
 * @returns {string}
 */
const isMinorThanTen = (num) => num < 10 ? "0"+num : num + "";

/**
 * @param {number} val seg
 * @returns {string}
 */
const secToTimeString = (val) => {
    const _val = Math.floor(val);
    const sec = _val % 60;
    const min = Number.parseInt(_val / 60) % 60;
    const hr = Number.parseInt(_val / 3600);
    const str = isMinorThanTen(hr) + " : " + isMinorThanTen(min) + " : " + isMinorThanTen(sec);
    return str;
}

export {
    minutesToTme,
    isMinorThanTen,
    secToTimeString
}