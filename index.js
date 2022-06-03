import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import bodyParser from "body-parser"

const app = express()

// app.use(express.json());
app.use(bodyParser.json({ limit: "50mb" }))

app.use(cors());

const urlencodedParser = express.urlencoded({ extended: false });

app.get("/getcomments", async (req, res) => {
    const offset = req.query.offset;
    const response = await fetch(`https://api.vk.com/method/board.getComments?group_id=91324690&topic_id=32070492&count=100&extended=1&offset=${offset}&access_token=affcbe28affcbe28affcbe28f1af8093d3aaffcaffcbe28cda5eec549103f80693eb82a&v=5.131`)
    const data = await response.json();
    try {
        res.json(data)
    } catch (err) { console.log("error") }

})

app.post("/sendcomments", urlencodedParser, async (req, res) => {
    const body = req.body;
    console.log(req.body)
})


app.post("/getcomments", urlencodedParser, (req, res) => {
    console.log(req.body);
    const token = req.body.dataForResponse.token;
    const groupId = req.body.dataForResponse.groupid;
    const topicId = req.body.dataForResponse.topicid;
    const numbersOfComments = req.body.dataForResponse.numbersOfComments;
    const offset = req.body.offset;


    fetch(`https://api.vk.com/method/board.getComments?group_id=${groupId}&topic_id=${topicId}&count=100&extended=1&offset=${offset}&access_token=${token}&v=5.131`)
        .then(response => response.json())
        .then(data => res.send(data))
        .catch(error => console.log(error))


});


app.listen(4000, () => {
    console.log("work!!!")
})

