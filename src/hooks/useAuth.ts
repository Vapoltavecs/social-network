import { useDispatch } from "react-redux";
import { actions } from "../redux/actions";

export const useAuth = (token: string) => {
  const dispatch = useDispatch();
  if (token !== "") {
    localStorage.setItem("token", token);
    return dispatch(actions.auth(token));
  }
};
