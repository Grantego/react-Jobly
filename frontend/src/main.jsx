import React from 'react'
import ReactDOM from 'react-dom/client'
import Root from './routes/Root';
import CompanyList from './routes/CompanyList';
import CompanyDetails, {loader as companyLoader} from './routes/CompanyDetails';
import JobList from './routes/JobList';
import LoginForm from './routes/LoginForm';
import SignupForm from './routes/SignupForm';
import EditProfile, {loader as userLoader} from './routes/EditProfile';
import ErrorPage from './ErrorPage';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
  },
  {
    path: "/companies",
    element: <CompanyList/>
  },
  {
    path: "/companies/:handle",
    element: <CompanyDetails/>,
    errorElement: <ErrorPage/>,
    loader: companyLoader
  },
  {
    path: "/jobs",
    element: <JobList/>
  },
  {
    path: "/login",
    element: <LoginForm/>
  },
  {
    path: "/signup",
    element: <SignupForm/>
  },
  {
    path: "/profile",
    element: <EditProfile/>,
    loader: userLoader
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
