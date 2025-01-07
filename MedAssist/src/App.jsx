import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import Signup from "./components/Signup.jsx";
import Signin from "./components/Signin.jsx";
import HomePage from "./components/HomePage.jsx";

function App() {

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route>
                <Route path="/" element={<HomePage />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/signin" element={<Signin />} />
            </Route>
        )
    )

  return (
      <>
          <RouterProvider router={router}/>
      </>
  )
}

export default App
