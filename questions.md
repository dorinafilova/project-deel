1. What is the difference between Component and PureComponent? Give
an example where it might break my app.

Both Component and PureComponent in the context of React, are classes used for creating components. 
When it comes to the difference, Component  updates whenever the parent component updates or the props haven changed and it does not handle the shouldComponentUpdate() method explicitly.
Pure components handle the shouldComponentUpdate() method and there is a shallow comparison done between the current state and props and the new state and props and that is how it decides whether it should re-render the component or not.Pure components are a good way to optimize a React application as it prevents unnecessary re-renders. 

We should be careful when implementing a Pure component as there are some caveats to using it. Pure component only works if the props and state are immutable meaning if we mutate the props or state directly instead of creating new objects/arrays  there might be a situation where the pure component will miss the update and not do a proper comparison to re-render when needed. That being the case, using Pure component may not be the best case when we need more control over the updates or situations where the component needs to render or for example  if we are using complex data structures(the shallow equality check can fail and only compare the complex data structures by reference)

2. Context + ShouldComponentUpdate might be dangerous. Why is that?

Context propagation can be blocked if we don’t update the props/state properly in shouldComponentUpdate or in a way if the component missed an update. So, given that, a way for context + shouldComponentUpdate to work together is if the context does not change and the component receives the context only once, when created.


3. Describe 3 ways to pass information from a component to its PARENT.

Passing a function as a prop from the parent to the child component, where information can be returned as callback
Using the Context api- a shared context is created and can be accessed by multiple components without explicitly passing props in between
Using the “lifting state up” pattern to move the state up the component tree so the higher level component can be responsible for the state management if the situation is to share it between multiple children for example.

4. Give 2 ways to prevent components from re-rendering.

Conditional rendering: Logic where a component is rendered based on a condition (state variable holding the condition)
Memoization using useMemo() & useCallback() to prevent unnecessary re-rendering. Between re-renders, by using useMemo(), we cache the result of an operation/function and by using useCallback() we memoize the callback function given as an argument.

5. What is a fragment and why do we need it? Give an example where it might
break my app.

React fragments can be very helpful when we need to wrap multiple elements under a single parent node/HTML tag, without much affecting the current DOM or making extra DOM nodes - which is beneficial since it positively affects the speed of rendering and less memory is used.
One way i can think of fragments breaking an app is maybe if we use the shorthand naming for fragments which is “<>” in a situation where we are iterating elements and not being able to add the key prop ( key prop can be added to the full React.Fragment) and get warning/errors without realizing the root of the issue. Another potential issue may be if we return fragments in reusable components where it could affect or break the encapsulation of styles.

6. Give 3 examples of the HOC pattern.
One example I can think of is for example using the Error Boundaries - creating a high order component “withErrorBoundary” which indeed is a class component that will wrap the error boundary around the wrapper component. 
Redux’s connect method is an example of a HOC - as it is a wrapper function that takes the component passed to it and returns a new, wrapper component with the additional props it injects.
Material UI’s withStyles method is also an example of  HOC as it does not modify directly the component passed to it, but it returns a new one with a “classes” prop.

7. What's the difference in handling exceptions in promises, callbacks
and async...await?

These three are all techniques/concept for handling async operations in Javascript, API requests, event handling etc.

Promises: objects that are used to handle the async result of an operation, whether that could be a completion(resolved) or failure(rejected).The Promise in Javascript has three states, it can be resolved,rejected or pending and have two ways of handling the result of the async operation: then() - attaching callbacks to the resolved, successfully fulfilled promise OR catch() -attaching callback to the failed, rejected state of the promise. Since by using promises, we kind of “delay” the execution of some code, we are ensuring other operations are not waiting and are running without issues or interruptions while the promises are being handled simultaneously. 
Callbacks: functions that are passed to other functions as arguments and are executed after the first function is done/completed. This way unfortunately we start nesting functions within functions and the code becomes very un-readable and we get in a situation which is known as the “Callback hell”. That is why callbacks are not commonly used for handling more complex async operations and are commonly used with setTimeout or event handlers.
Async/Await: the best and most intuitive way to write async code using the keyword “async”(for defining the asynchronous function) and “await”(for pausing the execution of that function until the promise/asynchronous operation is resolved before continuing further with executing the code). Using this concept - we avoid using callbacks and it is preferred in a situation when we need to handle multiple async operations in sequence (avoid chaining Promises or Callback hell) .

8. How many arguments does setState take and why is it async.
setState can receive two arguments:

- nextState which can either be an object or a function: Passing a function instead of an object ensures that the most updated version of the state will be used. Since setState is async, when we pass a function instead of an object the values are computed based on the most recent/current state. 
- callback function (optional) which will be executed when setState is completed and function re-rendered.

setState is asynchronous so it can ensure better user experience and performance as React creates a batch of all updates and renders them all together. Since re-rendering due to state changes can be a complex, expensive operation, it cannot be made synchronous. 


9. List the steps needed to migrate a Class to Function Component.

First of all we need to change the class to a function 
Then, removing the render method with a return
Remove all the “this” references
Replace “this.state” and “this.setState” with an adequate use of “useState” hook
Remove all the component updates lifecycle methods and re-write the logic using the “useEffect” hook
Remove all event binding handlers
Replace all methods with functions

10. List a few ways styles can be used with components.

Styling React components can be done in a few ways such as using CSS, SASS/SCSS, LESS, inline CSS, styled components, css modules etc.

11. How to render an HTML string coming from the server.

One way to do this is using the dangerouslySetInnerHTML property on HTML elements, but we need to be careful and always use trusted sources for the data and as the name says it is dangerous because it can make the code vulnerable for XSS attacks. The content preferably should not come from some third party services or user data.