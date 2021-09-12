import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Route, Redirect, BrowserRouter } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { AuthPage } from "../pages/auth/AuthPage";
import { RegPage } from "../pages/auth/RegistrationPage";

export const Routes = () => {
  interface IRootState {
    auth: any;
  }
  const isAuth = useSelector<IRootState, string>((state) => state.auth.token);
  const token = localStorage.getItem("token");
  const [tokenForRedux, setTokenForRedux] = useState<string>("");

  const checkToken = async () => {
    const isCorrectToken = await (
      await fetch("http://localhost:8000/auth/auth", {
        method: "POST",
        body: JSON.stringify({ token }),
        headers: {
          "Content-Type": "application/json",
        },
      })
    ).json();

    if (isCorrectToken.isCorrect && token) {
      return setTokenForRedux(token);
    }

    return localStorage.removeItem("token");
  };
  useEffect(() => {
    checkToken();
  });
  useAuth(tokenForRedux);
  if (!token) {
    return (
      <BrowserRouter>
        <Redirect exact from="/" to="/registration" />
        <Route path="/registration" component={RegPage} />
        <Route path="/authorisaton" component={AuthPage} />
      </BrowserRouter>
    );
  }

  return <BrowserRouter>app</BrowserRouter>;
};
