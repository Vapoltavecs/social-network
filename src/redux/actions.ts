export interface IAction {
  type: string;
  payload: any;
}

export const actions = {
  auth: (payload: string) => {
    return {
      type: "AUTH",
      payload,
    };
  },
};
