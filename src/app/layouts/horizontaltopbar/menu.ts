import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
    {
        id: 1,
        label: 'MENUITEMS.MENU.TEXT',
    },
    {
        id: 2,
        label: 'MENUITEMS.DASHBOARDS.TEXT',
        icon: 'home',
        subItems: [],
        link: '/dashboard'
    },
    {
        id: 3,
        label: 'MENUITEMS.PROFILE',
        icon: 'profile',
        subItems: [],
        link: '/profile'
    },
    {
        id: 4,
        label: 'MENUITEMS.MY_PERFORMANCE',
        icon: 'myper',
        subItems: [],
        link: '/my_performance'
    },
    {
        id: 5,
        label: 'MENUITEMS.PLAY_ZONE',
        icon: 'playzone',
        subItems: [],
        link: '/play_zone'
    },
    {
        id: 6,
        label: 'MENUITEMS.REWARDS',
        icon: 'rewards',
        subItems: [],
        link: '/rewards'
    },
    {
        id: 7,
        label: 'MENUITEMS.SPECTATOR_VIEW',
        icon: 'spec',
        subItems: [],
        link: '/spectator_view'
    },
    {
        id: 8,
        label: 'MENUITEMS.GAME_SELECTION',
        icon: 'game',
        subItems: [],
        link: '/game_selection'
    },
    {
        id: 9,
        label: 'MENUITEMS.LEARNING',
        icon: 'learning',
        subItems: [
            {
                id: 10,
                label: 'MENUITEMS.LEARNING_ACADEMY',
                link: '/learning_academy',
                parentId: 9
            },
        ]
    },
    {
        id: 11,
        label: 'MENUITEMS.CHALLENGE_ZONE',
        icon: 'chalenge',
        subItems: [
            {
                id: 12,
                label: 'MENUITEMS.CHAMPIONS_LEAGUE',
                link: '/champions_league',
                parentId: 11
            },
        ]
    },
    {
        id: 13,
        label: 'MENUITEMS.ABOUT_US',
        icon: 'aboutus',
        subItems: []
    },
    {
        id: 14,
        label: 'MENUITEMS.LOG_OUT',
        icon: 'logout',
        subItems: []
    }

];

