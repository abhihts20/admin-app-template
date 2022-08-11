import {authConstants} from "../Types/types";

const initialState = {
    token:'',
    user:{
        email:'',
        firstName:'',
        lastName:'',
        fullName:'',
        picture:'',
        mobile:''
    },
    authenticate:false,
    authenticating:false,
    loading:false,
    error:null,
    message:''
};

export default (state=initialState,action) => {
    switch (action.type){
        case authConstants.LOGIN_REQUEST:
            state={
                ...state,authenticating:true,loading:true
            };
            break;
        case authConstants.LOGIN_SUCCESS:
            state = {
                ...state,
                user:action.payload.user,
                token:action.payload.token,
                authenticating:false,
                loading:false,
                authenticate: true
            };
            break;
        case authConstants.LOGIN_FAILURE:
            state={
                ...state,
                loading: false,
                authenticate: false,
                authenticating:false,
                error:action.payload.error,
                message:action.payload.message
            };
            break;
        case authConstants.LOGOUT_REQUEST:
            state = {
                ...state,
                loading: true
            };
            break;
        case authConstants.LOGOUT_SUCCESS:
            state = {
                ...initialState
            };
            break;
        case authConstants.LOGOUT_FAILURE:
            state = {
                ...state,
                error: action.payload.error,
                loading: false
            };
            break;
    }
    return state;
}
