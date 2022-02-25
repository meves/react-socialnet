import { actions, followUser, unfollowUser } from "./users-reducer";
import { followAPI } from "../api/followAPI";
import { ResponseDataType } from "../api/types";
import { ResultCodes } from "../enums/responseCodes";

jest.mock("../api/followAPI");
const followAPIMock = followAPI as jest.Mocked<typeof followAPI>;

const dispatchMock = jest.fn();
const getStateMock = jest.fn();

const result: ResponseDataType = {
    data: {},
    messages: [],
    resultCode: ResultCodes.Success
}

beforeEach(() => {
    dispatchMock.mockClear();
    getStateMock.mockClear();
});

describe("thunk user-reducer test", () => {
    test("followUser", async () => {
        const userId: number = 1;
        followAPIMock.followUser.mockReturnValue(Promise.resolve(result));
        const thunkAction = followUser(userId);
        await thunkAction(dispatchMock, getStateMock, {});
        expect(dispatchMock).toBeCalledTimes(3);
        expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingInProgress(true, userId));
        expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.follow(userId));
        expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingInProgress(false, userId));
    });
    test("unfollowUser", async () => {
        const userId: number = 1;
        followAPIMock.unfollowUser.mockReturnValue(Promise.resolve(result));
        const thunkAction = unfollowUser(userId);
        await thunkAction(dispatchMock, getStateMock, {});
        expect(dispatchMock).toBeCalledTimes(3);
        expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingInProgress(true, userId));
        expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.unfollow(userId));
        expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingInProgress(false, userId));
    });
});
