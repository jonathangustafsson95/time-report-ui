import React from "react";
import TimeInput from "../../../CommonComponents/TimeInputComponent";

const InternalInfo = () => {
  return (
    <div>
      <TimeInput
        setHours={(value) => setHours(value)}
        setMinutes={(value) => setMinutes(value)}
        hours={hours}
        minutes={minutes}
        titleContent="Change time"
      />
    </div>
  );
};

export default InternalInfo;
