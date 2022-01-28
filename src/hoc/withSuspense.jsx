import React, { Suspense } from "react";
import Preloader from "../components/common/Preloader/Preloader";

export const withSuspense = Component => {
    const SuspenseComponent = props => {
        return (
            <div>
                <Suspense fallback={<div><Preloader/></div>}>
                    <Component {...props}/>
                </Suspense>
            </div>
        )
    } 
    return <SuspenseComponent/>;
}
