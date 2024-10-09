import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const WithGuard = ({children}) => {
    const {isLoggedIn} = useSelector((state) => state.users);
    const navigation = useNavigate();
    useEffect(()=>{
      if(!isLoggedIn){

      window.alert("An example")
      navigation('/')
      }  // if user is not logged in, redirect to login page. This is just a simple example, you can add more logic to handle different scenarios.  // The effect will run only once when the component mounts.  // If the user is logged in, the effect will not run again.  // This way, we can ensure that the user is always authenticated before they can access certain routes.  // Note: You may want to use a more advanced authentication system, such as JWT (JSON Web Tokens), for a more robust solution.  // Also, consider adding a loading component or a different UI when the user is logged out.  // You may also want to add error handling to the login page to display an appropriate error message if the login fails.  // Lastly, you may want to add a logout feature to the application, which would also need to be implemented in the login page and the
    },[])
  return children
}

export default WithGuard
