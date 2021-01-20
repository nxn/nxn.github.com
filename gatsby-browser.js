import wrapWithReduxProvider from "./src/components/reduxprovider"
import store from "./src/state/store";
import { loadClientMessageData } from "./src/state/message";

export const wrapRootElement = wrapWithReduxProvider

export const onInitialClientRender = () => {
    // The redux store's `messageSlice` has persistence middleware that periodically saves input data on the client. Any
    // such data that persists from previous sessions should be dispatched to the store as an update once components are
    // ready to receive external state changes.
    loadClientMessageData(store);
}