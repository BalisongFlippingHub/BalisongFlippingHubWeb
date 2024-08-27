import { useState } from "react"

interface params {
    setBalanceOnChange: Function    
}

const KnifeBalanceInput = ({ setBalanceOnChange }:params) => {
    const [balance, setBalance] = useState("2")

    const handleOnChange = (value: string) => {
        setBalance(value)
    }

    return (
        <div className="flex flex-col w-1/3 items-center">
            <label>Balance Point</label>
            <input 
            type="range"
            min="0"
            max="5"
            className="w-full"
            value={balance}
            onChange={(e) => handleOnChange(e.target.value)}
            />
            <p>{balance}</p>
        </div>
    )
}

export default KnifeBalanceInput