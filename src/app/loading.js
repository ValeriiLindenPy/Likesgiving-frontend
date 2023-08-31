
import Image from "next/image";

import loader from './assets/loader.gif'

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (

        <>
            <div className="loader-container">
                <Image className="loader" src={loader} width={167} height={138} alt="loading" />
            </div>
        </>

    );
}