import 'dotenv/config';
import *  as joi from 'joi'



interface EnvsVars {
    PORT: number;
    DATABASE_URL: string;
} 

const envSchema = joi.object({
    PORT: joi.number().required(),
    DATABASE_URL: joi.string().required(),
}).unknown(true);
;

const { error, value } = envSchema.validate(process.env);

if(error) {
    throw new Error(`Config validation error: ${error.message}`);
}

export const envs: EnvsVars = { 
    PORT: value.PORT,
    DATABASE_URL: value.DATABASE_URL,
};