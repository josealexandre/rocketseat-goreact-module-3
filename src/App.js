import React from "react";
import "./config/ReactotronConfig";

import { Provider } from "react-redux";
import store from "./store/index";

console.tron.log({ Hello: "world" });

const App = () => (
    <Provider store={store}>
        <h1>Hello World</h1>
    </Provider>
);

export default App;
