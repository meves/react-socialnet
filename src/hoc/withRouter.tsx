import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

type InjectedPropsType = any;

export function withRouter<PropsType>(Component: React.ComponentType<PropsType>) {
    function Wrapper(props: InjectedPropsType) {
        const location = useLocation();
        const navigate = useNavigate();
        const params = useParams();
        return <Component {...props as InjectedPropsType} location={location} navigate={navigate} params={params} />
    }
    return Wrapper;
}
