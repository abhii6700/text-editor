import React, {useState} from 'react' 
import axios from '../axios'
import Link from 'next/link'
import Button from "@material-tailwind/react/Button";
import { useRouter } from "next/router";

function Signup() {
  const router = useRouter()
    const [signupDetails, setSignupDetails] = useState({
        name: '',
        email: '',
        password: '',
        role: '',
    })

    const handleChange = (e) => {
      setSignupDetails({
          ...signupDetails,
          [e.target.name]: e.target.value
      })}

      const handleClick = async (e) => {
        e.preventDefault()
        try{
          const response = await axios.post('/user/register',
            signupDetails
          )
          router.push('/')
        }catch(err){
          console.log(err)
        }
        

      }

    return (
        <div>
            <div className="flex justify-center mt-44 rounded">
      <div className="bg-[#f8f9fa] p-6 flex flex-col gap-6 items-center">
        <h1>Signup</h1>
        <input
          className=" px-5 py-2 rounded text-base outline-none"
          type="text"
          name="name"
          placeholder="Enter full name"
          onChange = {handleChange}
        />
        <input
          className=" px-5 py-2 rounded text-base outline-none"
          type="email"
          name="email"
          placeholder="Enter Email address"
          onChange = {handleChange}
        />
        <input
          className=" px-5 py-2 rounded text-base outline-none"
          type="password"
          name="password"
          placeholder="Enter Password"
          onChange={handleChange}
        />
        <select
                            value={signupDetails.role}
                            name='role'
                            onChange={handleChange}
                            className=" px-5 py-2 rounded text-base outline-none" >
                            <option disabled>Membership type</option>
                            <option value="standard">standard</option>
                            <option value="premium">premium</option>
                        </select>
        <Button
               color="blue"
               buttonType="filled"
               size="regular"
               rounded={false}
               block={false}
               iconOnly={false}
               ripple="light"
               type='submit'
               onClick={handleClick}
            >
              Signup
            </Button>
        
        <p className='text-xs'>
                Don’t have an account? <span className='text-blue-700 font-medium'><Link  href='/login'>Login</Link></span>
                
        </p>
      </div>
    </div>
        </div>
    )
}

export default Signup
