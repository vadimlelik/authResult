import {Navigate} from "react-router-dom";
import LoginPages from "../pages/LoginPage/LoginPages";
import AuthLayout from "../layout/AuthLayout";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import PostLayout from "../layout/PostLayout";
import PostList from "../components/PostList";
import Main from "../components/Main";


export const routes = (isLoggedIn) => {
    return [
        {
            path: '/',
            element: <Main/>
        },
        {
            path: 'auth',
            element: <AuthLayout/>,
            children: [
                {
                    path: '',
                    element: <Navigate to='/auth/signUp'/>,
                },
                {
                    path: "signIn",
                    element: <LoginPages/>

                },
                {
                    path: "signUp",
                    element: <SignUpPage/>,
                }

            ]
        },
        {
            path: 'post',
            element: isLoggedIn ? (<PostLayout/>) : (<Navigate to='auth/signUp'/>),
            children: [
                {
                    path: '',
                    element: <PostList/>
                },
                {
                    path: ':postId',
                    element: <h1>PostPage</h1>
                }
            ]
        },
        {
            path: '*',
            element: <Navigate to='/404'/>,
        }
    ]
}