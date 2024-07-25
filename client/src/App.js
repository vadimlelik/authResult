import './App.css';
import withAppStore from "./hoc/withAppStore";
import {Route, Routes} from "react-router-dom";
import {routes} from "./config/routes";
import AppLoader from "./hoc/AppLoader";
import NavBar from "./components/NavBar/NavBar";
import RequireAuth from "./components/RequireAuth/RequireAuth";

function App() {
    const route = routes();
    return (
        <AppLoader>
            <NavBar/>
            <div className="App">
                <Routes>
                    {route.map((route) => {
                        return <Route key={route.path} path={route.path} element={
                            route.authOnly ? (
                                    <RequireAuth roles={route.roles}> {route.element}</RequireAuth>
                                ) :
                                route.element
                        }/>
                    })}
                </Routes>
            </div>
        </AppLoader>
    );
}

export default withAppStore(App)
