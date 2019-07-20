import React from "react";
import "./config/ReactotronConfig";

import { Provider } from "react-redux";
import store from "./store/index";

import TodoList from "./TodoList";

console.tron.log({ Hello: "world" });

const App = () => (
    <Provider store={store}>
        <TodoList>
            <h1>Hello World</h1>
        </TodoList>
    </Provider>
);

export default App;
