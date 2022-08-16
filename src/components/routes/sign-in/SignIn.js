import { signInWithGooglePopup } from "../../../utilities/Firebase/FirebaseUtility";

const SignIn = () => {

    const logGoogleUser = async () => {
        const response = await signInWithGooglePopup();
        console.log(response);
    }

    return (
        <div>
            <h2>This is the Sign In page</h2>
            <button onClick={logGoogleUser}>SIGN IN</button>
        </div>
    )
}

export default SignIn;