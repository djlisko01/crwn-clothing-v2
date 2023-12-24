import "./sign-in.styles.scss";

import { useState, useContext } from "react";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import { UserContext } from "../../context/user.context";

import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  userEmailSignIn,
} from "../../utils/firebase/firebase.utils";

const defaultFormValues = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignInForm = () => {
  const [formValues, setFormValues] = useState(defaultFormValues);
  const { email, password } = formValues;
  const resetFormFields = () => {
    setFormValues(defaultFormValues);
  };

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    createUserDocumentFromAuth(user);
  };

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await userEmailSignIn(email, password);
      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case "auth/invalid-login-credentials":
          alert("Wrong Password or Email");
          break;

        default:
          console.log("Error accord", error);
      }
    }
  };

  return (
    <div className="sign-in-container">
      <h2> Don't have an account? </h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={(event) => handleSubmit(event)}>
        <FormInput
          label="Email"
          required
          type="email"
          name="email"
          value={email}
          onChange={handleOnChange}
        />

        <FormInput
          label="Password"
          autoComplete="on"
          required
          type="password"
          name="password"
          value={password}
          onChange={handleOnChange}
        />

        <span className="flex-button-container">
          <Button type="submit" buttonType="inverted">
            Sign In
          </Button>
          <Button type="button" onClick={logGoogleUser} buttonType="google">
            Google Sign In
          </Button>
        </span>
      </form>
    </div>
  );
};

export default SignInForm;
