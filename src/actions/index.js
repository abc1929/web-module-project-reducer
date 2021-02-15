export const ADD_ONE = "ADD_ONE";

export const APPLY_NUMBER = "APPLY_NUMBER";
export const CHANGE_OPERATION = "CHANGE_OPERATION";

export const READ = "READ";
export const CLEAR_DISPLAY = "CLEAR_DISPLAY";
export const CLEAR_MEM = "CLEAR_MEM";
export const SAVE = "SAVE";

export const addOne = () => {
   return { type: ADD_ONE };
};

export const applyNumber = (number) => {
   return { type: APPLY_NUMBER, payload: number };
};

export const changeOperation = (type) => {
   return { type: CHANGE_OPERATION, payload: type };
};
