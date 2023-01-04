import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import Login from './Login'
import { createBrowserRouter, RouterProvider, Route} from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>
  },
  {
    path:"/notes/:userId",
    element:<App/>
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
