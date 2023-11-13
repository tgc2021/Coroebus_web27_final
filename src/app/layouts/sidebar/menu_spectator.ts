import { MenuItem } from './menu.model';

export const MENU_SPECTATOR: MenuItem[] = [
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
        link: '/spectator/spectatorView',
       
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
        id: 9,
        label: 'MENUITEMS.GAME_SELECTION',
        icon: 'game',
        badge: {
        },
        subItems: [],
        link: 'account/theme/selection' ,
        link1: 'account/theme/selection',
        link2: 'account/theme/selection' 


        
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

