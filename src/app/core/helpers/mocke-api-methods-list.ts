export const mockeApiMethodsList = {
    AUTHENTICATE: [
        'assets/data/authenticate/access_token.json', // 0 POST { "USERID": "l4WbceDSYnGzmGmtTpbDOQ==", "PASSWORD": "9QVjcHyu0OY8aIHAOXiiBg=="}
        'assets/data/authenticate/get_games.json', // 1 POST {"userid":"GOLD015","id_theme":"5"} 
        'assets/data/authenticate/get_themes.json', // 2 POST {"userid":"GOLD015"}
        'assets/data/authenticate/checkUserID.json', // 3 POST {"userid": "Gold015"}
        'assets/data/authenticate/checkSecurityAnswer.json', // 4 POST {"userid":"Gold015","questions":[{"id_security_question":"1","fp_answer":"abcd"},{"id_security_question":"6","fp_answer":"abcd"}]}
        'assets/data/authenticate/setSecurityQuestion.json', // 5 POST {"userid":"Gold015","questions":[{"id_security_question":"1","fp_answer":"abcd"},{"id_security_question":"6","fp_answer":"abcd"}]}
        'assets/data/authenticate/accept_terms.json', // 6 POST {_userid: "Gold015", "_termsid": '123', _dateTime: 'date'}
        'assets/data/authenticate/updatePassword.json', // 7 POST {"userid":"l4WbceDSYnGzmGmtTpbDOQ==", "password": "9QVjcHyu0OY8aIHAOXiiBg=="}
    ],
    DASHBOARD: [
        'assets/data/dashboard/produce1.json', // 0 POST {"_userid":"GOLD015","_game":"197","_section_view":"1","page_number":"1"}
        'assets/data/dashboard/produce2.json', // 1 POST {"_userid":"GOLD015","_game":"197","_section_view":"2","page_number":"1"}
        'assets/data/dashboard/produce3.json', // 2 POST {"_userid":"GOLD015","_game":"197","_section_view":"3","page_number":"1"}
        'assets/data/dashboard/add_ins.json', // 3 POST {"_userid":"GOLD015","_game":"197"}
        'assets/data/dashboard/spect_search.json', // 4 POST {"_userid":"GOLD015","_game":"98","page_number":1,"_uname":"p2","_order":1}
        'assets/data/dashboard/levels_buckets.json', // 5 POST {"_game":"98","_role":"6"}
        'assets/data/dashboard/add_poke.json', // 6 POST {"_userid":"GOLD015","_team":"359","_game":"98","_id_user_poked":"53312","_pokeid":"4"}
        'assets/data/dashboard/dashboard-hierarchy-popup.json', // 6 POST {"_userid":"GOLD015","_team":"359","_game":"98","_id_user_poked":"53312","_pokeid":"4"}
    ],
    Notification: [
        'assets/data/notification/notification_status.json', // 0 POST {"_userid":"GOLD015","_game":"197"}
        'assets/data/notification/notification_list.json', // 1 POST {"_userid":"GOLD015","_game":"197"}
        'assets/data/notification/notification_update.json', // 2 POST {"_notificationid":"123"}
    ],
    PROFILE: [
        'assets/data/profile/profile.json', // 0 POST { "_userid": this.userObj?.USERID, "_cdorganization": this.userObj?.cd_coroebus_organization, "_cduser": this.userObj?.cd_coroebus_user, "_iduser": this.userObj?.id_coroebus_user, "_team": this.userObj?.id_coroebus_team || 0, "_game": this.userObj?.id_coroebus_game || 0, "updated": { "profile_logo": this.croppedImage, "first_name": this.userObj?.first_name, }, }
    ],
    PERFORMANCE: [
        'assets/data/performance/points_list.json', // 0 POST {"_userid":"GOLD031","_game":"98"}
        'assets/data/performance/produce.json', // 1 POST {"_userid":"GOLD007","_team":"617","_game":"197"}
    ]
}