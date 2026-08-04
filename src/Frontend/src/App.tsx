import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import Root from "./routes/Root"
import Profile from "./components/Profile/Profile"
import Registration from "./components/Registration/Registration"
import Instruction from "./components/Instructions/Instruction"
import MainPage from "./components/MainPage/MainPage"
import ProtectedRoute from "./routes/ProtectedRoute"


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="registration" element={<Registration />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Root />}>
          <Route index element={<MainPage />} />
          <Route path="main" element={<MainPage />} />
          <Route path="instruction" element={<Instruction />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Route>

    </>
  )
)

function App() {

  return (
    <RouterProvider router={router}>
    </RouterProvider>
  )
}

export default App;
