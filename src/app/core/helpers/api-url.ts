
import { environment } from '@env';

export class APIUrl {
    constructor() { }

    static createAPIURL(slug: any, isAPIReady: boolean = true) {
        let link: any;
        if (slug[0] === '/') {
            link = isAPIReady ? this.getAPIUrl() : this.getLocalUrl();
            slug = link + slug;
        }
        return slug;
    }

    static getAPIUrl() {
        return environment.apiURL;
    }

    static getLocalUrl() {
        return environment.localApiURL;
    }

    static createDynamicURL(str: any, value: any) {
        let i = 0;
        return str.replace(/\?/g, () => {
            return value[i++];
        });
    }
}
