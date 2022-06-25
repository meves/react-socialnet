export const accordionDescriptionData = [
    {
        id: 1,
        pageName: 'Profile',
        shortDescription: 'A page of individual user profile',
        fullDescription: 'On profile page you can edit your profile, post your social net links and save or reset changes. You also can post a message.'
    },
    {
        id: 2,
        pageName: 'Users',
        shortDescription: 'A page of registered users with pagination',
        fullDescription: 'On users page you can see general information about users and navigate the page using pagination. You can add user to your friends or remove him from friends. Using the search form, you can find users by criteria: username, whether he is your friend or not.'
    },
    {
        id: 3,
        pageName: 'Messages',
        shortDescription: 'A message page of selected users',
        fullDescription: 'On message page you can see users, selected on user page and their messages.You can post your new message.'
    },
    {
        id: 4,
        pageName: 'Chat',
        shortDescription: 'Interactive chat for regitered users',
        fullDescription: 'On chat page you can see messages from users and post your short messages in interactive chat.'
    }
]

export type accordionDescriptionDataType = typeof accordionDescriptionData;
