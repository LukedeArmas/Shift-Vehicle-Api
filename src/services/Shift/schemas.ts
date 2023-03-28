import Joi from 'joi';


export const createShiftSchema = Joi.object({
        employeeId: Joi.string().required(),
        vehicles: Joi.array().items(Joi.string()).required(),
        lat: Joi.number().required(),
        long: Joi.number().required(),
        start_time: Joi.string().isoDate().required(),
        end_time: Joi.string().isoDate().required(),
    }).required()