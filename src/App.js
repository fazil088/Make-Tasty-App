import './App.css';
import Home from './Pages/Home';
import { BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import SignUpAndLogin from './Pages/SignUpAndLogin';

function App() {
  return (
    <div>
        <Router>
        <Routes>
          <Route exact path='/' element={<Home/>} />
          <Route path='/login' element={<SignUpAndLogin/>} />
      </Routes>
    </Router>
      </div>
  );
}

export default App;
