import { useState ,useContext} from "react"
import { AuthContext } from "../context/AuthContext"
import { useNavigate } from 'react-router-dom';



const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [errorlog,seterrorlog]=useState(null);

  const {LogUser,setLoguser,setLogState}=useContext(AuthContext);
  const navigate=useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const response = await fetch('/api/user/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email, password })
    })
    const json = await response.json()

    if (!response.ok) {
      seterrorlog(json);
      console.log("i am here at login",json);
    }
    if (response.ok) {
      // save the user to local storage
      console.log(json);
      setLoguser(json)
      setLogState(true);
      //localStorage.setItem('user',JSON.stringify(json));
      localStorage.setItem('user',json.email);
      localStorage.setItem('token',json.token);
      
    }


  }

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>Log In</h3>
      
      <label>Email address:</label>
      <input 
        type="email" 
        onChange={(e) => setEmail(e.target.value)} 
        value={email} 
      />
      <label>Password:</label>
      <input 
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
      />

      {errorlog && <div style={{color:"red"}}>{errorlog.error}</div>}

      <button >Log in</button>
     
    </form>
  )
}

export default Login