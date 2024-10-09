import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import RootLayout from "./pages/RootLayout";
import Index from "./pages/Index";
import ErrorPage from "./pages/ErrorPage";
const postParamsHandler = ({ params }) => {
  if (isNaN(params.id)) {
    throw new Response("Bad Request", { status: 400 });
  }
};

const AddPost = React.lazy(() => import("./pages/AddPost"));
const EditPost = React.lazy(() => import("./pages/EditPost"));
const Details = React.lazy(() => import("./pages/Details"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Index /> },
      { path: "post", element: <Index /> },
      {
        path: "post/add",
        element: (
          <Suspense fallback="<div>loading please wait</div>">
            <AddPost />
          </Suspense>
        ),
      },
      {
        path: "post/edit/:id",
        element: (
          <Suspense fallback="<div>loading please wait</div>">
            <EditPost />
          </Suspense>
        ),
        loader: postParamsHandler,
      },
      {
        path: "post/details/:id",
        element: (
          <Suspense fallback="<div>loading please wiat</div>">
            <Details />
          </Suspense>
        ),
        loader: postParamsHandler,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
