import { useRef, useState } from "react"

interface params {
    setKnifeWeightOnChange: Function
}

const KnifeWeightInput = ({ setKnifeWeightOnChange}: params) => {
    const weightInputRef = useRef<HTMLInputElement>(null)

    const [weight, setWeight] = useState("")
    const [weightType, setWeightType] = useState("oz")

    const onWeightChange = (value: string) => {
        
        setWeight(value)
        if (weightType !== "oz") {
            setKnifeWeightOnChange((+value / 28.35).toString())
        }
        else {
            setKnifeWeightOnChange(value)
        }
    }     

    const onWeightTypeChange = (value:string) => {
        if (weightType !== "oz") {
            if (weight !== "") setWeight((prev) => (+prev / 28.35).toString())
        }

        if (weightType !== "g") {
            if (weight !== "") setWeight((prev) => (+prev * 28.35).toString())
        }
        setWeightType(value)
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