import _cloneDeep from 'clone-deep';

export const cloneDeep = function(obj: any): any {
    if (obj) {
        return _cloneDeep(obj);
    }
}

export function removeUndefined(obj: any): any {
    Object.keys(obj).forEach(key => {
        if (obj[key] === undefined) {
            delete obj[key];
        }
    });

    return obj;
}


export function getRandomStr(length: number = 5, stringOnly?: boolean): string {
    if (stringOnly) {
        return generateId(length * 2)
            .replace(/[0-9]/g, '')
    }
    return generateId(length);
}


function dec2hex (dec) {
    return ('0' + dec.toString(16)).substr(-2)
}
  
  // generateId :: Integer -> String
function generateId (len) {
    var arr = new Uint8Array((len || 40) / 2)
    window.crypto.getRandomValues(arr)
    return Array.from(arr, dec2hex).join('')
}