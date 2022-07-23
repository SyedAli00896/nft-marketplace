import { gqlTypes } from '@src/defs'
import { joi } from '@src/helper'
import { voucherRepository } from '@src/db'
import { appError, voucherError } from '@src/graphql/error'
import { utils } from 'ethers'
import { domain, types } from '@src/blockchain/blockchain'

const getRedeemableVouchers = async (
	_: any
): Promise<gqlTypes.Voucher[]> => {
	return await voucherRepository.findBy({ redeemerAddress: null })
}

const createVoucher = async (
	_: any,
	{ input }: gqlTypes.MutationCreateVoucherArgs,
): Promise<boolean> => {
	const { name, signature, minPrice } = input

	joi.validateSchema(joi.buildVoucherInputSchema(), input)

	const address = utils.verifyTypedData(domain, types, { name, minPrice }, signature)
	if (address !== input.signerAddress) throw voucherError.buildInvalidSignatureError()

	try {
		const [nameExists, signatureExists] = await Promise.all([
			voucherRepository.doesExist({ name }),
			voucherRepository.doesExist({ signature }),
		])
		if (nameExists) throw voucherError.buildVoucherAlreadyExistsError()

		if (signatureExists) throw voucherError.buildSignatureAlreadyExistsError()
		await voucherRepository.create(input)
		return true
	} catch (error) {
		throw appError.buildCustomError(error.toString())
	}
}

export default {
	Query: {
		redeemableVouchers: getRedeemableVouchers,
	},
	Mutation: {
		createVoucher,
	},
}