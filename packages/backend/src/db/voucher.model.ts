import { Schema, Document, model } from 'mongoose'

const voucherSchema = new Schema({
  // _id: {
  //   type: String,
  //   required: true,
  // },
  signerAddress: {
    type: String,
    required: true,
  },
  redeemerAddress: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  signature: {
    type: String,
    required: true,
  },
  minPrice: {
    type: Number,
    required: true,
  },
  isExecuted: {
    type: Boolean,
    default: false
  },
  error: {
    type: String
  }
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
})

interface Voucher {
  signerAddress: string
  redeemerAddress: string
  name: string
  signature: string
  isExecuted: boolean
  error: string
  minPrice: number
}

export interface VoucherDocument extends Voucher, Document { }

export const VoucherModel = model<VoucherDocument>('voucher', voucherSchema)

