import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Currency = () => {
  const { dispatch } = useContext(AppContext);

  const changeCurrency = (val) => {
    dispatch({
      type: "CHG_CURRENCY",
      payload: val,
    });
  };

  return (
    <div className="alert alert-secondary d-flex flex-md-row">
      <span>Currency</span>
        <select
          className="form-select form-select-sm mx-lg-2  w-75"
          name="Currency"
          id="Currency"
          onChange={(event) => changeCurrency(event.target.value)}
        >
        

            <option defaultValue value="£">£ Pound</option>
            <option value="$">$ Dollar</option>
            <option value="€">€ Euro</option>
            <option value="₹">₹ Ruppee</option>
        </select>
    </div>
  );
};

export default Currency;