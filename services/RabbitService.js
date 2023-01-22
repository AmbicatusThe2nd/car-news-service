const amqplib = require('amqplib');
const util = require('util');

require("dotenv").config(); // Primer: process.env.SERVER_AUTH_API_URL

const Produce = async (message) => {
    const amqlUrl = util.format('amqp://%s:%s@%s:%s/%s', 
    process.env.RABBIT_USER, process.env.RABBIT_PWD, process.env.RABBIT_HOST_SERVER, process.env.RABBIT_PORT, "");

    console.log("Publishing");
    console.log('URL:', amqlUrl);
    const connection = await amqplib.connect(amqlUrl, "heartbeat=60");
    const channel = await connection.createChannel();
    await channel.assertExchange(process.env.RABBIT_EXCHANGE, 'direct', {durable: true}).catch(console.error);
    await channel.assertQueue(process.env.RABBIT_QUEUE, {durable: true});
    await channel.bindQueue(process.env.RABBIT_QUEUE, process.env.RABBIT_EXCHANGE, process.env.RABBIT_ROUTING_KEY);
    await channel.publish(process.env.RABBIT_EXCHANGE, process.env.RABBIT_ROUTING_KEY, Buffer.from(message));

    console.log('The log has been written');
    console.log(message);

    setTimeout(() => {
        channel.close();
        connection.close();
    }, 500);
}

module.exports = Produce;

