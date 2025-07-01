import { RedisClient } from "bun";


const client = new RedisClient();



export const redisConnect = async () => {
    try {
        await client.connect();
        console.log('connected to redis');

    } catch (error) {
        console.log('connected to redis', error);

    }
}



