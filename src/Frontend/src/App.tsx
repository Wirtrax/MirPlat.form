import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom"
import Root from "./routes/Root"
import Profile from "./components/Profile/Profile"


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Root />}>
        <Route index element={<Profile />} />
        <Route path="profile" element={<Profile />} />
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

export default App
