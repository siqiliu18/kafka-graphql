const express = require("express");
const { Kafka } = require("kafkajs");
const cors = require("cors");

const kafka = new Kafka({
    clientId: "my-app-demo",
    brokers: ["localhost:9093", "localhost:9094", "localhost:9095"],
});

const producer = kafka.producer();
// const consumer = kafka.consumer({ groupId: 'test-group' })

const producerMessage = async (value) => {
    await producer.send({
        topic: "topic-status",
        messages: [{ value }],
    });
};

const run = async (value) => {
    // Producing
    await producer.connect();
    producerMessage(value);
};

const app = express();
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.get("/status", (req, res) => {
    res.json({ message: "Hello from server!" });
});
app.post("/status", (req, res) => {
    let firstBox = req.body.OverallOpp;
    let secondBox = req.body.DelServTimeline;
    let statusRes = 0;
    if (firstBox === "" && secondBox === "") {
        console.log("Not Started");
        statusRes = 2;
    } else if (firstBox !== "" && secondBox !== "") {
        console.log("Completed");
        statusRes = 4;
    } else {
        console.log("In Progress");
        statusRes = 3;
    }

    // const obj = { id: req.body.id, status: statusRes };
    const obj = {
        CbeDNA: "G210212Aydi",
        OppDNA: "23020321Pct2PuB",
        Scenario: "BE",
        Statuses: [
            {
                UniqueKey: "COACHINGCLIENTBEDESC",
                StatusCode: statusRes
            },
            {
                UniqueKey: "PLAINTAKE",
                StatusCode: statusRes
            }
        ]
    }
    const jsonStr = JSON.stringify(obj);

    run(jsonStr).catch(console.error);
});

const PORT = 4982;
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});