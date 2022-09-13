import { apiMethodsList } from '@app/helpers/api-methods-list'
import { mockeApiMethodsList } from '@app/helpers/mocke-api-methods-list'
import { HttpProtocols } from '@app/http/http.protocols'
import { environment } from '@env'
import { Model } from './model'
import { APIUrl } from '@app/helpers/api-url'
import { apiStatus } from '@app/helpers/api-status'


export class UserModel extends Model {
    constructor(obj: object) {
        super(obj)
    }
    static async authenticationAndAuthorization(data: any) {
        // tslint:disable-next-line:one-variable-per-declaration
        let err: any,
            res: any // get from API
            ;[err, res] = await HttpProtocols.to(
                environment.isMockDataEnable ? HttpProtocols.get(
                    environment.isMockDataEnable
                        ? mockeApiMethodsList.AUTHENTICATE[0]
                        : APIUrl.createAPIURL(
                            apiStatus.AUTHENTICATE.isAPIReadyForGetAuthenticateAccessToken
                                ? APIUrl.createDynamicURL(apiMethodsList.AUTHENTICATE[0], [])
                                : mockeApiMethodsList.AUTHENTICATE[0],
                            apiStatus.AUTHENTICATE.isAPIReadyForGetAuthenticateAccessToken
                        )
                ) : HttpProtocols.post(
                    environment.isMockDataEnable
                        ? mockeApiMethodsList.AUTHENTICATE[0]
                        : APIUrl.createAPIURL(
                            apiStatus.AUTHENTICATE.isAPIReadyForGetAuthenticateAccessToken
                                ? APIUrl.createDynamicURL(apiMethodsList.AUTHENTICATE[0], [])
                                : mockeApiMethodsList.AUTHENTICATE[0],
                            apiStatus.AUTHENTICATE.isAPIReadyForGetAuthenticateAccessToken
                        ),
                    data
                )
            )
        return res
    }

