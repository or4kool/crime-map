import React from 'react';
import { fireAuth, fireProvider } from "./firebase"
import { useHistory } from "react-router-dom";
import Firebase from "firebase"

/**
 * 
 * Login Component
 * Provides login access via Google auth
 * 
 */

const Login = () => {

    const history = useHistory()


    const buttonParentStyle = {
        position: "absolute",
        left: "0px",
        right: "0px",
        bottom: "0px",
        top: "0px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }

    const pageStyle = {
        background: "rgb(255, 87, 34)",
        position: "fixed",
        left: "0px",
        right: "0px",
        top: "0px",
        bottom: "0px"
    }

    const buttonStyle = {
        width: "200px",
        height: "50px",
        borderRadius: "3px",
        border: "0px",
        color: "#ff5722",
        fontSize: "23px",
        cursor: "pointer"
    }


    // HANDLE FIREBASE GOOGLE LOGIN
    const GoogleProvider = () => {

        fireAuth.signInWithPopup(fireProvider)
            .then(result => {

                const user = {
                    name: result.user.displayName,
                    email: result.user.email
                }

                // LOCAL STORAGE
                localStorage.setItem("crimeuser", JSON.stringify(user))

                // SAVE USER IN FIREBASE
                Firebase.database().ref(`user-${(user.email).split(".").join("")}`).set({ ...user })

                // REDIRECT TO MAPS PAGE
                history.push("/maps")
            })

    }

    return (
        <div style={pageStyle}>
            <div style={buttonParentStyle}>
                <span><img src="" /></span>
                <button onClick={GoogleProvider} style={buttonStyle}>Google signIn</button>
            </div>
        </div>
    )

}

export default Login;