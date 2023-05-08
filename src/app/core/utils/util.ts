import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import * as CryptoJs from 'crypto-js'
@Injectable({
    providedIn: 'root'
})
export class Util {
    constructor(private router: Router) { }
    objToquery(MasterObj: any, ignoreParams: Array<string>, isQuestionMarkApplied: boolean = false) {
        let paramsArray = [];
        for (const [key, value] of Object.entries(MasterObj)) {
            if (value && !ignoreParams.some((x) => x === key)) {
                paramsArray.push(`${key}=${MasterObj[key]}`);
            }
        }
        const query = paramsArray.join('&');
        return isQuestionMarkApplied ? `?${query}` : query;
    }
    encryptData(data: any) {
        let iv = CryptoJs.enc.Base64.parse("")
        let key = CryptoJs.SHA256('3sc3RLrpd17')
        let encryptedData = CryptoJs.AES.encrypt(data, key, {
            iv: iv,
            mode: CryptoJs.mode.CBC,
            padding: CryptoJs.pad.Pkcs7
        })
        let encryptedDataInString = encodeURI(encryptedData)
        return encryptedDataInString
    }
    decryptData(data: any) {
        let iv = CryptoJs.enc.Base64.parse("")
        let key = CryptoJs.SHA256('3sc3RLrpd17')
        let decryptedData = CryptoJs.AES.decrypt(data, key, {
            iv: iv,
            mode: CryptoJs.mode.CBC,
            padding: CryptoJs.pad.Pkcs7
        })
        let decryptedDataInString = decryptedData.toString(CryptoJs.enc.Utf8)
        
        return decryptedDataInString
    }
    isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
    goto(url: any) {
        this.router.navigate([url])
    }
    checkIfImageExists(url: string, callback: (exists: boolean) => void) {
        const img = new Image();
        img.src = url;

        if (img.complete) {
            callback(true);
        } else {
            img.onload = () => {
                callback(true);
            };

            img.onerror = () => {
                callback(false);
            };
        }
    }
    pokeMapping() {
        let pokeMappingArr: any;
        return pokeMappingArr = [{
            roleID: '6',
            canPokeTo: ['6']
        }, {
            roleID: '4',
            canPokeTo: ['6', '4', '10']
        }, {
            roleID: '10',  
            canPokeTo: ['6', '4', '10']
        }, {
            roleID: '3',
            canPokeTo: ['6', '4', '10', '3', '11']
        }, {
            roleID: '11',
            canPokeTo: ['6', '4', '10', '3', '11']
        },{
            roleID: '8',
            canPokeTo: ['6', '4', '10', '3', '11','8','12']
        },{
            roleID: '12',
            canPokeTo: ['6', '4', '10', '3', '11','8','12']
        }, {
            roleID: '9',
            canPokeTo: ['6', '4', '10', '3', '11','8','12','9']
        },{
            roleID: '13',
            canPokeTo: ['6', '4', '10', '3', '11','8','12','9']
        },
        
    ]
    }


}