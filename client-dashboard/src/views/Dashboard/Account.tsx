import { Card, Divider } from "@mui/material"
import { useEffect, useState } from "react"
type Props = {}

type User = {
  id: number
  first_name: string
  last_name: string
  email: string
}

export default function Account({ }: Props) {
  const [user, setUser] = useState([]);



  useEffect(() => {
    getInformation();
  }, [])


  const getInformation = async () => {
    try {
      const result = await fetch("http://localhost:5000/api/v1/auth/verify", {
        method: "POST",
        credentials: "include"
      })
      const data = await result.json();      
      setUser(data.user.userInformation);
    } catch (error) {
      console.log(error);

    }
  }

  return (
    <div>

      <h2 className="text-center text-xl">General Information</h2>
      <Divider variant="middle" className="pt-1" />

      {
        <p> {JSON.stringify(user)} </p>
      }

      <Card variant="outlined">
        <p className="m-1">First Name: </p>
        <p className="m-1">Last Name: </p>
        <p className="m-1">Email: </p>
      </Card>
    </div>
  )
}