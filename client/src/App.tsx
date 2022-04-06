import Login from './Components/Login'
import Dashbord from './Components/Dashbord';
import useAuth from './Hooks/useAuth';

function App() {

  const token = useAuth();

  return (
    <div className=''>
      {token ? <Dashbord token={token}/> : <Login />}
    </div>
  )
}

export default App
