import React from "react";
import { Provider } from "react-redux";

import store from "../state/store"

export default function({ element }: { element: JSX.Element }) {
    return <Provider store={ store }>{ element }</Provider>
}