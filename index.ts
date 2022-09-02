import express from 'express'
import cors from 'cors'
import{houseData , residentData} from './data'

let houses = houseData
let residents = residentData
  
const app = express()
app.use(cors())
app.use(express.json())

const port = 9876



app.get('/houses',(req,res) => {
 res.send(houses)
})

app.get('/residents',(req,res) => {
    res.send(residents)
})

app.listen(port , () => {
    console.log(`Running: http:/localhost:${port}`)
})
