import type { ValidationError } from 'joi';


export const convertJoiErrorMessage = (error: ValidationError) => error.details.map(el => el.message.replace(/"/g,"'")).join(',');