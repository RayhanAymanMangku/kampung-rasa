import React from 'react'
import { LoginFormComponent } from '../../components/Form/LoginForm'

export const LoginPage = () => {
    const bgImg = 'url(/assets/Frame.png)'
    const backgroundStyle = {
        backgroundImage: bgImg,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        width: '100%',
        position: 'relative',
    }

    return (

        <div style={backgroundStyle}>
            <LoginFormComponent />
        </div>

    )
}
