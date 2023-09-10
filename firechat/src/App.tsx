import { Route, Routes } from "react-router-dom"
import "./App.css"

import Chat from "./components/Chat"
import MainPage from "./components/MainPage/MainPage"
import ProtectedRoute from "./components/ProtectedRoute"
import SignIn from "./components/SignIn"
import SignUp from "./components/SignUp"
import { AuthContextProvider } from "./components/context/AuthContext"


function App() {
  return (
    <div>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/auth/signup" element={<SignUp />} />
          <Route path="/auth/signin" element={<SignIn />} />
          <Route
            path="/chat"
            element={
              <ProtectedRoute>
                <Chat />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthContextProvider>
    </div>
  )
}

export default App
