import React from 'react';
import './toggler.style.scss';

const Toggle = ({ checked, onChange }) => (
  //   <span className="toggle-control">
  //   <input
  //       className="dmcheck"
  //       type="checkbox"
  //       checked={checked}
  //       onChange={onChange}
  //       id="dmcheck"
  //   />
  //   <label htmlFor="dmcheck"/>
  // </span>
    <div className="outer-wrapper">
        <div className="wrapper">
            <input type="checkbox"
                   name="checkbox"
                   checked={checked}
                   onChange={onChange}
                   className="switch"/>
        </div>
    </div>
);

export default Toggle;
