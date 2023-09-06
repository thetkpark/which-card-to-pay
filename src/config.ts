/* eslint-disable @typescript-eslint/no-unused-vars */
export enum CardType {
	CASHBACK = "CASHBACK",
	REWARDS = "REWARDS"
}

export const cards = [
	{
		name: "CITI Rewards",
		type: CardType.REWARDS,
		calculateCashback: (amount: number, amountUsed: number): number => {
			const leftBonus = 20000 - amountUsed
			let point = 0
			if (amount > leftBonus) point += Math.floor(Math.abs(leftBonus) / 25) * 5
			else point += Math.floor(Math.abs(amount) / 25) * 5
			const exceedAmount = amount - leftBonus
			if (exceedAmount > 0) {
				point += Math.floor(Math.abs(exceedAmount) / 25) * 2
			}
			return Math.floor(point / 11)
		}
	},
	{
		name: "Kasikorn LINE Point",
		type: CardType.CASHBACK,
		calculateCashback: (amount: number, _amountUsed: number): number => {
			return Math.floor(amount / 100)
		}
	},
	{
		name: "KTC",
		type: CardType.REWARDS,
		calculateCashback: (amount: number, _amountUsed: number): number => {
			return Math.floor(amount / 25) / 10
		}
	},
	{
		name: "Kasikorn Shopee",
		type: CardType.REWARDS,
		calculateCashback: (amount: number, amountUsed: number): number => {
			const totalAmount = amount + amountUsed
			const calculateStagePoint = (amount: number, xbonus: number): number => {
				return Math.floor(amount / 25) * xbonus
			}
			const stages = [0, 0, 0]
			if (amountUsed < 5000) {
				stages[0] = Math.min(amount, 5000 - amountUsed)
				amount -= stages[0]
				stages[1] = Math.min(amount, 5000)
				amount -= stages[1]
			} else if (amountUsed < 10000) {
				stages[1] = Math.min(amount, 10000 - amountUsed)
				amount -= stages[1]
			}
			stages[2] = amount

			let stageXBonus = [5, 1, 1]
			if (totalAmount > 10000) stageXBonus = [5, 10, 1]
			const point = stages.reduce(
				(prev, amount, i) => prev + calculateStagePoint(amount, stageXBonus[i]),
				0
			)
			return Math.floor(point / 10)
		}
	}
]
