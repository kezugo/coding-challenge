# Solution

### Messaging

Solution is based on Kafka transport as messaging layer. I did that choice because
of kafka performance and possibility to use kafka as storage mechanism as for event sourcing / cqrs then You dont need to setup db to fetch data in data-streams app. 

Of course if db persistance is needed is eaasily addable (see @TODO add db support here if needed in the code). Then fetch endpoint in
app.controller.ts may serve data from db instead from kafka.

### Common parts

Common parts are included in nest library common, generated with nest cli. 

### Db storage

Solution doesnt contain db storage. One of the reasons is I didnt have enough time to create it and i wanted to play around 
with kafka partitions and offsets. As mentioned earlier adding db to solution is easy, just add db write to message listener and then serve
data from db in fetch(). 

If I had to choose db solution, I'd go with ksqlDB or MongoDB or different noSQL db mostly because of potential
big amounts of data to store and potnetial options to scale up.

## How to use it

To start solution you have to:

Run kafka docker from kafka-docker folder
```
docker-compose --file ./docker-compose-single-broker.yml up
```

Kafka will run on port 9092 

in case of issues with broker id (getting leader during kafka startup) please run

```shell
docker-compose rm -vfs
```

then

```shell
yarn start
yarn start worker
```

to start data fetching from remote api use

```shell
curl --location --request POST 'http://localhost:3000/worker' \
--header 'Content-Type: application/json' \
--data-raw '{
  "command": "start"
}'
```

to stop data fetching use

```shell
curl --location --request POST 'http://localhost:3000/worker' \
--header 'Content-Type: application/json' \
--data-raw '{
  "command": "stop"
}'
```

If requests contain bad formed payload the error response will be sent. Data validated through dtos.

to get data that has not been downloaded yet, use

```shell
curl --location --request GET 'http://localhost:3000/data'
```

## What can be done more

1. Swagger UI to be added
2. Add tests
3. Potential DB Storage
4. Add worker status checks and appriopriate responses when starting / stoping worker
5. Better typescript compiling and checking (tsconfig, maybe swc to compile - not sure about decorators support at the moment)
