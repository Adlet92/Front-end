import { DocumentData, collection, limit, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { routes } from "../utils/routes";
import SendMessages from './SendMessages';
import { UserAuth } from "./context/AuthContext";

function Chat() {
  const authUser = UserAuth();
  const user = authUser && authUser.user;
  const logout = authUser && authUser.logout;
  const navigate = useNavigate();

  // const [messages, setMessages] = useState([]);
  const [messages, setMessages] = useState<DocumentData[]>([]);
  // useEffect(() => {
  //   db.collection('messages').orderBy('createAt').limit(50).onSnapshot(snapshot => {
  //     setMessages(snapshot.docs.map(doc => doc.data()))
  //   })
  // },[])
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

  const handleLogout = () => {
    if (logout) {
      logout().then(() => navigate(routes.main));
    }
  };
  return (
    <div className="header">
    <div className="frame4">
      <div className="account-label">{user && user.email}</div>
      <button className="logout-button" onClick={handleLogout}>
        Log Out
      </button>
      </div>
      <div className="msgs">
        {messages.map(({ id, text, uid }) => (
          <div>
              <div key={id} className={`msg ${uid === (auth.currentUser ? auth.currentUser.uid : null) ? 'sent' : 'received'}`}>
                <p>{text}</p>
              </div>
            </div>
        ))}
      </div>
      <SendMessages/>
  </div>
  )
}

export default Chat
