import React from 'react'
import Lottie from 'react-lottie';
import LoaderAnimation from '../media/animations/Loader.json';

const Loader = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: LoaderAnimation,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    return (
        <div style={{ margin: -70 }}>
            <Lottie
                style={{}}
                options={defaultOptions}
                height='100%'
                width={310}
            />
        </div>
    )
}

export default Loader
