import { Job } from 'bull'

import { voucherRepository } from '@src/db'
import { contract } from '@src/blockchain/blockchain'

export const executeTransactions = async (job: Job): Promise<any> => {
  const vouchers = await voucherRepository.findManyByExecution()
  console.log(vouchers.length)
  for (let voucher of vouchers) {
    const { redeemerAddress, name, signature, minPrice, signerAddress } = voucher
    let updatedVoucher;
    try {
      await contract.createVoucher([minPrice, name, signature])
      updatedVoucher = {
        signerAddress,
        redeemerAddress,
        name,
        signature,
        minPrice
      }
      const voucherUp = await voucherRepository.updateById(
        voucher.id,
        {
          ...updatedVoucher,
          isExecuted: true,
          error: ''
        }
      )
      await voucherUp.save()
    } catch (error) {
      await voucherRepository.updateById(
        voucher.id,
        {
          ...updatedVoucher,
          isExecuted: true,
          error: error.toString()
        }
      )
    }
  }
}
