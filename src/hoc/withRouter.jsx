import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

export const withRouter = (Component) => {
    const Wrapper = props => {
        const location = useLocation();
        const navigate = useNavigate();
        const params = useParams();
        return <Component {...props} location={location} navigate={navigate} params={params} />
    }
    return Wrapper;
}
