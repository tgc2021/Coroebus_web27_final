export class Model {
    constructor(objData: any) {
        (Object as any).assign(this, objData);
    }
    // tslint:disable-next-line:ban-types
    static setlocalStorage(name: string, data: Object) {
        localStorage.setItem(name, JSON.stringify(data));
    }

    // tslint:disable-next-line:ban-types
    static getlocalStorage(name: string): Object {
        return JSON.parse(localStorage.getItem(name) || '[]');
    }

    static removeLocalStorage(name: string) {
        localStorage.removeItem(name);
    }
}
