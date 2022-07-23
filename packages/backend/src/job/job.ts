import Bull from 'bull'

import { redisConfig } from '@src/env'
import { executeTransactions } from '@src/job/handler'
let transaction: Bull.Queue;
export const startAndListenJob = async (): Promise<void> => {
	transaction = new Bull('transaction', {
		redis: redisConfig,
		defaultJobOptions: { repeat: { every: 60000 } } 	// repeat every minute ,
	})
	transaction.add({})
	transaction.process(executeTransactions)
	console.log('Start listening for jobs :)!!')
}

export const stopAndDisconnect = async (): Promise<any> => {
	await transaction.empty()
	return transaction.close()
}
