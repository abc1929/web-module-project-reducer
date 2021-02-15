import {
   ADD_ONE,
   APPLY_NUMBER,
   CHANGE_OPERATION,
   READ,
   CLEAR_MEM,
   CLEAR_DISPLAY,
   SAVE,
} from "./../actions";

export const initialState = {
   total: 0,
   operation: "",
   memory: 0,
};

const calculateResult = (num1, num2, operation) => {
   switch (operation) {
      case "+":
         return num1 + num2;
      case "*":
         return num1 * num2;
      case "-":
         return num1 - num2;
      default:
         return num2;
   }
};

const reducer = (state, action) => {
   switch (action.type) {
      case ADD_ONE:
         return {
            ...state,
            memory: state.total + 1,
         };

      case SAVE:
         return {
            ...state,
            memory: state.total,
         };

      case APPLY_NUMBER:
         return {
            ...state,
            total: calculateResult(
               state.total,
               action.payload,
               state.operation
            ),
            // operation: "",
         };

      case CHANGE_OPERATION:
         return {
            ...state,
            operation: action.payload,
         };

      case READ:
         return {
            ...state,
            total: state.memory,
         };

      case CLEAR_MEM:
         return {
            ...state,
            memory: 0,
         };

      case CLEAR_DISPLAY:
         return {
            ...state,
            total: 0,
            operation: "",
         };

      default:
         return state;
   }
};

export default reducer;
