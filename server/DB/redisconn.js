import { createClient } from 'redis';

export const redisClient = createClient({
    username: 'default',
    password: 'rZeDI43UTq50iGXhvrsopX6r7BmtaNTt',
    socket: {
        host: 'redis-17902.crce206.ap-south-1-1.ec2.redns.redis-cloud.com',
        port: 17902
    }
});

redisClient.on('error', err => console.log('Redis Client Error', err));

export async function redisConnect(){
    try{
        await redisClient.connect();
        console.log("connected to redis db");
    }catch(err){
        console.log("error when trying to connect to redis db",err)
    }
}

export async function redisCheck(){
    await redisClient.set('foo', 'bar');
    const result = await redisClient.get('foo');
    console.log("redis result:",result)  
}


