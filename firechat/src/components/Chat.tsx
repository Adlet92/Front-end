import { DocumentData, collection, limit, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useEffect, useRef, useState } from "react";
import { auth, db } from "../firebase";
import Header from './Header/Header';
import SendMessages from './SendMessages';

function Chat() {
  const scroll = useRef<HTMLDivElement | null>(null);

  const [messages, setMessages] = useState<DocumentData[]>([]);
  useEffect(() => {
    const messagesCollection = collection(db, 'messages');
    const messagesQuery = query(messagesCollection, orderBy('createAt'), limit(50));

    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => doc.data()));
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div>
      <Header/>
      <div className="msgs">
        {messages.map(({ id, text, uid }) => (
          <div>
              <div key={id} className={`msg ${uid === (auth.currentUser ? auth.currentUser.uid : null) ? 'sent' : 'received'}`}>
                <p>{text}</p>
              </div>
            </div>
        ))}
      </div>
      <SendMessages scroll={scroll} />
      <div ref={scroll}></div>
  </div>
  )
}

export default Chat
