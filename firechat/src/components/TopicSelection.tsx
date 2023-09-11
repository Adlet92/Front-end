import { useNavigate } from "react-router-dom";
import { routes } from "../utils/routes";

type OnSelectTopic = (topic: { id: string }) => void;

function TopicSelection({ onSelectTopic }: { onSelectTopic: OnSelectTopic }) {
  const predefinedTopics = [
    { id: 'sport'},
    { id: 'travel'},
    { id: 'hobbies'},
  ];
  const navigate = useNavigate();

  const handleTopicSelect = (topic: { id: string }) => {
    onSelectTopic(topic);
    navigate(routes.chat);
  };

  return (
    <div>
      <h2>Choose a Topic:</h2>
      <ul>
        {predefinedTopics.map((topic) => (
          <li key={topic.id}>
             <button onClick={() => handleTopicSelect(topic)}>Join {topic.id} chat</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TopicSelection;
