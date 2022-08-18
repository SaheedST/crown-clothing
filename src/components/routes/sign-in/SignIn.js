import {
  createUserDocFromAuth,
  signInWithGooglePopup,
} from "../../../utilities/Firebase/FirebaseUtility";
import SignUpForm from '../../sign-up-form/SignUpForm'

const SignIn = () => {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocFromAuth(user);
  };

  return (
    <div>
      <div>
        <h2>This is the Sign In page</h2>
        <button onClick={logGoogleUser}>SIGN IN With Google Account</button>
      </div>
      <div>
        <SignUpForm />
      </div>
    </div>
  );
};

export default SignIn;
