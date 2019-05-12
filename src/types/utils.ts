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


export function getRandomStr(length: number = 5): string {
    const instr =  Math.random().toString(36) + new Date().getTime()
    return instr.substring(0, length);
}