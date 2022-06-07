import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import bodyParser from "body-parser"

const app = express()

// app.use(express.json());
app.use(bodyParser.json({ limit: "50mb" }))

app.use(cors());

const urlencodedParser = express.urlencoded({ extended: false });

app.post("/sendcomments", urlencodedParser, async (req, res) => {
    const body = req.body;
    console.log(req.body)
})


app.post("/getcomments", urlencodedParser, (req, res) => {
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

