import { createBrowserRouter } from "react-router-dom";
import Layout from '../Layout/layout'
import Login from "../conteiners/login/loginPage";
import Registration from '../conteiners/register/registerPage'


const routing = createBrowserRouter([
    {
        path: '/',
        element:<Layout />,
        children:[
            {element: <Login/>,
            path: '/login'
        },
        {element: <Registration/>,
            path: '/registration'
        },
        ]
    }
])

export default routing
