import express from 'express'




const app = express()

app.get('/', async (req, res) => {
    res.send("Everything running")
})

app.listen(5000, () => {
    console.log("server running on port 5000");
    
})