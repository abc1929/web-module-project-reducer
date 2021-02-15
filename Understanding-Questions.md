# Understanding Questions:

1. What are the steps of execution from the pressing of the 1 button to the rendering of our updated value? List what part of the code excutes for each step.

-  The user presses the 1 button.
-  The props of the 1 button get passed to the button component
-  onClick fires a dispatch to the reducer with argument: state = state, action={type: ADD_ONE}
-  reducer returns the new state where totalValue has been increased by 1
-  TotalDisplay shows the total plus 1.
