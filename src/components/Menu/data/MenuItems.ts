import { GroupIcon, PersonIcon, ForumIcon, PersonSearchIcon, ChatIcon, 
NewspaperIcon, LibraryMusicIcon, SettingsIcon, CollectionsIcon } from 'components';

export const menuItems = [
    { 
        id: 1,
        icon: GroupIcon,
        path: '/',
        name: 'Home'
    },
    { 
        id: 2,
        icon: PersonIcon,
        path: '/profile',
        name: 'Profile'
    },
    { 
        id: 3,
        icon: ForumIcon,
        path: '/users',
        name: 'Users'
    },
    { 
        id: 4,
        icon: PersonSearchIcon,
        path: '/dialogs',
        name: 'Messages'
    },
    { 
        id: 5,
        icon: ChatIcon,
        path: '/chat',
        name: 'Chat'
    },
    { 
        id: 6,
        icon: NewspaperIcon,
        path: '/news',
        name: 'News'
    },
    { 
        id: 8,
        icon: CollectionsIcon,
        path: '/gallery',
        name: 'Gallery'
    },
    { 
        id: 9,
        icon: LibraryMusicIcon,
        path: '/music',
        name: 'Music'
    },
    { 
        id: 10,
        icon: SettingsIcon,
        path: '/settings',
        name: 'Settings'
    }
];

type InferrdMenuItemsType<T> = T extends (infer U)[] ? U : never;
export type MenuItemType = InferrdMenuItemsType<typeof menuItems>;
