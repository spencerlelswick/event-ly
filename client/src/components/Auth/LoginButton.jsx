
import { useAuth0 } from "@auth0/auth0-react";

export default function LoginButton(){
    const { loginWithRedirect } = useAuth0()
    // loginWithRedirect -> f() -> arg {}
    return (<button onClick={()=>loginWithRedirect()}>Log In</button>)
}