export function camelToSnake(string) {
    return string.replace(/[\w]([A-Z])/g, function(m) {
        return m[0] + "_" + m[1];
    }).toLowerCase();
}

export function convertRemToPixels(rem) {    
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}