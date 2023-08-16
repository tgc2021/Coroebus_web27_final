export const apiMethodsList = {
    // AUTHENTICATE: [
    //     '/coroebus-beta-api-levels/authenticate/access_token', // 0 POST { "USERID": "l4WbceDSYnGzmGmtTpbDOQ==", "PASSWORD": "9QVjcHyu0OY8aIHAOXiiBg=="}
    //     '/coroebus-beta-api-levels/authenticate/get_games', // 1 POST {"userid":"GOLD015","id_theme":"5"} 
    //     '/coroebus-beta-api-levels/authenticate/get_themes', // 2 POST {"userid":"GOLD015"}
    //     '/coroebus-beta-api-levels/forgotPassword/checkUserID', // 3 POST {"userid": "Gold015"}
    //     '/coroebus-beta-api-levels/forgotPassword/checkSecurityAnswer', // 4 POST {"userid":"Gold015","questions":[{"id_security_question":"1","fp_answer":"abcd"},{"id_security_question":"6","fp_answer":"abcd"}]}
    //     '/coroebus-beta-api-levels/firstLogin/setSecurityQuestion', // 5 POST {"userid":"Gold015","questions":[{"id_security_question":"1","fp_answer":"abcd"},{"id_security_question":"6","fp_answer":"abcd"}]}
    //     '/coroebus-beta-api-levels/authenticate/accept_terms', // 6 POST {_userid: "Gold015", "_termsid": '123', _dateTime: 'date'}
    //     '/coroebus-beta-api-levels/firstLogin/updatePassword', // 7 POST {"userid":"l4WbceDSYnGzmGmtTpbDOQ==", "password": "9QVjcHyu0OY8aIHAOXiiBg=="}
    // ],
    // DASHBOARD: [

    //     '/coroebus-beta-api-levels/dashboard/produce_1', // 0 POST {"_userid":"GOLD015","_game":"197","_section_view":"1","page_number":"1"}
    //     '/coroebus-beta-api-levels/dashboard/produce_1', // 1 POST {"_userid":"GOLD015","_game":"197","_section_view":"2","page_number":"1"}
    //     '/coroebus-beta-api-levels/dashboard/produce_1', // 2 POST {"_userid":"GOLD015","_game":"197","_section_view":"3","page_number":"1"}
    //     '/coroebus-beta-api-levels/Dashboard/add_ins', // 3 POST {"_userid":"GOLD015","_game":"197"}
    //     '/coroebus-beta-api-levels/dashboard/spect_search_1', // 4 POST {"_userid":"GOLD015","_game":"98","page_number":1,"_uname":"p2","_order":1}
    //     '/coroebus-beta-api-levels/Dashboard/levels_buckets', // 5 POST {"_game":"98","_role":"6"}
    //     '/coroebus-beta-api-levels/Poke/add_poke', // 6 POST {"_userid":"GOLD015","_team":"359","_game":"98","_id_user_poked":"53312","_pokeid":"4"}
    //     '/coroebus-beta-api-levels/dashboard/levels', // 7 POST {"_userid":"GOLD015","_game":"197"}
    // ],
    // Notification: [
    //     '/coroebus-beta-api-levels/Notification/notification_status', // 0 POST {"_userid":"GOLD015","_game":"197"}
    //     '/coroebus-beta-api-levels/Notification/notification_list', // 1 POST {"_userid":"GOLD015","_game":"197"}
    //     '/coroebus-beta-api-levels/Notification/notification_update', // 2 POST {"_notificationid":"123"}
    // ],
    // PROFILE: [
    //     '/coroebus-beta-api-levels/EditProfile/profile', // 0 POST { "_userid": this.userObj?.USERID, "_cdorganization": this.userObj?.cd_coroebus_organization, "_cduser": this.userObj?.cd_coroebus_user, "_iduser": this.userObj?.id_coroebus_user, "_team": this.userObj?.id_coroebus_team || 0, "_game": this.userObj?.id_coroebus_game || 0, "updated": { "profile_logo": this.croppedImage, "first_name": this.userObj?.first_name, }, }
    // ],
    // PERFORMANCE: [
    //     '/coroebus-beta-api-levels/Myperformance/points_list', // 0 POST {"_userid":"GOLD031","_game":"98"}
    //     '/coroebus-beta-api-levels/myperformance/produce', // 1 POST {"_userid":"GOLD007","_team":"617","_game":"197"}
    // ]



    // AUTHENTICATE: [
    //     '/coroebus-beta-api-levels-new/authenticate/access_token', // 0 POST { "USERID": "l4WbceDSYnGzmGmtTpbDOQ==", "PASSWORD": "9QVjcHyu0OY8aIHAOXiiBg=="}
    //     '/coroebus-beta-api-levels-new/authenticate/get_games', // 1 POST {"userid":"GOLD015","id_theme":"5"} 
    //     '/coroebus-beta-api-levels-new/authenticate/get_themes', // 2 POST {"userid":"GOLD015"}
    //     '/coroebus-beta-api-levels-new/forgotPassword/checkUserID', // 3 POST {"userid": "Gold015"}
    //     '/coroebus-beta-api-levels-new/forgotPassword/checkSecurityAnswer', // 4 POST {"userid":"Gold015","questions":[{"id_security_question":"1","fp_answer":"abcd"},{"id_security_question":"6","fp_answer":"abcd"}]}
    //     '/coroebus-beta-api-levels-new/firstLogin/setSecurityQuestion', // 5 POST {"userid":"Gold015","questions":[{"id_security_question":"1","fp_answer":"abcd"},{"id_security_question":"6","fp_answer":"abcd"}]}
    //     '/coroebus-beta-api-levels-new/authenticate/accept_terms', // 6 POST {_userid: "Gold015", "_termsid": '123', _dateTime: 'date'}
    //     '/coroebus-beta-api-levels-new/firstLogin/updatePassword', // 7 POST {"userid":"l4WbceDSYnGzmGmtTpbDOQ==", "password": "9QVjcHyu0OY8aIHAOXiiBg=="}
    // ],
    // DASHBOARD: [
    //     '/coroebus-beta-api-levels-new/dashboard/produce_1', // 0 POST {"_userid":"GOLD015","_game":"197","_section_view":"1","page_number":"1"}
    //     '/coroebus-beta-api-levels-new/dashboard/produce_1', // 1 POST {"_userid":"GOLD015","_game":"197","_section_view":"2","page_number":"1"}
    //     '/coroebus-beta-api-levels-new/dashboard/produce_1', // 2 POST {"_userid":"GOLD015","_game":"197","_section_view":"3","page_number":"1"}
    //     '/coroebus-beta-api-levels-new/Dashboard/add_ins', // 3 POST {"_userid":"GOLD015","_game":"197"}
    //     '/coroebus-beta-api-levels-new/dashboard/spect_search_1', // 4 POST {"_userid":"GOLD015","_game":"98","page_number":1,"_uname":"p2","_order":1}
    //     '/coroebus-beta-api-levels-new/Dashboard/levels_buckets', // 5 POST {"_game":"98","_role":"6"}
    //     '/coroebus-beta-api-levels-new/Poke/add_poke', // 6 POST {"_userid":"GOLD015","_team":"359","_game":"98","_id_user_poked":"53312","_pokeid":"4"}
    //     '/coroebus-beta-api-levels-new/dashboard/levels', // 7 POST {"_userid":"GOLD015","_game":"197"}
    // ],
    // Notification: [
    //     '/coroebus-beta-api-levels-new/Notification/notification_status', // 0 POST {"_userid":"GOLD015","_game":"197"}
    //     '/coroebus-beta-api-levels-new/Notification/notification_list', // 1 POST {"_userid":"GOLD015","_game":"197"}
    //     '/coroebus-beta-api-levels-new/Notification/notification_update', // 2 POST {"_notificationid":"123"}
    // ],
    // PROFILE: [
    //     '/coroebus-beta-api-levels-new/EditProfile/profile', // 0 POST { "_userid": this.userObj?.USERID, "_cdorganization": this.userObj?.cd_coroebus_organization, "_cduser": this.userObj?.cd_coroebus_user, "_iduser": this.userObj?.id_coroebus_user, "_team": this.userObj?.id_coroebus_team || 0, "_game": this.userObj?.id_coroebus_game || 0, "updated": { "profile_logo": this.croppedImage, "first_name": this.userObj?.first_name, }, }
    // ],
    // PERFORMANCE: [
    //     '/coroebus-beta-api-levels-new/Myperformance/points_list', // 0 POST {"_userid":"GOLD031","_game":"98"}
    //     '/coroebus-beta-api-levels-new/myperformance/produce', // 1 POST {"_userid":"GOLD007","_team":"617","_game":"197"}
    // ]

    // Production Url
    AUTHENTICATE: [
        '/coroebus-tgc-api-levels/authenticate/access_token', // 0 POST { "USERID": "l4WbceDSYnGzmGmtTpbDOQ==", "PASSWORD": "9QVjcHyu0OY8aIHAOXiiBg=="}
        '/coroebus-tgc-api-levels/authenticate/get_games', // 1 POST {"userid":"GOLD015","id_theme":"5"} 
        '/coroebus-tgc-api-levels/authenticate/get_themes', // 2 POST {"userid":"GOLD015"}
        '/coroebus-tgc-api-levels/forgotPassword/checkUserID', // 3 POST {"userid": "Gold015"}
        '/coroebus-tgc-api-levels/forgotPassword/checkSecurityAnswer', // 4 POST {"userid":"Gold015","questions":[{"id_security_question":"1","fp_answer":"abcd"},{"id_security_question":"6","fp_answer":"abcd"}]}
        '/coroebus-tgc-api-levels/firstLogin/setSecurityQuestion', // 5 POST {"userid":"Gold015","questions":[{"id_security_question":"1","fp_answer":"abcd"},{"id_security_question":"6","fp_answer":"abcd"}]}
        '/coroebus-tgc-api-levels/authenticate/accept_terms', // 6 POST {_userid: "Gold015", "_termsid": '123', _dateTime: 'date'}
        '/coroebus-tgc-api-levels/firstLogin/updatePassword', // 7 POST {"userid":"l4WbceDSYnGzmGmtTpbDOQ==", "password": "9QVjcHyu0OY8aIHAOXiiBg=="}
    ],
    DASHBOARD: [
        '/coroebus-tgc-api-levels/dashboard/produce_1', // 0 POST {"_userid":"GOLD015","_game":"197","_section_view":"1","page_number":"1"}
        '/coroebus-tgc-api-levels/dashboard/produce_1', // 1 POST {"_userid":"GOLD015","_game":"197","_section_view":"2","page_number":"1"}
        '/coroebus-tgc-api-levels/dashboard/produce_1', // 2 POST {"_userid":"GOLD015","_game":"197","_section_view":"3","page_number":"1"}
        '/coroebus-tgc-api-levels/Dashboard/add_ins', // 3 POST {"_userid":"GOLD015","_game":"197"}
        '/coroebus-tgc-api-levels/dashboard/spect_search_1', // 4 POST {"_userid":"GOLD015","_game":"98","page_number":1,"_uname":"p2","_order":1}
        '/coroebus-tgc-api-levels/Dashboard/levels_buckets', // 5 POST {"_game":"98","_role":"6"}
        '/coroebus-tgc-api-levels/Poke/add_poke', // 6 POST {"_userid":"GOLD015","_team":"359","_game":"98","_id_user_poked":"53312","_pokeid":"4"}
        '/coroebus-tgc-api-levels/dashboard/levels', // 7 POST {"_userid":"GOLD015","_game":"197"}
        '/coroebus-tgc-api-levels/dashboard/produce_12', // 8 POST {"_userid":"GOLD015","_game":"197","_section_view":"1","page_number":"1"}
        '/coroebus-tgc-api-levels/dashboard/produce_12', // 9 POST {"_userid":"GOLD015","_game":"197","_section_view":"1","page_number":"1"}

    ],
    Notification: [
        '/coroebus-tgc-api-levels/Notification/notification_status', // 0 POST {"_userid":"GOLD015","_game":"197"}
        '/coroebus-tgc-api-levels/Notification/notification_list', // 1 POST {"_userid":"GOLD015","_game":"197"}
        '/coroebus-tgc-api-levels/Notification/notification_update', // 2 POST {"_notificationid":"123"}
    ],
    PROFILE: [
        '/coroebus-tgc-api-levels/EditProfile/profile', // 0 POST { "_userid": this.userObj?.USERID, "_cdorganization": this.userObj?.cd_coroebus_organization, "_cduser": this.userObj?.cd_coroebus_user, "_iduser": this.userObj?.id_coroebus_user, "_team": this.userObj?.id_coroebus_team || 0, "_game": this.userObj?.id_coroebus_game || 0, "updated": { "profile_logo": this.croppedImage, "first_name": this.userObj?.first_name, }, }
    ],
    PERFORMANCE: [
        '/coroebus-tgc-api-levels/Myperformance/points_list', // 0 POST {"_userid":"GOLD031","_game":"98"}
        '/coroebus-tgc-api-levels/Myperformance/produce', // 1 POST {"_userid":"GOLD007","_team":"617","_game":"197"}
    ]
}   
