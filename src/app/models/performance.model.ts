import { apiMethodsList } from '@app/helpers/api-methods-list'
import { mockeApiMethodsList } from '@app/helpers/mocke-api-methods-list'
import { HttpProtocols } from '@app/http/http.protocols'
import { environment } from '@env'
import { Model } from './model'
import { APIUrl } from '@app/helpers/api-url'
import { apiStatus } from '@app/helpers/api-status'


export class PerformanceModel extends Model {
    constructor(obj: object) {
        super(obj)
    }
    /**
      * {"_userid":"GOLD031","_game":"98"}
      */
    static async pointsList(data: any) {
        // tslint:disable-next-line:one-variable-per-declaration
        let err: any,
            res: any // get from API
        [err, res] = await HttpProtocols.to(
            environment.isMockDataEnable ?
                HttpProtocols.get(
                    environment.isMockDataEnable
                        ? mockeApiMethodsList.PERFORMANCE[0]
                        : APIUrl.createAPIURL(
                            apiStatus.PERFORMANCE.isAPIReadyForPointsList
                                ? APIUrl.createDynamicURL(apiMethodsList.PERFORMANCE[0], [])
                                : mockeApiMethodsList.PERFORMANCE[0],
                            apiStatus.PERFORMANCE.isAPIReadyForPointsList
                        )
                ) :
                HttpProtocols.post(
                    environment.isMockDataEnable
                        ? mockeApiMethodsList.PERFORMANCE[0]
                        : APIUrl.createAPIURL(
                            apiStatus.PERFORMANCE.isAPIReadyForPointsList
                                ? APIUrl.createDynamicURL(apiMethodsList.PERFORMANCE[0], [])
                                : mockeApiMethodsList.PERFORMANCE[0],
                            apiStatus.PERFORMANCE.isAPIReadyForPointsList
                        ),
                    data
                )
        )
        return res
    }
    /**
     * {"_userid":"GOLD031","_game":"98", "_team":""}
     */
    static async myperformanceProduce(data: any) {
        // tslint:disable-next-line:one-variable-per-declaration
        let err: any,
            res: any // get from API
        [err, res] = await HttpProtocols.to(
            environment.isMockDataEnable ?
                HttpProtocols.get(
                    environment.isMockDataEnable
                        ? mockeApiMethodsList.PERFORMANCE[1]
                        : APIUrl.createAPIURL(
                            apiStatus.PERFORMANCE.isAPIReadyForProduce
                                ? APIUrl.createDynamicURL(apiMethodsList.PERFORMANCE[1], [])
                                : mockeApiMethodsList.PERFORMANCE[1],
                            apiStatus.PERFORMANCE.isAPIReadyForProduce
                        )
                ) :
                HttpProtocols.post(
                    environment.isMockDataEnable
                        ? mockeApiMethodsList.PERFORMANCE[1]
                        : APIUrl.createAPIURL(
                            apiStatus.PERFORMANCE.isAPIReadyForProduce
                                ? APIUrl.createDynamicURL(apiMethodsList.PERFORMANCE[1], [])
                                : mockeApiMethodsList.PERFORMANCE[1],
                            apiStatus.PERFORMANCE.isAPIReadyForProduce
                        ),
                    data
                )
        )
        return res
    }
}
