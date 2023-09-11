import { Route, Routes } from "react-router-dom"
import "./App.css"

import { useState } from "react"
import Chat from "./components/Chat"
import MainPage from "./components/MainPage/MainPage"
import ProtectedRoute from "./components/ProtectedRoute"
import SignIn from "./components/SignIn/SignIn"
import SignUp from "./components/SignUp/SignUp"
import TopicSelection from "./components/TopicSelection"
import { AuthContextProvider } from "./components/context/AuthContext"
import { ChatSelectedTopic } from "./components/types/types"


function App() {
  const [selectedTopic, setSelectedTopic] = useState<ChatSelectedTopic | null>(null);

  const handleTopicSelection = (topic: ChatSelectedTopic | null) => {
    setSelectedTopic(topic);
  };

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
                <Chat selectedTopic={selectedTopic} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/topics"
            element={
              <ProtectedRoute>
                <TopicSelection onSelectTopic={handleTopicSelection} />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthContextProvider>
    </div>
  )
}

export default App
