import React from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { AppStateType } from '../redux/redux-store';

const mapStateToProps = (state: AppStateType) => ({
    isAuth: state.auth.isAuth
})
type MapStatePropsType = ReturnType<typeof mapStateToProps>;
type BasePropsType = {
    isAuth: boolean
}
type InjectedPropsType = any;
export function withAuthNavigate<PropsType>(Component: React.ComponentType<PropsType>) {
    function NavigateComponent(props: BasePropsType & InjectedPropsType) {
        const {isAuth, ...restProps} = props;
        if (!props.isAuth) {
            return <Navigate replace to="/login" /> 
        } else { 
            return <Component {...restProps} /> 
        }
    }
    return connect<MapStatePropsType, {}, {}, AppStateType>( mapStateToProps, {} )(NavigateComponent);
}
