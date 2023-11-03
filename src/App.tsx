import { useEffect, useState } from 'react';
import { DocumentData, collection, getDocs, onSnapshot } from 'firebase/firestore';
import db from "./config/firebase"

function App() {

  const [users, setUsers] = useState<DocumentData[]>([])

  useEffect(() => {
    const getUsers = async () => {
      const querySnapshot = await getDocs(collection(db, 'users'))
      const users = querySnapshot.docs.map(doc => doc.data())
      setUsers(users)
    }

    getUsers()

  }, [])

  return (
    <div className='mx-48 h-screen'>
      {users.map(user => {
        return (
          <div>
            <p> {user.name} </p>
          </div>
        )
      })}
    </div>
  );
}

export default App;
