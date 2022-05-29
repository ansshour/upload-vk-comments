import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express()

app.use(express.json());

app.use(cors());

app.get("/getcomments", async (req, res) => {
    const offset = req.query.offset;
    const response = await fetch(`https://api.vk.com/method/board.getComments?group_id=91324690&topic_id=32070492&count=100&extended=1&offset=${offset}&access_token=affcbe28affcbe28affcbe28f1af8093d3aaffcaffcbe28cda5eec549103f80693eb82a&v=5.131`)
    const data = await response.json();
    try {
        res.json(data)
    } catch (err) { console.log("error") }

})


app.listen(4000, () => {
    console.log("work!!!")
})

