import { IAction } from "../actions";

interface IDefaultState {
  token: string;
}

const defaultState: IDefaultState = {
  token: "",
};

export const AuthReducer = (state = defaultState, action: IAction) => {
  return action.type === "AUTH" ? { ...state, token: action.payload } : state;
};
