import {Auth0Provider} from '@auth0/auth0-react'
import {useNavigate} from 'react-router'

export default function Auth0ProviderWithNavigate({children}){
    const navigate = useNavigate()

    const domain = import.meta.env.VITE_AUTH0_DOMAIN
    const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID
    const redirectUri = import.meta.env.VITE_AUTH0_CALLBACK_URL
    console.log(domain, clientId, redirectUri,"testing env for auth0")
    if(!(domain && clientId && redirectUri)){
        return null
    }

    const onRedirectCallback = (appState) => {
        navigate(appState?.returnTo || window.location.pathname)
    }

    // window.location.pathaname -> /profile /people/id....
    // window.location.href -> http://localhost:3000/profile

    return (
        <Auth0Provider
            domain={domain}
            clientId={clientId}
            authorizationParams={{
            redirect_uri: redirectUri
            }}
            onRedirectCallback={onRedirectCallback}
        >
            {children}
        </Auth0Provider>
    )
}