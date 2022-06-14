import express from "express";
import url from 'url';
import request from "request"
import { crawler } from "./crawler.js";
import bodyParser from "body-parser";

var app = express()

var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.post("/auth", urlencodedParser, function (serverReq, serverRes) {
    console.log(serverReq.body)

    const username = serverReq.body.username
    const password = serverReq.body.password

    crawler.auth({
        callback(href) {
            const resultUrl = url.parse(href, true)
            const {redirect_uri} = resultUrl.query
            const key = url.parse(redirect_uri, true).query.r

            global.dict[key] = {
                username, 
                password,
            }

            console.log(global.dict)
            // serverRes.send(href)
            serverRes.redirect(href)
        }
    })

})

app.use(express.static('static'));

var server = app
export { server }
