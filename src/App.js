import './App.css';
import Home from './Pages/Home';
import { BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import SignUpAndLogin from './Pages/SignUpAndLogin';
import { useContext, useEffect } from 'react';
import { AuthContext, FirebaseContext } from './store/ContextStore';

function App() {
  const {setUser} = useContext(AuthContext)
  const {firebase} = useContext(FirebaseContext)

  useEffect(()=>{
    firebase.auth().onAuthStateChanged((user)=>{
      setUser(user)
    })
  },[firebase,setUser])

  return (
    <div>
      <Router>
        <Routes>
          <Route exact path='/Make-Tasty-App' element={<Home/>} />
          <Route path='/login' element={<SignUpAndLogin/>} />
      </Routes>
    </Router>
      </div>
  );
}

export default App;
