import './App.css';
import withAppStore from "./hoc/withAppStore";
import {useRoutes} from "react-router-dom";
import {routes} from "./config/routes";
import AppLoader from "./hoc/AppLoader";

function App() {
    const route = useRoutes(routes(true));
    return (
        <AppLoader>
            <div className="App">
                {route}
            </div>
        </AppLoader>
    );
}

export default withAppStore(App)
