import React from "react";
import Layout from "./Components/Layout";
import SignIn from "./Components/SignInComponents/SignInComponent";

function App({ count, incrementCount }) {
  return (
    <div>
      <SignIn />
      {/* <Layout /> */}
    </div>
  );
}

export default App;
