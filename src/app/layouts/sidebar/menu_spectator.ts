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
        id: 14,
        label: 'MENUITEMS.ABOUT_US',
        icon: 'aboutus',
        badge: {
        },
        subItems: []    ,
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

