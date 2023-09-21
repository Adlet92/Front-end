import { useState } from "react"
import { Route, Routes } from "react-router-dom"
import Chat from "./components/Chat/Chat"
import PageNotFound from "./components/PageNotFound/PageNotFound"
import ProtectedRoute from "./components/ProtectedRoute"
import SignIn from "./components/SignIn/SignIn"
import SignUp from "./components/SignUp/SignUp"
import TopicSelection from "./components/TopicSelection/TopicSelection"
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
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/chat/:topicId"
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
          <Route
            path="*"
            element={
              <ProtectedRoute>
                <PageNotFound />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthContextProvider>
    </div>
  )
}

export default App
