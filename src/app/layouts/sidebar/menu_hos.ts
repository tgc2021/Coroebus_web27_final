import { MenuItem } from './menu.model';

export const MENU_HOS: MenuItem[] = [
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
        link: '/topdashboard',
       
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

