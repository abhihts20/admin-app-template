import React from 'react';
import './style.scss';
import loader from '../../Images/loader.gif'

const Loader = () => {
    return (
        <>
            <div className="overlay">
                <div className="overlay__inner">
                    <div className="overlay__content">
                        <span className="spinner">
                            <img className={"loader"} src={loader} alt={"loader"} />
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Loader;
