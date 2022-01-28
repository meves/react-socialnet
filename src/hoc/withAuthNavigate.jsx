import React from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';

const mapStateToProps = state => ({
    isAuth: state.auth.isAuth
})

export const withAuthNavigate = Component => {
    const NavigateComponent = props => {
        if (!props.isAuth) {
            return <Navigate replace to="/login" /> 
        } else { 
            return <Component {...props} /> 
        }
    }
    return connect(mapStateToProps, {})(NavigateComponent);
}
