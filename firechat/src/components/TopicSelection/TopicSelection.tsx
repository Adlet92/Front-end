import { useNavigate } from "react-router-dom";
import { routes } from "../../utils/routes";
import Header from "../Header/Header";
import "./TopicSelection.css";

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
      <Header backButton={false} />
      <div className="topics">
        <div>
          <h2>Choose a Topic:</h2>
        </div>
        <div>
          <div className="categories">
            {predefinedTopics.map((topic) => (
              <div key={topic.id}
                className="categories-block"
                onClick={() => handleTopicSelect(topic)}>
                <span>Join <strong>{topic.id}</strong> chat</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopicSelection;
