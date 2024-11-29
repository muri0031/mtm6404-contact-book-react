import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App'
import { Details } from './pages/details'
import { Add } from './pages/add'
import { UpdateContact } from './pages/UpdateContact'

const router = createBrowserRouter ([
{
  path: '/',
  element: <App/>
},
{
  path: '/add',
  element: <Add/>
},
{
  path: '/details/:id',
  element: <Details/>
},
{
  path: '/update/:id',
  element: <UpdateContact/>
}

])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
<RouterProvider router={router} />
  </React.StrictMode>
)
