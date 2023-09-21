import { DocumentData, collection, getDocs, limit, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { auth, db } from "../../firebase";
import { routes } from '../../utils/routes';
import Header from '../Header/Header';
import Loading from '../Loading/Loading';
import SendMessages from '../SendMessages/SendMessages';
import { ChatSelectedTopic } from '../types/types';
import "./Chat.css";

interface ChatProps {
  selectedTopic: ChatSelectedTopic | null;
}

function Chat({ selectedTopic }: ChatProps) {
  const scroll = useRef<HTMLDivElement | null>(null);
  const [messages, setMessages] = useState<DocumentData[]>([]);
  const user = auth.currentUser;
  const [initialDataLoaded, setInitialDataLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { topicId } = useParams();

  useEffect(() => {
    if (topicId) {
      const chatCollection = collection(db, `chat-${topicId}`);
      const messagesQuery = query(chatCollection, orderBy('createAt'), limit(50));

      const fetchMessages = async () => {
        try {
          const querySnapshot = await getDocs(messagesQuery);
          setMessages(querySnapshot.docs.map((doc) => doc.data()));
          setInitialDataLoaded(true);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      };

      if (!initialDataLoaded) {
        fetchMessages();
      }

      const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
        setMessages(snapshot.docs.map((doc) => doc.data()));
      });

      const redirect = () => {
        navigate(routes.topics);
      };

      const resetTimer = () => {
        clearTimeout(logoutTimeout);
        logoutTimeout = setTimeout(redirect, 180000);
      };

      let logoutTimeout = setTimeout(redirect, 180000);

      window.addEventListener("mousemove", resetTimer);
      window.addEventListener("keydown", resetTimer);

      return () => {
        unsubscribe();
        clearTimeout(logoutTimeout);
        window.removeEventListener("mousemove", resetTimer);
        window.removeEventListener("keydown", resetTimer);
      };
    } else {
      navigate(routes.topics)
    }
  }, [topicId, initialDataLoaded, navigate]);

  return (
    <div>
      <Header backButton={true} />
      <div className="selected-topic-id">{topicId} chat</div>
      <div className="msgs">
        {loading ? (
          <Loading/>
        ) : (
          messages.map(({ id, text, uid, username }) => (
            <div className='sides' key={id}>
              <div className={`msg ${uid === (auth.currentUser ? auth.currentUser.uid : null) ? 'sent' : 'received'}`}>
                <div className="user">{username}
                  <p className="message-text">{text}</p>
                </div>
              </div>
            </div>
        )))}
      </div>
      <SendMessages selectedTopic={selectedTopic} scroll={scroll} user={user}/>
      <div ref={scroll}></div>
  </div>
  )
}
export default Chat
