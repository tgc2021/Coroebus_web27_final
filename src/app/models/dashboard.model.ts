import { apiMethodsList } from '@app/helpers/api-methods-list'
import { mockeApiMethodsList } from '@app/helpers/mocke-api-methods-list'
import { HttpProtocols } from '@app/http/http.protocols'
import { environment } from '@env'
import { Model } from './model'
import { APIUrl } from '@app/helpers/api-url'
import { apiStatus } from '@app/helpers/api-status'

export class DashboardModel extends Model {
    constructor(obj: object) {
        super(obj)
    }
    /**
     * {"_userid":"GOLD015","_game":"197","_section_view":"1","page_number":"1"}
     */
    static async getUserBannerDataSectionView_1(data: any) {
        // tslint:disable-next-line:one-variable-per-declaration
        let err: any,
            res: any // get from API
        [err, res] = await HttpProtocols.to(
            environment.isMockDataEnable ?
                HttpProtocols.get(
                    environment.isMockDataEnable
                        ? mockeApiMethodsList.DASHBOARD[0]
                        : APIUrl.createAPIURL(
                            apiStatus.DASHBOARD.isAPIReadyForGetDashboardProduce_1
                                ? APIUrl.createDynamicURL(apiMethodsList.DASHBOARD[0], [])
                                : mockeApiMethodsList.DASHBOARD[0],
                            apiStatus.DASHBOARD.isAPIReadyForGetDashboardProduce_1
                        )
                ) :
                HttpProtocols.post(
                    environment.isMockDataEnable
                        ? mockeApiMethodsList.DASHBOARD[0]
                        : APIUrl.createAPIURL(
                            apiStatus.DASHBOARD.isAPIReadyForGetDashboardProduce_1
                                ? APIUrl.createDynamicURL(apiMethodsList.DASHBOARD[0], [])
                                : mockeApiMethodsList.DASHBOARD[0],
                            apiStatus.DASHBOARD.isAPIReadyForGetDashboardProduce_1
                        ),
                    data
                )
        )
        return res
    }
    /**
     * {"_userid":"GOLD015","_game":"197","_section_view":"2","page_number":"1"}
     */
    static async getCenterDataSectionView_2(data: any) {
        // tslint:disable-next-line:one-variable-per-declaration
        let err: any,
            res: any // get from API
            ;[err, res] = await HttpProtocols.to(
                environment.isMockDataEnable ? HttpProtocols.get(
                    environment.isMockDataEnable
                        ? mockeApiMethodsList.DASHBOARD[1]
                        : APIUrl.createAPIURL(
                            apiStatus.DASHBOARD.isAPIReadyForGetDashboardProduce_2
                                ? APIUrl.createDynamicURL(apiMethodsList.DASHBOARD[1], [])
                                : mockeApiMethodsList.DASHBOARD[1],
                            apiStatus.DASHBOARD.isAPIReadyForGetDashboardProduce_2
                        )
                ) : HttpProtocols.post(
                    environment.isMockDataEnable
                        ? mockeApiMethodsList.DASHBOARD[1]
                        : APIUrl.createAPIURL(
                            apiStatus.DASHBOARD.isAPIReadyForGetDashboardProduce_2
                                ? APIUrl.createDynamicURL(apiMethodsList.DASHBOARD[1], [])
                                : mockeApiMethodsList.DASHBOARD[1],
                            apiStatus.DASHBOARD.isAPIReadyForGetDashboardProduce_2
                        ),
                    data
                )
            )
        return res
    }

