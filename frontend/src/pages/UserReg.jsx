import { useState, useContext, useEffect } from "react"
import { AuthContext } from "../context/AuthContext"
import { Navigate, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';

const UserReg = () => {
    const navigate = useNavigate();
    console.log("f4");
    const { LogUser ,UserToken} = useContext(AuthContext);
    const [IsReg, SetIsReg] = useState(false);
    const [Name, SetName] = useState('')
    const [Surname, SetSurName] = useState('')
    const [Age, SetAge] = useState('')
    const [MobileNo, SetMobileNo] = useState('')
    const [BloodGrp, SetBloodGrp] = useState('')

    useEffect(() => {
        console.log("UserToken in Reg ", UserToken);
        async function fetchreg() {

            console.log("UserToken in Reg ", UserToken);
            const response = await fetch('/api/secure/register/getuser', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json','Authorization': `Bearer ${UserToken.token}`},
                body: JSON.stringify({ email: LogUser.email })
            });

            if (!response.ok) {
                
                throw new Error(`HTTP error! Status: ${response.status}`);
            }


            const json = await response.json();
            //console.log("herw we are",json)
            return json;



        }

        fetchreg()
            .then((data) => {
                console.log("data in use", data);

                if (data) SetIsReg(true);
            }
            ).catch(e => {
                console.log("custom error ", e);
            })

    })


    async function ReRegisterUser() {
        console.log('Reregister');
        const response = await fetch('/api/secure/register/deleteuser', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json','Authorization': `Bearer ${UserToken.token}` },
            body: JSON.stringify({ email: LogUser.email })
        })
        const json = await response.json()

        if (json.acknowledged) {
            console.log("Delete user", json);
            SetIsReg(false);
        }
    }






    if (IsReg) return (
        <div>
            <h4>User is already Register.</h4>
            <Button variant="success" onClick={ReRegisterUser}>Update</Button>
        </div>
    )






    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('/api/secure/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json','Authorization': `Bearer ${UserToken.token}` },
            body: JSON.stringify({ Name, Surname, Age, MobileNo, BloodGrp, email: LogUser.email })
        })
        const json = await response.json()

        if (!response.ok) {

            console.log(json);
        }
        if (response.ok) {
            // save the user to local storage
            console.log("uesr Reg");
            console.log(json);
            SetIsReg(true);
            navigate('/')
        }
    }



    return (
        <>
            {console.log("f6")}
            {!LogUser && (
                <Navigate to="/login" replace={true} />
            )}

            {console.log("f7")}
            <form className="signup" onSubmit={handleSubmit}>
                <h3>User Registration</h3>

                <label>First Name:</label>
                <input
                    type="text"
                    onChange={(e) => SetName(e.target.value)}
                    value={Name}
                />
                <label>Last Name:</label>
                <input
                    type="text"
                    onChange={(e) => SetSurName(e.target.value)}
                    value={Surname}
                />

                <label>Age:</label>
                <input
                    type="number"
                    onChange={(e) => SetAge(e.target.value)}
                    value={Age}
                />

                <label>Mobile No:</label>
                <input
                    type="number"
                    onChange={(e) => SetMobileNo(e.target.value)}
                    value={MobileNo}
                />

                <label>Blood Grp:</label>
                <input
                    type="text"
                    onChange={(e) => SetBloodGrp(e.target.value)}
                    value={BloodGrp}
                />



                <button>Register</button>

            </form>
        </>
    )
}

export default UserReg