import profileReducer, { actions, initialState } from "../profile-reducer";

const { addPost, deletePost } = actions;

describe('profileReducer', () => {
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
