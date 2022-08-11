import React from 'react';
import {useField} from "formik";
import './input.style.scss'

const TextInputArea = ({label, ...props}) => {
    const [field, meta] = useField(props);
    return (
        <>
            <div className="form-group">
                <label htmlFor={props.id || props.name}>{label}</label>
                <textarea className="text-input form-control " {...field} {...props}/>
                {meta.touched && meta.error ? (
                    <div className="error text-danger" style={{fontSize:'85%'}}>{meta.error}</div>
                ) : null}
            </div>
        </>
    )
}

export default TextInputArea
