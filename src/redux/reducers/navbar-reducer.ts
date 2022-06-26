import { InferActionsTypes, ThunkActionType } from "redux/store";
import { usersAPI } from "shared/api/users-api";
import { FriendType } from "types/types";


const initialState = {    
    friends: [] as Array<FriendType>
}
type InitialStateType = typeof initialState
type ActionsTypes = InferActionsTypes<typeof actions>;

const navbarReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch(action.type) {
        case 'SET_FRIENDS':
            return {
                ...state,
                friends: [...action.payload.friends]
            }
        default:
            return state;
    }
}

export const actions = {
    setFriends: (friends: Array<FriendType>) => ({
        type: 'SET_FRIENDS', payload: { friends }
    } as const)
}


type ThunkType = ThunkActionType<ActionsTypes>;

export const getFriends = (count: number, page: number, friend: boolean): ThunkType => 
    async (dispatch) => {
        const response = await usersAPI.getFriends(count, page, friend);
        if (response.status === 200) {
            dispatch(actions.setFriends(response.data.items));
        } else {
            console.log(`Error: ${response.statusText}`);            
        }
    } 


export default navbarReducer;

