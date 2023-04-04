import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
    {  
        id: 1,
        label: 'MENUITEMS.MENU.TEXT',
        isTitle: true
    },
    {
        id: 2,
        label: 'MENUITEMS.DASHBOARDS.TEXT',
        icon: 'home',
        badge: {
        },
        subItems: [],
        link: '/account/interactive-dashboard',
        link1: '/dashboard',
        link2:'/topdashboard'
    },
    {
        id: 3,
        label: 'MENUITEMS.PROFILE',
        icon: 'profile',
        badge: {
        },
        subItems: [],
        link: '/profile',
        link1: '/profile'

    },
    {
        id: 4,
        label: 'MENUITEMS.MY_PERFORMANCE',
        icon: 'myper',
        badge: {
        },
        subItems: [],
        link: '/performance/page',
        link1: '/performance/page'

    },
    {
        id: 5,
        label:  'MENUITEMS.PLAY_ZONE',
        icon: 'playzone',
        badge: {
        },
        subItems: [],
        link: '/playzone/play',
        link1: '/playzone/play'

    },
    {
        id: 6,
        label: 'Achievement Shelf',
        icon: 'playzone',
        badge: {
        },
        subItems: [],
        link: '/Achievement/AchievementShelf',
        link1: '/Achievement/AchievementShelf'

    },
    {
        id: 7,
        label: 'MENUITEMS.REWARDS',
        icon: 'rewards',
        badge: {
        },
        subItems: [],
        link: '/reward/rewardPoints',
        link1: '/reward/rewardPoints'

    },
    {
        id: 8,
        label: 'MENUITEMS.SPECTATOR_VIEW',
        icon: 'spec',
        badge: {
        },
        subItems: [],
        link: '/spectator/spectatorView',
        link1: '/spectator/spectatorView'

    },
    {   
        id: 9,
        label: 'MENUITEMS.GAME_SELECTION',
        icon: 'game',
        badge: {
        },
        subItems: [],
        link: 'account/theme/selection' ,
        link1: 'account/theme/selection' 

        
    },
    {
        id: 10,
        label:'MENUITEMS.LEARNING',
        icon: 'learning',
        subItems: [
            {
                id: 11,
                label: 'MENUITEMS.LEARNING_ACADEMY',
                link: '/learning/learningAcademy',
                link1: '/learning/learningAcademy',
                parentId: 10
            },
        ]
    },
    {
        id: 12,
        label: 'MENUITEMS.CHALLENGE_ZONE',
        icon: 'ChallengeZoneicon',
        subItems: [
            {
                id: 13,
                label: 'MENUITEMS.CHAMPIONS_LEAGUE',
                link: '/champions_league',
                link1: '/champions_league',
                parentId: 12
            },
        ]
    },
    {
        id: 14,
        label: 'MENUITEMS.ABOUT_US',
        icon: 'aboutus',
        badge: {
        },
        subItems: []    ,
        // link: '/spectator/spectatorView'

    }, 
  
    {
        id: 15,
        label: 'About Game',
        icon: 'Aboutgameicon',
        badge: {
        },
        subItems: [],
        // link: '/spectator/spectatorView'

    },

    {
        id: 16,
        label: 'MENUITEMS.LOG_OUT',
        icon: 'logout',
        badge: {
        },
        subItems: [],
     // link: '/spectator/spectatorView'

    }

];

