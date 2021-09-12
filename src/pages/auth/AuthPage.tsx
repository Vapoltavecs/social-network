import { useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink, useHistory } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import M from "materialize-css";

export const AuthPage = () => {
  const [token, setToken] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { register, handleSubmit } = useForm();
  const history = useHistory();
  useAuth(token);

  const onSubmit = async (formData: any) => {
    setLoading(true);
    const reqRes = await fetch("http://localhost:8000/auth/authorisation", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { token, message } = await reqRes.json();
    setLoading(false);
    if (reqRes.ok) {
      setToken(token);
      return history.push("/");
    }
    return M.toast({ html: message });
  };

  return (
    <div className="row valign-wrapper" style={{ height: "90vh" }}>
      <div className="col s12  m6  center-block" style={{ maxWidth: "600px" }}>
        <div className="card">
          <div className="card-content white-text">
            <span className="card-title  center" style={{ color: "black" }}>
              Авторизация
            </span>
            <div className="row right-align">
              <form className="col s12" onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                  <div className="input-field col s12">
                    <input
                      {...register("number")}
                      placeholder="Номер телефона"
                      id="first_name"
                      type="number"
                      className="validate"
                      required
                    />
                  </div>
                  <div className="input-field col s12">
                    <input
                      {...register("password")}
                      id="last_name"
                      type="text"
                      className="validate"
                      placeholder="Пароль"
                    />
                  </div>
                </div>
                <div className="center  s12 row">
                  <button
                    className="btn-large waves-effect waves-light teal lighten-1 s12 col row"
                    type="submit"
                    name="action"
                    disabled={loading}
                  >
                    Авторизоваться
                  </button>
                  <div className="s12 " style={{ color: "black" }}>
                    Еще не зарегистрированы?{" "}
                    <NavLink to="/registration">Регистрация</NavLink>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
