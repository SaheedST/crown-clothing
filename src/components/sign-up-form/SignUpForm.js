import { useState } from "react";
import {
  createUserWithEmailAndPasswordAuth,
  createUserDocFromAuth,
} from "../../utilities/Firebase/FirebaseUtility";
import FormInput from "../form-input/FormInput";
import "./SignUpForm.styles.scss";
import Button from "../button/Button";

const userFormData = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [inputData, setInputData] = useState(userFormData);

  const { displayName, email, password, confirmPassword } = inputData;

  const inputDataHandler = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputData, [name]: value });
  };

  const submitFormHandler = async (e) => {
    e.preventDefault();
    console.log(inputData);

    // compare password and confirmPassword
    const passwordMatch = password === confirmPassword;
    if (!passwordMatch) return;
    try {
      const { user } = await createUserWithEmailAndPasswordAuth(
        email,
        password
      );

      await createUserDocFromAuth(user, { displayName });
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Cannot create user, email already in user");
      } else {
        console.log(error);
      }
    }

    // confirm user is authenticated with email and password in Firebase

    // create user document in Firebase

    // reset form
    setInputData(userFormData);
  };

  const passwordMatch = password === confirmPassword;

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={submitFormHandler}>
        <div>
          <FormInput
            label={"Display Name"}
            required
            type={"text"}
            name={"displayName"}
            onChange={inputDataHandler}
            value={displayName}
          />
          <div>
            <FormInput
              label={"Email"}
              required
              type={"email"}
              name={"email"}
              onChange={inputDataHandler}
              value={email}
            />
          </div>
          <div>
            <FormInput
              label={"Password"}
              required
              type={"password"}
              name={"password"}
              onChange={inputDataHandler}
              value={password}
            />
          </div>
          <div>
            <FormInput
              label={"Confirm Password"}
              required
              type={"password"}
              name={"confirmPassword"}
              onChange={inputDataHandler}
              value={confirmPassword}
            />
            {!passwordMatch && <p>Password does not match!</p>}
          </div>
        </div>
        <div>
          <Button type="Submit">Sign Up</Button>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
