import React, { Suspense } from "react";
import Preloader from "../components/common/Preloader/Preloader";

type InjectedProps = any;

export function withSuspense<PropsType>(Component: React.ComponentType<PropsType>) {
    function SuspenseComponent(props: InjectedProps) {
        return (
            <div>
                <Suspense fallback={<div><Preloader/></div>}>
                    <Component {...props as PropsType}/>
                </Suspense>
            </div>
        )
    } 
    return <SuspenseComponent/>;
}
