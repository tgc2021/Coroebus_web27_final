//  const api_path='/coroebus-beta-api-levels'
const api_path='/coroebus-tgc-api-levels'
export const apiMethodsList = {
    AUTHENTICATE: [
        api_path+'/authenticate/access_token', // 0 POST { "USERID": "l4WbceDSYnGzmGmtTpbDOQ==", "PASSWORD": "9QVjcHyu0OY8aIHAOXiiBg=="}
        api_path+'/authenticate/get_games', // 1 POST {"userid":"GOLD015","id_theme":"5"} 
        api_path+'/authenticate/get_themes', // 2 POST {"userid":"GOLD015"}
        api_path+'/forgotPassword/checkUserID', // 3 POST {"userid": "Gold015"}
        api_path+'/forgotPassword/checkSecurityAnswer', // 4 POST {"userid":"Gold015","questions":[{"id_security_question":"1","fp_answer":"abcd"},{"id_security_question":"6","fp_answer":"abcd"}]}
        api_path+'/firstLogin/setSecurityQuestion', // 5 POST {"userid":"Gold015","questions":[{"id_security_question":"1","fp_answer":"abcd"},{"id_security_question":"6","fp_answer":"abcd"}]}
        api_path+'/authenticate/accept_terms', // 6 POST {_userid: "Gold015", "_termsid": '123', _dateTime: 'date'}
        api_path+'/firstLogin/updatePassword', // 7 POST {"userid":"l4WbceDSYnGzmGmtTpbDOQ==", "password": "9QVjcHyu0OY8aIHAOXiiBg=="}
    ],
    DASHBOARD: [
        api_path+'/dashboard/produce_1', // 0 POST {"_userid":"GOLD015","_game":"197","_section_view":"1","page_number":"1"}
        api_path+'/dashboard/produce_1', // 1 POST {"_userid":"GOLD015","_game":"197","_section_view":"2","page_number":"1"}
        api_path+'/dashboard/produce_1', // 2 POST {"_userid":"GOLD015","_game":"197","_section_view":"3","page_number":"1"}
        api_path+'/Dashboard/add_ins', // 3 POST {"_userid":"GOLD015","_game":"197"}
        api_path+'/dashboard/spect_search_1', // 4 POST {"_userid":"GOLD015","_game":"98","page_number":1,"_uname":"p2","_order":1}
        api_path+'/Dashboard/levels_buckets', // 5 POST {"_game":"98","_role":"6"}
        api_path+'/Poke/add_poke', // 6 POST {"_userid":"GOLD015","_team":"359","_game":"98","_id_user_poked":"53312","_pokeid":"4"}
        api_path+'/dashboard/levels', // 7 POST {"_userid":"GOLD015","_game":"197"}
    ],
    Notification: [
        api_path+'/Notification/notification_status', // 0 POST {"_userid":"GOLD015","_game":"197"}
        api_path+'/Notification/notification_list', // 1 POST {"_userid":"GOLD015","_game":"197"}
        api_path+'/Notification/notification_update', // 2 POST {"_notificationid":"123"}
    ],
    PROFILE: [
        api_path+'/EditProfile/profile', // 0 POST { "_userid": this.userObj?.USERID, "_cdorganization": this.userObj?.cd_coroebus_organization, "_cduser": this.userObj?.cd_coroebus_user, "_iduser": this.userObj?.id_coroebus_user, "_team": this.userObj?.id_coroebus_team || 0, "_game": this.userObj?.id_coroebus_game || 0, "updated": { "profile_logo": this.croppedImage, "first_name": this.userObj?.first_name, }, }
    ],
    PERFORMANCE: [
        api_path+'/Myperformance/points_list', // 0 POST {"_userid":"GOLD031","_game":"98"}
        api_path+'/myperformance/produce', // 1 POST {"_userid":"GOLD007","_team":"617","_game":"197"}
    ]
   
}    
