import React, { useState } from "react";
import SnackBar from "../Modals/SnackBars/SnackBarComponent";
import { connect } from "react-redux";

const DashBoard = ({ isSuccesfullySaved }) => {
  const [showSnackBar, setShowSnackBar] = useState(true);

  return (
    <div>
      {isSuccesfullySaved && (
        <SnackBar show={showSnackBar} hide={() => setShowSnackBar(false)} />
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isSuccesfullySaved: state.registryData.isSuccesfullySaved,
  };
};

export default connect(mapStateToProps)(DashBoard);
