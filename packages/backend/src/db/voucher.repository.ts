import { FilterQuery } from 'mongoose'

import { VoucherDocument, VoucherModel } from './voucher.model'

export const create = async (newVoucher: Partial<VoucherDocument>): Promise<VoucherDocument> => {
	const voucher = new VoucherModel(newVoucher)
	await voucher.validate()
	return await voucher.save()
}
export const findById = async (id: string): Promise<VoucherDocument> =>
	await VoucherModel.findById(id)

export const findBy = async (filter: FilterQuery<VoucherDocument>): Promise<VoucherDocument[]> =>
	await VoucherModel.find(filter)

export const findManyByExecution = async (): Promise<VoucherDocument[]> =>
	await VoucherModel.find({ isExecuted: false })

export const doesExist = async (filter: FilterQuery<VoucherDocument>): Promise<boolean> =>
	await VoucherModel.exists(filter)

export const updateById = async (
	id: string,
	voucher: Partial<VoucherDocument>,
	upsert = false
): Promise<VoucherDocument> => await VoucherModel.findByIdAndUpdate(id, voucher, { upsert })

export const deleteById = async (id: string): Promise<boolean> => {
	await VoucherModel.findByIdAndDelete(id)
	return true
}
