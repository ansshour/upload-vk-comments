import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import bodyParser from "body-parser"
import mongoose from "mongoose";
import Comments from "./Comments.js";

const app = express()

const timer = ms => new Promise(res => setTimeout(res, ms))

app.use(bodyParser.json({ limit: "50mb" }))

app.use(cors());

const start = async () => {

    await mongoose.connect(`mongodb+srv://ansshour:d20kv7943@cluster0.wjzoova.mongodb.net/?retryWrites=true&w=majority`)

    const urlencodedParser = express.urlencoded({ extended: false });
    app.post("/getcomments", urlencodedParser, async (req, res) => {
        let lengthOfResponse = 0;

        let [token, groupId, topicId, offset] = [req.body.token, req.body.groupId, req.body.topicId, 0];
        const resultItems = [];
        let resultItemsUnpacked = [];
        let resultProfilesUnpacked = [];
        const resultProfiles = []
        const result = [];

        do {
            const response = await fetch(`https://api.vk.com/method/board.getComments?group_id=${groupId}&topic_id=${topicId}&count=100&extended=1&offset=${offset}&access_token=${token}&v=5.131`);
            const data = await response.json();
            lengthOfResponse = data.response.items.length;
            resultItems.push(data.response.items);
            resultProfiles.push(data.response.profiles);
            await timer(300);
            offset += 100;
        } while (lengthOfResponse)

        resultItems.forEach(item => {
            resultItemsUnpacked = [...resultItemsUnpacked, ...item];
        })

        resultProfiles.forEach(profile => {
            resultProfilesUnpacked = [...resultProfilesUnpacked, ...profile];
        })

        resultItemsUnpacked.forEach(item => {
            resultProfilesUnpacked.forEach(profile => {
                if (item.from_id === profile.id) {
                    result.push({ name: `${profile.first_name} ${profile.last_name}`, id: item.from_id, photo: profile.photo_100, text: item.text })
                }
            })
        })

        result.forEach(comment => {
            (async () => {
                const comments = await Comments.create({ name: comment.name, id: comment.id, photo: comment.photo, text: comment.text })
                console.log(comment)
            })()
        })

        res.send(result)


    });


    app.listen(4000, () => {
        console.log("work!!!")
    })


}


start()