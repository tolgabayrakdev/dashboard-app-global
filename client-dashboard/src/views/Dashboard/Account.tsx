import { Card, Divider } from "@mui/material"
type Props = {}

export default function Account({}: Props) {
  return (
    <div>

        <h2 className="text-center text-xl">General Information</h2>
        <Divider variant="middle" className="pt-1" />

         
        <Card variant="outlined">
            <p className="m-1">First Name: </p>
            <p className="m-1">Last Name: </p>
            <p className="m-1">Email: </p>
        </Card>
    </div>
  )
}