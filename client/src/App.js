import './App.css';
import withAppStore from "./hoc/withAppStore";
import {useRoutes} from "react-router-dom";
import {routes} from "./config/routes";

function App() {
    const route = useRoutes(routes(true));
    return (
        <div className="App">
            {route}
        </div>
    );
}

export default withAppStore(App)
