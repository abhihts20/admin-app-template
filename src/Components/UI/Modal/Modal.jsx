import React, {useState} from 'react';
import './modal.style.scss'
import ReactDOM from 'react-dom'

const Modal = (props) => {

    const handleClose = () => {
        props.setIsShowing(!props.isShowing);
    }

    if (props.isShowing) {
        return ReactDOM.createPortal(<>
            <div className="modal" style={{display: 'block'}}>
                <div className="modal-dialog modal-lg modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{props.title}</h5>
                            <button type="button" className="btn close-btn" data-bs-dismiss="modal"
                                    aria-label="Close" onClick={handleClose}>X
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>{props.children}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>, document.querySelector("#modal-root"));
    } else return null
};

export default Modal;
