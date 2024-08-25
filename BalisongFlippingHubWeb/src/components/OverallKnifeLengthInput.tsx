import { useRef, useState } from "react"

interface params {
    setOverallLengthOnChange: Function
}
const OverallKnifeLengthInput = ({ setOverallLengthOnChange}: params) => {
    const lengthInputRef = useRef<HTMLInputElement>(null)
    
    const [measureType, setMeasureType] = useState("In")
    const [length, setLength] = useState("")

    const overallLengthOnChange = (value: string) => {
        setLength(value)
        if (measureType !== "In") {
            setOverallLengthOnChange((+value / 12).toString())
        }
        else {
            setOverallLengthOnChange(value)
        }
    }

    const onMeasureTypeChange = (value: string) => {
        if (measureType !== "In") {
            if (length !== "") setLength((prev) => (+prev / 12).toString())
        }

        if (measureType !== "cm") {
            if (length !== "") setLength((prev) => (+prev * 12).toString())
        }
        setMeasureType(value)
    }

    return (
        <div className="flex gap-2 p-2">
            <label>Overall Length:</label>
            <input 
            type="number"
            ref={lengthInputRef}
            value={length}
            placeholder={
                measureType === "In"
                ?
                "0.0" 
                :
                "0"
            }
            className="bg-inherit border-2 border-black w-16 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            onChange={(e) => overallLengthOnChange(e.target.value)}
            />

            <div className="flex gap-4 items-center">
                <div className="flex gap-1">
                    <input 
                    type="radio" 
                    name="cm/in" 
                    defaultChecked
                    value="In"
                    onChange={(e) => onMeasureTypeChange(e.target.value)}
                    />
                    <label>In</label>
                </div>

                <div className="flex gap-1">
                    <input 
                    type="radio" 
                    name="cm/in" 
                    value="cm"
                    onChange={(e) => onMeasureTypeChange(e.target.value)}
                    />
                    <label>cm</label>
                </div>
            </div>
        </div>
    )
}

export default OverallKnifeLengthInput