    static async checkUserID(data: any) {
        // tslint:disable-next-line:one-variable-per-declaration
        let err: any,
            res: any // get from API
            ;[err, res] = await HttpProtocols.to(
                environment.isMockDataEnable ? HttpProtocols.get(
                    environment.isMockDataEnable
                        ? mockeApiMethodsList.AUTHENTICATE[3]
                        : APIUrl.createAPIURL(
                            apiStatus.AUTHENTICATE.isAPIReadyForCheckUserID
                                ? APIUrl.createDynamicURL(apiMethodsList.AUTHENTICATE[3], [])
                                : mockeApiMethodsList.AUTHENTICATE[3],
                            apiStatus.AUTHENTICATE.isAPIReadyForCheckUserID
                        )
                ) : HttpProtocols.post(
                    environment.isMockDataEnable
                        ? mockeApiMethodsList.AUTHENTICATE[3]
                        : APIUrl.createAPIURL(
                            apiStatus.AUTHENTICATE.isAPIReadyForCheckUserID
                                ? APIUrl.createDynamicURL(apiMethodsList.AUTHENTICATE[3], [])
                                : mockeApiMethodsList.AUTHENTICATE[3],
                            apiStatus.AUTHENTICATE.isAPIReadyForCheckUserID
                        ),
                    data
                )
            )
        return res
    }
    static async checkSecurityAnswer(data: any) {
        // tslint:disable-next-line:one-variable-per-declaration
        let err: any,
            res: any // get from API
            ;[err, res] = await HttpProtocols.to(
                environment.isMockDataEnable ? HttpProtocols.get(
                    environment.isMockDataEnable
                        ? mockeApiMethodsList.AUTHENTICATE[4]
                        : APIUrl.createAPIURL(
                            apiStatus.AUTHENTICATE.isAPIReadyForCheckSecurityAnswer
                                ? APIUrl.createDynamicURL(apiMethodsList.AUTHENTICATE[4], [])
                                : mockeApiMethodsList.AUTHENTICATE[4],
                            apiStatus.AUTHENTICATE.isAPIReadyForCheckSecurityAnswer
                        )
                ) : HttpProtocols.post(
                    environment.isMockDataEnable
                        ? mockeApiMethodsList.AUTHENTICATE[4]
                        : APIUrl.createAPIURL(
                            apiStatus.AUTHENTICATE.isAPIReadyForCheckSecurityAnswer
                                ? APIUrl.createDynamicURL(apiMethodsList.AUTHENTICATE[4], [])
                                : mockeApiMethodsList.AUTHENTICATE[4],
                            apiStatus.AUTHENTICATE.isAPIReadyForCheckSecurityAnswer
                        ),
                    data
                )
            )
        return res
    }
    static async acceptTerms(data: any) {
        // tslint:disable-next-line:one-variable-per-declaration
        let err: any,
            res: any // get from API
            ;[err, res] = await HttpProtocols.to(
                environment.isMockDataEnable ? HttpProtocols.get(
                    environment.isMockDataEnable
                        ? mockeApiMethodsList.AUTHENTICATE[6]
                        : APIUrl.createAPIURL(
                            apiStatus.AUTHENTICATE.isAPIReadyForAcceptTerms
                                ? APIUrl.createDynamicURL(apiMethodsList.AUTHENTICATE[6], [])
                                : mockeApiMethodsList.AUTHENTICATE[6],
                            apiStatus.AUTHENTICATE.isAPIReadyForAcceptTerms
                        )
                ) : HttpProtocols.post(
                    environment.isMockDataEnable
                        ? mockeApiMethodsList.AUTHENTICATE[6]
                        : APIUrl.createAPIURL(
                            apiStatus.AUTHENTICATE.isAPIReadyForAcceptTerms
                                ? APIUrl.createDynamicURL(apiMethodsList.AUTHENTICATE[6], [])
                                : mockeApiMethodsList.AUTHENTICATE[6],
                            apiStatus.AUTHENTICATE.isAPIReadyForAcceptTerms
                        ),
                    data
                )
            )
        return res
    }
    static async getThemes(data: any) {
        // tslint:disable-next-line:one-variable-per-declaration
        let err: any,
            res: any // get from API
            ;[err, res] = await HttpProtocols.to(
                environment.isMockDataEnable ? HttpProtocols.get(
                    environment.isMockDataEnable
                        ? mockeApiMethodsList.AUTHENTICATE[2]
                        : APIUrl.createAPIURL(
                            apiStatus.AUTHENTICATE.isAPIReadyForAcceptTerms
                                ? APIUrl.createDynamicURL(apiMethodsList.AUTHENTICATE[2], [])
                                : mockeApiMethodsList.AUTHENTICATE[2],
                            apiStatus.AUTHENTICATE.isAPIReadyForAcceptTerms
                        )
                ) : HttpProtocols.post(
                    environment.isMockDataEnable
                        ? mockeApiMethodsList.AUTHENTICATE[2]
                        : APIUrl.createAPIURL(
                            apiStatus.AUTHENTICATE.isAPIReadyForAcceptTerms
                                ? APIUrl.createDynamicURL(apiMethodsList.AUTHENTICATE[2], [])
                                : mockeApiMethodsList.AUTHENTICATE[2],
                            apiStatus.AUTHENTICATE.isAPIReadyForAcceptTerms
                        ),
                    data
                )
            )
        return res
    }
    static async getGame(data: any) {
        // tslint:disable-next-line:one-variable-per-declaration
        let err: any,
            res: any // get from API
            ;[err, res] = await HttpProtocols.to(
                environment.isMockDataEnable ? HttpProtocols.get(
                    environment.isMockDataEnable
                        ? mockeApiMethodsList.AUTHENTICATE[1]
                        : APIUrl.createAPIURL(
                            apiStatus.AUTHENTICATE.isAPIReadyForAcceptTerms
                                ? APIUrl.createDynamicURL(apiMethodsList.AUTHENTICATE[1], [])
                                : mockeApiMethodsList.AUTHENTICATE[1],
                            apiStatus.AUTHENTICATE.isAPIReadyForAcceptTerms
                        )
                ) : HttpProtocols.post(
                    environment.isMockDataEnable
                        ? mockeApiMethodsList.AUTHENTICATE[1]
                        : APIUrl.createAPIURL(
                            apiStatus.AUTHENTICATE.isAPIReadyForAcceptTerms
                                ? APIUrl.createDynamicURL(apiMethodsList.AUTHENTICATE[1], [])
                                : mockeApiMethodsList.AUTHENTICATE[1],
                            apiStatus.AUTHENTICATE.isAPIReadyForAcceptTerms
                        ),
                    data
                )
            )
        return res
    }
    static async updatePassword(data: any) {
        // tslint:disable-next-line:one-variable-per-declaration
        let err: any,
            res: any // get from API
            ;[err, res] = await HttpProtocols.to(
                environment.isMockDataEnable ? HttpProtocols.get(
                    environment.isMockDataEnable
                        ? mockeApiMethodsList.AUTHENTICATE[7]
                        : APIUrl.createAPIURL(
                            apiStatus.AUTHENTICATE.isAPIReadyForUpdatePassword
                                ? APIUrl.createDynamicURL(apiMethodsList.AUTHENTICATE[7], [])
                                : mockeApiMethodsList.AUTHENTICATE[7],
                            apiStatus.AUTHENTICATE.isAPIReadyForUpdatePassword
                        )
                ) : HttpProtocols.post(
                    environment.isMockDataEnable
                        ? mockeApiMethodsList.AUTHENTICATE[7]
                        : APIUrl.createAPIURL(
                            apiStatus.AUTHENTICATE.isAPIReadyForUpdatePassword
                                ? APIUrl.createDynamicURL(apiMethodsList.AUTHENTICATE[7], [])
                                : mockeApiMethodsList.AUTHENTICATE[7],
                            apiStatus.AUTHENTICATE.isAPIReadyForUpdatePassword
                        ),
                    data
                )
            )
        return res
    }
    static async setSecurityQuestion(data: any) {
        // tslint:disable-next-line:one-variable-per-declaration
        let err: any,
            res: any // get from API
            ;[err, res] = await HttpProtocols.to(
                environment.isMockDataEnable ? HttpProtocols.get(
                    environment.isMockDataEnable
                        ? mockeApiMethodsList.AUTHENTICATE[5]
                        : APIUrl.createAPIURL(
                            apiStatus.AUTHENTICATE.isAPIReadyForSetSecurityQuestion
                                ? APIUrl.createDynamicURL(apiMethodsList.AUTHENTICATE[5], [])
                                : mockeApiMethodsList.AUTHENTICATE[5],
                            apiStatus.AUTHENTICATE.isAPIReadyForSetSecurityQuestion
                        )
                ) : HttpProtocols.post(
                    environment.isMockDataEnable
                        ? mockeApiMethodsList.AUTHENTICATE[5]
                        : APIUrl.createAPIURL(
                            apiStatus.AUTHENTICATE.isAPIReadyForSetSecurityQuestion
                                ? APIUrl.createDynamicURL(apiMethodsList.AUTHENTICATE[5], [])
                                : mockeApiMethodsList.AUTHENTICATE[5],
                            apiStatus.AUTHENTICATE.isAPIReadyForSetSecurityQuestion
                        ),
                    data
                )
            )
        return res
    }

}
