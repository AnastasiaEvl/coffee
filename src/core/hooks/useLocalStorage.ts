export function UseSetLocalStorageItem(key: string, value: any) {
    if(!localStorage.getItem(key)){
        return localStorage.setItem(key, value)
    }else{
        const serializedValue = JSON.stringify(value);
        localStorage.setItem(key, serializedValue);
    }
}

export function UseGetLocalStorageItem(key:string){
    if(localStorage.getItem(key)){
    return JSON.parse(localStorage.getItem(key) || '[]' || '{}' || '')}else{return null}
}


export function UseRemoveLocalStorageItem(key:string){
    return localStorage.removeItem(key)
}
