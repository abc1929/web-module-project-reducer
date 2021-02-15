import React from "react";

const CalcButton = (props) => {
   const {
      value,
      type,
      payload = props.payload ? props.payload : value,
      dispatch,
      onClick = props.onClick
         ? props.onClick
         : () => {
              dispatch({ type: type, payload: payload });
           },
      size = 4,
   } = props;

   return (
      <div className={`col-xs-${size}`}>
         <button type="button" onClick={onClick} className="btn">
            {value}
         </button>
      </div>
   );
};

export default CalcButton;
