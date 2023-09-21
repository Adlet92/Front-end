import { Button, Input } from '@mui/material';
import { User } from 'firebase/auth';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useState } from "react";
import { auth, db } from "../../firebase";
import "./SendMessages.css";


function SendMessages({ selectedTopic, scroll, user }: { selectedTopic: any; scroll: React.MutableRefObject<HTMLDivElement | null>; user: User | null } ) {
  const [msg, setMsg] = useState('');

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault()
    if (db) {
      const uid = auth.currentUser?.uid;
      const userEmail = user ? user.email : 'Unknown User';
      try {
        setMsg('');
        await addDoc(collection(db, `chat-${selectedTopic.id}`), {
          text: msg,
          uid,
          username: userEmail,
          createAt: serverTimestamp(),
        });
      } catch (error) {
        console.error("Error adding message:", error);
      }
    }
    if (scroll.current) {
      scroll.current.scrollIntoView({ behavior: 'smooth' });
    }
  }
  return (
    <div className="sendMsg">
      <form onSubmit={sendMessage} className='message-form'>
        <Input
          style={{ width: '78%', fontSize: '15px', fontWeight: '550', marginLeft: '5px', marginBottom: '-3px' }}
          value={msg} onChange={(e) => setMsg(e.target.value)}
          placeholder="Message..." />
        <Button
          style={{ width: '18%', fontSize: '15px', fontWeight: '550', margin: '4px 5% -13px 5%', maxWidth: '200px' }}
          type="submit">Send</Button>
      </form>
    </div>
  )
}

export default SendMessages
