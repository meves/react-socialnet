import usersReducer, { InitialStateType, actions } from "./users-reducer";

let state: InitialStateType;
beforeEach(() => {
    state = {
        users: [
            {id: 0, name: "Sergey", status: "my status", followed: false, photos: {small: null, large: null}},
            {id: 1, name: "Leo", status: "my status", followed: false, photos: {small: null, large: null}},
            {id: 2, name: "Kevin", status: "my status", followed: true, photos: {small: null, large: null}},
            {id: 3, name: "Liza", status: "my status", followed: true, photos: {small: null, large: null}}
        ],
        pageSize: 5,
        totalUsersCount: 0,
        currentPage: 1,
        blockSize: 20,
        isFetching: false,
        followingInProgress: []
    }
});

describe("usersReducer", () => {
    test("case follow", () => {
        const userId: number = 0;
        const newState = usersReducer(state, actions.follow(userId));
        expect(newState.users[0].followed).toBeTruthy();
        expect(newState.users[1].followed).toBeFalsy();
    });
    test("case unfollow", () => {
        const userId: number = 2;
        const newState = usersReducer(state, actions.unfollow(userId));
        expect(newState.users[2].followed).toBeFalsy();
        expect(newState.users[3].followed).toBeTruthy();
    });
});
describe("action creators", () => {
    test("follow", () => {
        const userId: number = 0;
        const requiredAction = { type: "FOLLOW", userId } as const;
        const newAction = actions.follow(userId);
        expect(newAction).toEqual(requiredAction);
    });
    test("unfollow", () => {
        const userId: number = 0;
        const requiredAction = { type: "UNFOLLOW", userId } as const;
        const newAction = actions.unfollow(userId);
        expect(newAction).toEqual(requiredAction);
    });
});
