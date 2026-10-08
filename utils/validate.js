import {ApiError} from './app_error.js';

export const validate = (schema)=>{
    return (req,res,next)=>{
        const validateSchema = schema.safeParse(req.body);
        if(validateSchema.success===false){
            next(new ApiError(validateSchema.error.issues.map((e)=>e.message).join(", "),400));
        }else{
            next();
        }
    };
}