import {
   ADD_ONE,
   APPLY_NUMBER,
   CHANGE_OPERATION,
   READ,
   CLEAR_MEM,
   CLEAR_DISPLAY,
   SAVE,
   EVALUATE,
} from "./../actions";

export const initialState = {
   total: 0,
   num1: 0,
   num2: 0,
   displaynum2: false,
   operation: "",
   memory: 0,
};

const calculateResult = (num1, num2, operation) => {
   switch (operation) {
      case "+":
         return num1 + num2;
      case "-":
         return num1 - num2;
      case "*":
         return num1 * num2;
      case "/":
         return num1 / num2;
      // case "*-":
      //    return num1 * -num2;
      // case "/-":
      //    return num1 / -num2;
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

      // when a number is pressed
      case APPLY_NUMBER: {
         // if we're cleared or app just started, fill in num1
         if (state.num1 === 0) {
            return {
               ...state,
               num1: action.payload,
            };
         }
         // input mode for num1
         if (state.operation.length === 0) {
            return {
               ...state,
               num1: "" + state.num1 + action.payload,
            };
         }

         // num1 finished input, operator pressed, start input num2
         if (state.num2 === 0) {
            return {
               ...state,
               num2: action.payload,
            };
         }
         // if we're coming off a continuation(after a operator or equal sign is pressed)
         // we re-enter num2, and prepare that to compute with the original num1 and operator
         if (!state.displaynum2) {
            return {
               ...state,
               displaynum2: true,
               num2: "" + action.payload,
            };
         }

         // normal num2 input mode
         return {
            ...state,
            num2: "" + state.num2 + action.payload,
         };
      }

      case CHANGE_OPERATION:
         // when all inputs are valid (num1 operator num2 all there)
         // a operation button press will evaluate and continue
         if (
            state.num1 !== 0 &&
            state.num2 !== 0 &&
            state.operation.length !== 0 &&
            state.displaynum2
         ) {
            const newval = calculateResult(
               Number(state.num1),
               Number(state.num2),
               state.operation
            );
            return {
               ...state,
               total: newval,
               displaynum2: true,
               operation: action.payload,
               num1: newval,
               num2: 0,
            };
         }

         // normal operator state change
         return {
            ...state,
            num2: 0,
            displaynum2: true,
            operation: action.payload,
         };

      case READ:
         // coming off a clear we read into num1
         if (state.num1 === 0) {
            return {
               ...state,
               num1: state.memory,
               displaynum2: true,
            };
         }
         // otherwise we read into num2
         return {
            ...state,
            num2: state.memory,
            displaynum2: true,
         };

      case SAVE:
         if (state.num2 === 0) {
            return {
               ...state,
               memory: state.num1,
            };
         }
         return {
            ...state,
            memory: state.total,
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
            num1: 0,
            num2: 0,
         };

      case EVALUATE:
         if (state.num1 > 0) {
            if (state.operation.length === 0) {
               // if we don't have num2 and operator adn we pressed equal button, store num1 and continue
               return {
                  ...state,
                  total: state.num1,
                  displaynum2: false,
                  num1: state.num1,
               };
            }
            // if an operator is provided and no num2 is given, we compute as if num2 is num1
            if (state.num2 === 0) {
               state.num2 = state.num1;
            }
         }
         // normal evalutate
         const newval = calculateResult(
            Number(state.num1),
            Number(state.num2),
            state.operation
         );
         return {
            ...state,
            total: newval,
            displaynum2: false,
            num1: newval,
         };

      default:
         return state;
   }
};

export default reducer;
