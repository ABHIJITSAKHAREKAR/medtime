import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/AuthContext"


const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {LogUser,setLoguser,setLogState}=useContext(AuthContext);
  
  const [errorlog,seterrorlog]=useState(null);

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/user/signup', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email, password })
    })
    const json = await response.json()

    if (!response.ok) {
      console.log(json);
      seterrorlog(json);
    }
    if (response.ok) {
      // save the user to local storage
      console.log(json);
      setLoguser(json);
      setLogState(true);
      //localStorage.setItem('user',JSON.stringify(json));
      localStorage.setItem('user',json.email);
      localStorage.setItem('token',json.token);
      console.log("f1 ",LogUser);
    }


  }
  

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign Up</h3>
      
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

      <button>Sign up</button>
      
    </form>
  )
}

export default Signup