import React from "react";
import { useSelector } from "react-redux";
function withGuard(Compoanent) {
const Wrapper = () => {
    const { isLoggedIn } = useSelector(state => state.users)
    return isLoggedIn ? <Compoanent /> : <div> Please log in first </div>;
};
return Wrapper;
}

export default withGuard;
