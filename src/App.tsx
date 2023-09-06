import { useState } from "react"
import "./App.css"
import { cards } from "./config"

function App() {
	const [amount, setAmount] = useState(0)
	const [amountUsed, setAmountUsed] = useState(0)

	return (
		<div>
			<label>Amount</label>
			<input
				type="number"
				onChange={(e) => setAmount(Number(e.target.value))}
			/>
			<label>Amount Used</label>
			<input
				type="number"
				onChange={(e) => setAmountUsed(Number(e.target.value))}
			/>
			{cards.map((card) => {
				return (
					<div key={card.name}>
						<h2>{card.name}</h2>
						<p>{card.calculateCashback(amount, amountUsed)}</p>
					</div>
				)
			})}
		</div>
	)
}

export default App
