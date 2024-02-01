import './App.css';
import { useEffect, useState } from 'react';
import { db, auth } from './firebase';
import Header from './Header';
import Post from './Post';

function App() {

  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  

  useEffect(() => {

    auth.onAuthStateChanged((val)=>{
      if(val != null){
      setUser(val.displayName)
      }else {
        setUser(null); // Define o usuário como nulo ao fazer logout
      }
    });
      
   

    db.collection('posts').orderBy('timestamp', 'desc').onSnapshot((snapshot) => {
      setPosts(snapshot.docs.map((document) => {
        return { id:document.id, info:document.data() }
      }))

    })

    },[]);

    

  return (
    <div className="App">

      <Header setUser={setUser} user={user}></Header>

      {user ? (
        posts.map((val) => <Post key={val.id} user={user} info={val.info} id={val.id} />)
      ) : (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '89vh'}}>
        <p id='boasVindas' style={{ textAlign: 'center' }}>
          Programmed by<br />
          WELINGTON JOSÉ</p>
</div>

      )}
    </div>
  );


}

export default App;

