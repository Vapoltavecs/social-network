import M from "materialize-css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export const RegPage = () => {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const [tokenForRedux, setTokenForRedux] = useState<string>("");
  const onSubmit = async (data: any) => {
    setLoading(true);
    const token = await (
      await fetch("http://localhost:8000/auth/registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
    ).json();
    setLoading(false);
    if (token.ok) {
      return setTokenForRedux(token.token);
    }

    return M.toast({ html: token.message });
  };
  useAuth(tokenForRedux);
  return (
    <div className="row valign-wrapper" style={{ height: "90vh" }}>
      <div className="col s12  m6  center-block" style={{ maxWidth: "600px" }}>
        <div className="card">
          <div className="card-content white-text">
            <span className="card-title  center" style={{ color: "black" }}>
              Регистрация
            </span>
            <div className="row center-align">
              <form className="col s12" onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                  <div className="input-field col s12">
                    <input
                      {...register("name")}
                      placeholder="Имя"
                      id="first_name"
                      type="text"
                      className="validate"
                      required
                    />
                    <input
                      {...register("lastName")}
                      placeholder="Фамилия"
                      id="lastName"
                      type="text"
                      className="validate"
                      required
                    />
                    <input
                      {...register("number")}
                      placeholder="Номер телефона"
                      id="first_name"
                      type="tel"
                      className="validate"
                      required
                    />
                    <input
                      {...register("password")}
                      id="last_name"
                      type="password"
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
                    Регистрация
                  </button>
                  <div className="s12 " style={{ color: "black" }}>
                    Уже зарегистрированы?{" "}
                    <NavLink to="/authorisaton">Авторизация</NavLink>
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
