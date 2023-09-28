
import Image from "next/image";

import loader from '../app/assets/loader.gif'

export default function Loader({ width, height, sm = false }) {


    return (

        <>
            {sm ? <div className="loaderPost">
                <Image className="loaderPostItem" src={loader} width={width} height={height} alt="loading" />
            </div> : <div className="loader-container">
                <Image className="loader" src={loader} width={width} height={height} alt="loading" />
            </div>}
        </>

    );
}