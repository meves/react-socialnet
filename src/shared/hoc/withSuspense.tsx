import React, { Suspense } from "react";

import { Loading } from "components/Preloader";

type InjectedProps = any;

export function withSuspense<PropsType extends JSX.IntrinsicAttributes>(Component: React.ComponentType<PropsType>) {
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
