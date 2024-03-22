# Overview
This project is an end to end web application that provides implementation examples of 
1. graphQL client subscription in React
2. useState hook and axios post implementations in React
3. RestAPI implementation in nodejs
4. Kafka producer implementation in nodejs
5. Kafka consumer implementation in nodejs
6. graphQL server implementation in nodejs
7. Kafka consumer implementation in nestjs
8. graphQL server implementation in nestjs

# Behavior
### If all boxes are empty, the status icon is a solid blue circle
![Screenshot 2023-03-21 at 7 36 58 PM](https://media.github.ibm.com/user/249834/files/14978246-fc74-4923-aec6-cb59d87f1529)

### If one of the boxes is empty, the status icon is a blue pizza slide within a blue circle
![Screenshot 2023-03-21 at 7 38 46 PM](https://media.github.ibm.com/user/249834/files/ee12aeea-54a4-41fb-b26d-71485295d702)

### If all boxes are filled in, the status icon is a green check
![Screenshot 2023-03-21 at 7 39 45 PM](https://media.github.ibm.com/user/249834/files/b4daa38c-5345-4357-994a-df98da681bb7)


# Dataflow
![Screenshot 2023-03-21 at 7 46 25 PM](https://media.github.ibm.com/user/249834/files/4bdb9e3e-df13-49d5-8ad0-75e8c7d8f292)
### Note: this project provides one kafka consumer & graphQL server implementation in nodejs and one in nestjs

# How to run
## Pre setup
* Follow this README https://github.ibm.com/Siqi-Liu/local-kafka-server to create a local kafka server

## To create a kafka consumer & graphQL server in nodejs
1. cd kafka-consumer-graphql-server-nodejs
2. npm start

## To create a kafka consumer & graphQL server in nodejs
1. cd kafka-consumer-graphql-server-nestjs
2. npm start

### Note: we can't run these two servers at the same time as they are using the same port

## To launch the kafka producer and graphQL client
* cd kafka-provider
* npm start
* cd graphql-client
* npm start

### Note: a webpage with address `http://localhost:3000/` should be automatically created on the browser with original behavior as
![Screenshot 2023-03-21 at 7 36 58 PM](https://media.github.ibm.com/user/249834/files/ba07206a-37a9-48d6-a376-efd2e5564fba)

## Now you can start playaround and enjoy!
