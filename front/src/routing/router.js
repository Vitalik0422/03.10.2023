import { createBrowserRouter } from "react-router-dom";
import Layout from '../Layout/layout'
import Login from "../conteiners/login/loginPage";


const routing = createBrowserRouter([
    {
        path: '/',
        element:<Layout />,
        children:[
            {element: <Login/>,
            path: '/login'
        }
        ]
    }
])

export default routing
