import { DocumentData, collection, limit, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useEffect, useRef, useState } from "react";
import { auth, db } from "../../firebase";
import Header from '../Header/Header';
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

  useEffect(() => {
    if (selectedTopic) {
      const chatCollection = collection(db, `chat-${selectedTopic.id}`);
      const messagesQuery = query(chatCollection, orderBy('createAt'), limit(50));

      const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
        setMessages(snapshot.docs.map((doc) => doc.data()));
      });

      return () => {
        unsubscribe();
      };
    }
  }, [selectedTopic]);

  return (
    <div>
      <Header backButton={true}/>
      <div className="msgs">
        {messages.map(({ id, text, uid, username}) => (
          <div>
              <div key={id} className={`msg ${uid === (auth.currentUser ? auth.currentUser.uid : null) ? 'sent' : 'received'}`}>
                <div className="user">{username}
                  <p className="message-text">{text}</p>
                </div>
              </div>
            </div>
        ))}
      </div>
      <SendMessages selectedTopic={selectedTopic} scroll={scroll} user={user}/>
      <div ref={scroll}></div>
  </div>
  )
}

export default Chat
