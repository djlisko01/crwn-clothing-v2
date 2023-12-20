import "./sign-up.styles.scss";

import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import {
  createAuthWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
const defaultFormValues = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const SignUpForm = () => {
  const [formValues, setFormValues] = useState(defaultFormValues);
  const { displayName, email, password, confirmPassword } = formValues;

  const resetFormFields = () => {
    setFormValues(defaultFormValues);
  };

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    try {
      const { user } = await createAuthWithEmailAndPassword(email, password);
      await createUserDocumentFromAuth(user, { displayName });
      resetFormFields();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Email already in use");
      } else {
        console.log("User Create Encountered an error", error);
      }
    }
  };

  return (
    <div className="sign-up-container">
      <h2> Don't have an account? </h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={(event) => handleSubmit(event)}>
        <FormInput
          label="Display Name"
          required
          name="displayName"
          value={displayName}
          onChange={handleOnChange}
        />

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

        <FormInput
          label="Confirm Password"
          autoComplete="on"
          required
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleOnChange}
        />

        <Button type="submit" buttonType="inverted">
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default SignUpForm;
