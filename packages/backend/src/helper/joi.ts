import { appError } from '@src/graphql/error'
import Joi from 'joi'

export const validateSchema = (schema: Joi.Schema, input: unknown): void => {
	const { error } = schema.validate(input, { abortEarly: true })
	if (error) {
		throw appError.buildInvalidSchemaError(error.toString())
	}
}

export const buildVoucherInputSchema = (): Joi.ObjectSchema =>
	Joi.object().keys({
		signerAddress: Joi.string().required(),
		name: Joi.string().required(),
		signature: Joi.string().required(),
		redeemerAddress: Joi.any(),
		minPrice: Joi.any().required()
	})