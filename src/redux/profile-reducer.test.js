import profileReducer, { addPost, deletePost } from "./profile-reducer";



describe('profileReducer', () => {
    const initialState = {    
        posts: [
            {id: 1, message: '"Hi, how are you?', likesCount: 15},
            {id: 2, message: 'It\'s my first post', likesCount: 5},
            {id: 3, message: 'Send me your messages', likesCount: 0},
            {id: 4, message: 'Nice to meet you, friends', likesCount: 20}
        ]  
    }
    const message = 'Hi there, it is a new post';
    test('addPost', () => {
        const action = addPost(message);
        const newState = profileReducer(initialState, action);
        const newPost = {id: 5, message: message, likesCount: 7};
        expect(newState.posts.length).toBe(5);
        expect(newState.posts[4]).toEqual(newPost);
    });
    test('deletePost', () => {
        const action = deletePost(4);
        const newState = profileReducer(initialState, action);
        expect(newState.posts.length).toBe(3);
    });
    test('do not delete post with wrong id', () => {
        const action = deletePost(100);
        const newState = profileReducer(initialState, action);
        expect(newState.posts.length).toBe(4);
    });
});
