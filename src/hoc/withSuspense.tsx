import React, { Suspense } from "react";

import { Loading } from "components/common/Preloader";

type InjectedProps = any;

export function withSuspense<PropsType>(Component: React.ComponentType<PropsType>) {
    function SuspenseComponent(props: InjectedProps) {
        return (
            <div>
                <Suspense fallback={<div><Loading/></div>}>
                    <Component {...props as PropsType}/>
                </Suspense>
            </div>
        )
    } 
    return <SuspenseComponent/>;
}
