import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

let messages = [];  // Array to store messages with IDs
let nextId = 1;  // Auto-incrementing ID for messages

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.get("/", (req, res) => {
    res.render("index.ejs", { messageText: messages });
});

app.post("/submit", (req, res) => {
    const message = req.body["message"];
    if (message) {
        messages.push({ id: nextId++, text: message });
        console.log(messages);
    }
    res.redirect("/");
});

app.post("/edit/:id", (req, res) => {
    const messageId = parseInt(req.params.id);
    const newMessageText = req.body["newMessage"];

    if (newMessageText) {
        // Find the message with the given ID and update its text
        const message = messages.find(msg => msg.id === messageId);
        if (message) {
            message.text = newMessageText;
        }
    }
    res.redirect("/");
});

app.post("/delete/:id", (req, res) => {
    const messageId = parseInt(req.params.id);

    // Filter out the message with the given ID
    messages = messages.filter(msg => msg.id !== messageId);

    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