    static async getCenterDataSectionView_2New(data: any) {
        // tslint:disable-next-line:one-variable-per-declaration
        let err: any,
            res: any // get from API
            ;[err, res] = await HttpProtocols.to(
                environment.isMockDataEnable ? HttpProtocols.get(
                    environment.isMockDataEnable
                        ? mockeApiMethodsList.DASHBOARD[1]
                        : APIUrl.createAPIURL(
                            apiStatus.DASHBOARD.isAPIReadyForGetDashboardProduce_2
                                ? APIUrl.createDynamicURL(apiMethodsList.DASHBOARD[8], [])
                                : mockeApiMethodsList.DASHBOARD[1],
                            apiStatus.DASHBOARD.isAPIReadyForGetDashboardProduce_2
                        )
                ) : HttpProtocols.post(
                    environment.isMockDataEnable
                        ? mockeApiMethodsList.DASHBOARD[1]
                        : APIUrl.createAPIURL(
                            apiStatus.DASHBOARD.isAPIReadyForGetDashboardProduce_2
                                ? APIUrl.createDynamicURL(apiMethodsList.DASHBOARD[1], [])
                                : mockeApiMethodsList.DASHBOARD[1],
                            apiStatus.DASHBOARD.isAPIReadyForGetDashboardProduce_2
                        ),
                    data
                )
            )
        return res
    }
    /**
     * {"_userid":"GOLD015","_game":"197","_section_view":"3","page_number":"1"}
     */
    static async getRankingAndOtherDataSectionView_3(data: any) {
        // tslint:disable-next-line:one-variable-per-declaration
        let err: any,
            res: any // get from API
            ;[err, res] = await HttpProtocols.to(
                environment.isMockDataEnable ? HttpProtocols.get(
                    environment.isMockDataEnable
                        ? mockeApiMethodsList.DASHBOARD[2]
                        : APIUrl.createAPIURL(
                            apiStatus.DASHBOARD.isAPIReadyForGetDashboardProduce_3
                                ? APIUrl.createDynamicURL(apiMethodsList.DASHBOARD[2], [])
                                : mockeApiMethodsList.DASHBOARD[2],
                            apiStatus.DASHBOARD.isAPIReadyForGetDashboardProduce_3
                        )
                ) : HttpProtocols.post(
                    environment.isMockDataEnable
                        ? mockeApiMethodsList.DASHBOARD[2]
                        : APIUrl.createAPIURL(
                            apiStatus.DASHBOARD.isAPIReadyForGetDashboardProduce_3
                                ? APIUrl.createDynamicURL(apiMethodsList.DASHBOARD[2], [])
                                : mockeApiMethodsList.DASHBOARD[2],
                            apiStatus.DASHBOARD.isAPIReadyForGetDashboardProduce_3
                        ),
                    data
                )
            )
        return res

    }
    /**
     * {"_userid":"GOLD015","_game":"197"}
     */
    static async notificationList(data: any) {
        // tslint:disable-next-line:one-variable-per-declaration
        let err: any,
            res: any // get from API
            ;[err, res] = await HttpProtocols.to(
                environment.isMockDataEnable ? HttpProtocols.get(
                    environment.isMockDataEnable
                        ? mockeApiMethodsList.Notification[1]
                        : APIUrl.createAPIURL(
                            apiStatus.Notification.isAPIReadyForGetNotificationList
                                ? APIUrl.createDynamicURL(apiMethodsList.Notification[1], [])
                                : mockeApiMethodsList.Notification[1],
                            apiStatus.Notification.isAPIReadyForGetNotificationList
                        )
                ) : HttpProtocols.post(
                    environment.isMockDataEnable
                        ? mockeApiMethodsList.Notification[1]
                        : APIUrl.createAPIURL(
                            apiStatus.Notification.isAPIReadyForGetNotificationList
                                ? APIUrl.createDynamicURL(apiMethodsList.Notification[1], [])
                                : mockeApiMethodsList.Notification[1],
                            apiStatus.Notification.isAPIReadyForGetNotificationList
                        ),
                    data
                )
            )
        return res
    }
    /**
    * {"_userid":"GOLD015","_game":"197"}
    */
    static async notificationStatus(data: any) {
        // tslint:disable-next-line:one-variable-per-declaration
        let err: any,
            res: any // get from API
            ;[err, res] = await HttpProtocols.to(
                environment.isMockDataEnable ? HttpProtocols.get(
                    environment.isMockDataEnable
                        ? mockeApiMethodsList.Notification[0]
                        : APIUrl.createAPIURL(
                            apiStatus.Notification.isAPIReadyForGetNotificationStatus
                                ? APIUrl.createDynamicURL(apiMethodsList.Notification[0], [])
                                : mockeApiMethodsList.Notification[0],
                            apiStatus.Notification.isAPIReadyForGetNotificationStatus
                        )
                ) : HttpProtocols.post(
                    environment.isMockDataEnable
                        ? mockeApiMethodsList.Notification[0]
                        : APIUrl.createAPIURL(
                            apiStatus.Notification.isAPIReadyForGetNotificationStatus
                                ? APIUrl.createDynamicURL(apiMethodsList.Notification[0], [])
                                : mockeApiMethodsList.Notification[0],
                            apiStatus.Notification.isAPIReadyForGetNotificationStatus
                        ),
                    data
                )
            )
        return res
    }
    /**
    * {"_userid":"GOLD015","_game":"197"}
    */
    static async notificationUpdate(data: any) {
        // tslint:disable-next-line:one-variable-per-declaration
        let err: any,
            res: any // get from API
            ;[err, res] = await HttpProtocols.to(
                environment.isMockDataEnable ? HttpProtocols.get(
                    environment.isMockDataEnable
                        ? mockeApiMethodsList.Notification[2]
                        : APIUrl.createAPIURL(
                            apiStatus.Notification.isAPIReadyForGetNotificationUpdate
                                ? APIUrl.createDynamicURL(apiMethodsList.Notification[2], [])
                                : mockeApiMethodsList.Notification[2],
                            apiStatus.Notification.isAPIReadyForGetNotificationUpdate
                        )
                ) : HttpProtocols.post(
                    environment.isMockDataEnable
                        ? mockeApiMethodsList.Notification[2]
                        : APIUrl.createAPIURL(
                            apiStatus.Notification.isAPIReadyForGetNotificationUpdate
                                ? APIUrl.createDynamicURL(apiMethodsList.Notification[2], [])
                                : mockeApiMethodsList.Notification[2],
                            apiStatus.Notification.isAPIReadyForGetNotificationUpdate
                        ),
                    data
                )
            )
        return res
    }
    /**
   * {"_userid":"GOLD015","_game":"197"}
   */
    static async addIns(data: any) {
        // tslint:disable-next-line:one-variable-per-declaration
        let err: any,
            res: any // get from API
            ;[err, res] = await HttpProtocols.to(
                environment.isMockDataEnable ? HttpProtocols.get(
                    environment.isMockDataEnable
                        ? mockeApiMethodsList.DASHBOARD[3]
                        : APIUrl.createAPIURL(
                            apiStatus.DASHBOARD.isAPIReadyForGetDashboardAddIns
                                ? APIUrl.createDynamicURL(apiMethodsList.DASHBOARD[3], [])
                                : mockeApiMethodsList.DASHBOARD[3],
                            apiStatus.DASHBOARD.isAPIReadyForGetDashboardAddIns
                        )
                ) : HttpProtocols.post(
                    environment.isMockDataEnable
                        ? mockeApiMethodsList.DASHBOARD[3]
                        : APIUrl.createAPIURL(
                            apiStatus.DASHBOARD.isAPIReadyForGetDashboardAddIns
                                ? APIUrl.createDynamicURL(apiMethodsList.DASHBOARD[3], [])
                                : mockeApiMethodsList.DASHBOARD[3],
                            apiStatus.DASHBOARD.isAPIReadyForGetDashboardAddIns
                        ),
                    data
                )
            )
        return res
    }
    /**
  * {"_userid":"GOLD015","_game":"98","page_number":1,"_uname":"p2","_order":1}
  */
    static async spectSearch(data: any) {
        // tslint:disable-next-line:one-variable-per-declaration
        let err: any,
            res: any // get from API
            ;[err, res] = await HttpProtocols.to(
                environment.isMockDataEnable ? HttpProtocols.get(
                    environment.isMockDataEnable
                        ? mockeApiMethodsList.DASHBOARD[4]
                        : APIUrl.createAPIURL(
                            apiStatus.DASHBOARD.isAPIReadyForGetDashboardInputSearch
                                ? APIUrl.createDynamicURL(apiMethodsList.DASHBOARD[4], [])
                                : mockeApiMethodsList.DASHBOARD[4],
                            apiStatus.DASHBOARD.isAPIReadyForGetDashboardInputSearch
                        )
                ) : HttpProtocols.post(
                    environment.isMockDataEnable
                        ? mockeApiMethodsList.DASHBOARD[4]
                        : APIUrl.createAPIURL(
                            apiStatus.DASHBOARD.isAPIReadyForGetDashboardInputSearch
                                ? APIUrl.createDynamicURL(apiMethodsList.DASHBOARD[4], [])
                                : mockeApiMethodsList.DASHBOARD[4],
                            apiStatus.DASHBOARD.isAPIReadyForGetDashboardInputSearch
                        ),
                    data
                )
            )
        return res
    }
    /**
     * { "_game": "98", "_role": "6" };
     */
    static async levelsBuckets(data: any) {
        // tslint:disable-next-line:one-variable-per-declaration
        let err: any,
            res: any // get from API
            ;[err, res] = await HttpProtocols.to(
                environment.isMockDataEnable ? HttpProtocols.get(
                    environment.isMockDataEnable
                        ? mockeApiMethodsList.DASHBOARD[5]
                        : APIUrl.createAPIURL(
                            apiStatus.DASHBOARD.isAPIReadyForGetlevelsBucketsList
                                ? APIUrl.createDynamicURL(apiMethodsList.DASHBOARD[5], [])
                                : mockeApiMethodsList.DASHBOARD[5],
                            apiStatus.DASHBOARD.isAPIReadyForGetlevelsBucketsList
                        )
                ) : HttpProtocols.post(
                    environment.isMockDataEnable
                        ? mockeApiMethodsList.DASHBOARD[5]
                        : APIUrl.createAPIURL(
                            apiStatus.DASHBOARD.isAPIReadyForGetlevelsBucketsList
                                ? APIUrl.createDynamicURL(apiMethodsList.DASHBOARD[5], [])
                                : mockeApiMethodsList.DASHBOARD[5],
                            apiStatus.DASHBOARD.isAPIReadyForGetlevelsBucketsList
                        ),
                    data
                )
            )
        return res
    }
    /**
    * {"_userid":"GOLD015","_team":"359","_game":"98","_id_user_poked":"53312","_pokeid":"4"}
    */
    static async pokeSelection(data: any) {
        // tslint:disable-next-line:one-variable-per-declaration
        let err: any,
            res: any // get from API
            ;[err, res] = await HttpProtocols.to(
                environment.isMockDataEnable ? HttpProtocols.get(
                    environment.isMockDataEnable
                        ? mockeApiMethodsList.DASHBOARD[6]
                        : APIUrl.createAPIURL(
                            apiStatus.DASHBOARD.isAPIReadyForAddPoke
                                ? APIUrl.createDynamicURL(apiMethodsList.DASHBOARD[6], [])
                                : mockeApiMethodsList.DASHBOARD[6],
                            apiStatus.DASHBOARD.isAPIReadyForAddPoke
                        )
                ) : HttpProtocols.post(
                    environment.isMockDataEnable
                        ? mockeApiMethodsList.DASHBOARD[6]
                        : APIUrl.createAPIURL(
                            apiStatus.DASHBOARD.isAPIReadyForAddPoke
                                ? APIUrl.createDynamicURL(apiMethodsList.DASHBOARD[6], [])
                                : mockeApiMethodsList.DASHBOARD[6],
                            apiStatus.DASHBOARD.isAPIReadyForAddPoke
                        ),
                    data
                )
            )
        return res
    }
    /**
   * {"_userid":"GOLD015","_game":"197"}
   */
    static async hierarchyPopup(data: any) {
        // tslint:disable-next-line:one-variable-per-declaration
        let err: any,
            res: any // get from API
            ;[err, res] = await HttpProtocols.to(
                environment.isMockDataEnable ? HttpProtocols.get(
                    environment.isMockDataEnable
                        ? mockeApiMethodsList.DASHBOARD[7]
                        : APIUrl.createAPIURL(
                            apiStatus.DASHBOARD.isAPIReadyForhierarchyPopup
                                ? APIUrl.createDynamicURL(apiMethodsList.DASHBOARD[7], [])
                                : mockeApiMethodsList.DASHBOARD[7],
                            apiStatus.DASHBOARD.isAPIReadyForhierarchyPopup
                        )
                ) : HttpProtocols.post(
                    environment.isMockDataEnable
                        ? mockeApiMethodsList.DASHBOARD[7]
                        : APIUrl.createAPIURL(
                            apiStatus.DASHBOARD.isAPIReadyForhierarchyPopup
                                ? APIUrl.createDynamicURL(apiMethodsList.DASHBOARD[7], [])
                                : mockeApiMethodsList.DASHBOARD[7],
                            apiStatus.DASHBOARD.isAPIReadyForhierarchyPopup
                        ),
                    data
                )
            )
        return res
    }
}
