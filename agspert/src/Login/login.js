import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import "../App.css";
import { useAuth } from "../Context/authContext";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const guestLoginHandler = () => {
    setEmail("chavisinghal27@gmail.com");
    setPassword("chavi@123");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email !== "chavisinghal27@gmail.com" || password !== "chavi@123") {
      setError("invalid credentials");
      setEmail("");
      setPassword("");
    } else {
      setError("");
      login(email, password);

      navigate("/home");
    }
  };
  const handlEmailChange = (e) => {
    setEmail(e.target.value);
    setError("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError("");
  };
  console.log("loginpageloaded");
  return (
    <div className="login-container">
      <div>
        <h1>Guest Login Page</h1>
        <form onSubmit={handleSubmit}>
          <FormControl className="form-control" isInvalid={error}>
            <FormLabel>Email</FormLabel>
            <Input
              placeholder="Enter Your Email"
              value={email}
              onChange={handlEmailChange}
            />
            {error && <FormErrorMessage>{error}</FormErrorMessage>}
            <FormLabel>Password</FormLabel>
            <Input
              placeholder="Enter Your Password"
              value={password}
              type="password"
              onChange={handlePasswordChange}
            />
            {error && <FormErrorMessage>{error}</FormErrorMessage>}
            <h3>
              Not a Member?{" "}
              <Button className="not-member-button" onClick={guestLoginHandler}>
                Guest Login
              </Button>
            </h3>
          </FormControl>
          <Button className="submit-button" type="submit">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}
