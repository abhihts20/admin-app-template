import React from 'react';
import {useField} from "formik";
import './input.style.scss';

const TextInput = ({label, ...props}) => {
    const [field, meta] = useField(props);
    return (
        <>
            <div className="form-group">
                <label className="font-weight-bold" htmlFor={props.id || props.name}>{label}</label>
                <input className="form-control shadow-sm px-4" {...field} {...props}/>
                {meta.touched && meta.error ? (
                    <div className="error text-danger" style={{fontSize:'85%'}}>{meta.error}</div>
                ) : null}
            </div>
        </>
    )
};

export default TextInput
