import 'dotenv/config';
import *  as joi from 'joi'



interface EnvsVars {
    NATS_HOSTS: string[];
    DATABASE_URL: string;
} 

const envSchema = joi.object({
    NATS_HOSTS: joi.array().items(joi.string()).required(),
    DATABASE_URL: joi.string().required(),
}).unknown(true);
;

const { error, value } = envSchema.validate({
    ...process.env, 
    NATS_HOSTS: process.env.NATS_HOSTS.split(','),
});

if(error) {
    throw new Error(`Config validation error: ${error.message}`);
}

export const envs: EnvsVars = { 
    NATS_HOSTS: value.NATS_HOSTS,
    DATABASE_URL: value.DATABASE_URL,
};