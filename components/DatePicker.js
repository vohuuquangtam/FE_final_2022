import React, { useState } from "react";
import DatePicker from "react-datepicker";

const DatePickerPage = ({ onChange, value }) => {
  return (
    <DatePicker
      selected={value}
      onChange={onChange}
      minDate={new Date()}
      timeInputLabel="Time:"
      dateFormat="MM/dd/yyyy h:mm aa"
      showTimeInput
    />
  );
};

export default DatePickerPage;
