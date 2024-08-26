import { useRef, useState } from "react"

interface params {
    setKnifeWeightOnChange: Function
}

const KnifeWeightInput = ({ setKnifeWeightOnChange}: params) => {
    const weightInputRef = useRef<HTMLInputElement>(null)

    const [weight, setWeight] = useState("")
    const [weightType, setWeightType] = useState("oz")

    const checkDecimalValue = (value: string) => {
        let i = value.indexOf('.')
        if (value[i + 2] === '0')
            return ((+value).toFixed(1).toString())

        return value
    }

    const onWeightChange = (value: string) => {
        
        setWeight(value)
        if (weightType !== "oz") {
            setKnifeWeightOnChange(checkDecimalValue((+value / 28.35).toFixed(2).toString()))
        }
        else {
            setKnifeWeightOnChange(checkDecimalValue((+value).toFixed(2).toString()))
        }
    }     

    const onWeightTypeChange = (value:string) => {
        if (weightType !== "oz") {
            if (weight !== "") setWeight((prev) => checkDecimalValue((+prev / 28.35).toFixed(2).toString()))
        }

        if (weightType !== "g") {
            if (weight !== "") setWeight((prev) => checkDecimalValue((+prev * 28.35).toFixed(2).toString()))
        }
        setWeightType(value)
    }

    const handleOnBlur = () => {
        if (weight !== checkDecimalValue((+weight).toFixed(2).toString())) 
            setWeight((prev) => checkDecimalValue((+prev).toFixed(2).toString()))
    }

    return (
        <div className="flex gap-2 p-2">
            <label>Weight:</label>
            <input 
            type="number"
            ref={weightInputRef}
            value={weight}
            placeholder="0.0"
            className="bg-inherit border-2 border-black w-16 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            onChange={(e) => onWeightChange(e.target.value)}
            onBlur={() => handleOnBlur()}
            />

            <div className="flex gap-4 items-center">
                <div className="flex gap-1">
                    <input 
                    type="radio" 
                    name="oz/g" 
                    defaultChecked
                    value="oz"
                    onChange={(e) => onWeightTypeChange(e.target.value)}
                    />
                    <label>oz</label>
                </div>

                <div className="flex gap-1">
                    <input 
                    type="radio" 
                    name="oz/g" 
                    value="g"
                    onChange={(e) => onWeightTypeChange(e.target.value)}
                    />
                    <label>g</label>
                </div>
            </div>
        </div>
    )
}

export default KnifeWeightInput