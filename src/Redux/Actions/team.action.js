import { teamConstants } from '../Types/types';
import axiosInstance from "../../Utils/axios";

export const createTeam = (team) => {
    return async (dispatch) => {
        console.log("TEAM",team)
        dispatch({type:teamConstants.TEAM_CREATE_REQUEST});

        const result = await axiosInstance.post('/team/createMember', team)
        if(result.status === 201){
            console.log("STATEDATA",result.data);
            dispatch({type:teamConstants.TEAM_CREATE_SUCCESS,payload:result.data})
        }else{
            if(result.status === 400){
                dispatch({type: teamConstants.TEAM_CREATE_FAILURE, err: result.data.error})
            }
        }
    }
}
