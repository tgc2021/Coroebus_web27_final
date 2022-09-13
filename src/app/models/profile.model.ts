import { apiMethodsList } from '@app/helpers/api-methods-list'
import { mockeApiMethodsList } from '@app/helpers/mocke-api-methods-list'
import { HttpProtocols } from '@app/http/http.protocols'
import { environment } from '@env'
import { Model } from './model'
import { APIUrl } from '@app/helpers/api-url'
import { apiStatus } from '@app/helpers/api-status'


export class ProfileModel extends Model {
    constructor(obj: object) {
        super(obj)
    }
    /**
      * { "_userid": this.userObj?.USERID, "_cdorganization": this.userObj?.cd_coroebus_organization, "_cduser": this.userObj?.cd_coroebus_user, "_iduser": this.userObj?.id_coroebus_user, "_team": this.userObj?.id_coroebus_team || 0, "_game": this.userObj?.id_coroebus_game || 0, "updated": { "profile_logo": this.croppedImage, "first_name": this.userObj?.first_name, }, }
      */
    static async updateProfilePic(data: any) {
        // tslint:disable-next-line:one-variable-per-declaration
        let err: any,
            res: any // get from API
        [err, res] = await HttpProtocols.to(
            environment.isMockDataEnable ?
                HttpProtocols.get(
                    environment.isMockDataEnable
                        ? mockeApiMethodsList.PROFILE[0]
                        : APIUrl.createAPIURL(
                            apiStatus.PROFILE.isAPIReadyForUploadProfileImg
                                ? APIUrl.createDynamicURL(apiMethodsList.PROFILE[0], [])
                                : mockeApiMethodsList.PROFILE[0],
                            apiStatus.PROFILE.isAPIReadyForUploadProfileImg
                        )
                ) :
                HttpProtocols.post(
                    environment.isMockDataEnable
                        ? mockeApiMethodsList.PROFILE[0]
                        : APIUrl.createAPIURL(
                            apiStatus.PROFILE.isAPIReadyForUploadProfileImg
                                ? APIUrl.createDynamicURL(apiMethodsList.PROFILE[0], [])
                                : mockeApiMethodsList.PROFILE[0],
                            apiStatus.PROFILE.isAPIReadyForUploadProfileImg
                        ),
                    data
                )
        )
        return res
    }
}
