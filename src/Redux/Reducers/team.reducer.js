import {teamConstants} from "../Types/types";

const initialState = {
    name:'',
    email:'',
    mobile:'',
    profilePicture:{},
    socialLinks:{
        website:'',
        gmail:'',
        linkedin:''
    },
    designation:'',
    loading:false,
    error:null,
    message:''
}

export default (state=initialState,action) => {
    switch (action.type){
        case teamConstants.TEAM_CREATE_REQUEST:
            state={
                ...state,
                loading: true
            }
            break;
        case teamConstants.TEAM_CREATE_SUCCESS:
            console.log("ACIONNN",action);
            state={
                ...state,
                name:action.payload.name,
                email:action.payload.email,
                mobile:action.payload.mobile,
                socialLinks: action.payload.socialLinks,
                designation: action.payload.designation,
                loading: false
            }
            break;
        case teamConstants.TEAM_CREATE_FAILURE:
            state={
                ...state,
                error:action.payload.err,
                loading: false
            }
            break;

    }
    return state;
}
