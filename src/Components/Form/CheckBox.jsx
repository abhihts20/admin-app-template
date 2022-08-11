import React from 'react';
import {useField} from "formik";
import './input.style.scss'

const CheckBox = ({ children, ...props }) => {

    const [field, meta] = useField({ ...props, type: 'checkbox' });
    return (
        <div className="form-group">
            <label className="checkbox">
                <input type="checkbox" {...field} {...props} />
                {children}
            </label>
            {meta.touched && meta.error ? (
                <div className="error text-danger" style={{fontSize:'85%'}}>{meta.error}</div>
            ) : null}
        </div>
    );
};

export default CheckBox
