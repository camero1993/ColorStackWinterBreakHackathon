import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";
import Signup from "./components/Signup.jsx";
import Signin from "./components/Signin.jsx";
import LandingPage from './components/LandingPage';

function App() {

    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route>
                <Route path="/" element={<LandingPage />} />
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
