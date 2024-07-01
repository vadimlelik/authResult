import {Provider} from "react-redux";
import {createStore} from "../store/createStore";


const store = createStore()

const withAppStore = (Component) => ({...props}) => {
    return (<Provider store={store}>
        <Component {...props} />
    </Provider>)
}


export default withAppStore;