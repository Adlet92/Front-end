import { Input } from "@mui/material";
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useState } from "react";
import { auth, db } from "../firebase";


function SendMessages() {
  const [msg, setMsg] = useState('');

  async function sendMessage(e) {
    e.preventDefault()
    // const { uid, photoUrl } = auth.currentUser
    // await db.collection('messages').add({
    //   text: msg,
    //   photoUrl,
    //   uid,
    //   createAt: firebase.firestore.FieldValue.ServerTimestamp()
    // })
    // setMsg('')
    if (db) {
      const { uid } = auth.currentUser;
      try {
        await addDoc(collection(db, 'messages'), {
          text: msg,
          uid,
          createAt: serverTimestamp(),
        });
        setMsg('');
      } catch (error) {
        console.error("Error adding message:", error);
      }
    }
  }
  return (
    <div className="sendMsg">
      <form onSubmit={sendMessage}>
        <Input style={{ width: '78%', fontSize: '15px', fontWeight: '550', marginLeft: '5px', marginBottom: '-3px' }} value={ msg } onChange={(e) => setMsg(e.target.value)} placeholder="Message..." />
        <button style={{ width: '18%', fontSize: '15px', fontWeight: '550', margin: '4px 5% -13px 5%', maxWidth: '200px'}} type="submit">Send</button>
      </form>
    </div>
  )
}

export default SendMessages
