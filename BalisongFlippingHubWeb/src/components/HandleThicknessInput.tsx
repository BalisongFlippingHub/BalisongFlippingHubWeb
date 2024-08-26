import { useRef, useState } from "react"

interface params {
    setHandleThicknessOnChange: Function,
    parentHandleThickness: string
}

const HandleThicknessInput = ({ setHandleThicknessOnChange, parentHandleThickness }: params) => {
    const lengthInputRef = useRef<HTMLInputElement>(null)
    
    const [measureType, setMeasureType] = useState("In")
    const [length, setLength] = useState(parentHandleThickness)

    const handleOnChange = (value: string) => {
        setLength(value)
        if (measureType !== "In") {
            setHandleThicknessOnChange(((+value / 12).toFixed(1)).toString())
        }
        else {
            setHandleThicknessOnChange(((+value).toFixed(1)).toString())
        }
    }

    const onMeasureTypeChange = (value: string) => {
        if (measureType !== "In") {
            if (length !== "") setLength((prev) => ((+prev / 12).toFixed(1)).toString())
        }

        if (measureType !== "cm") {
            if (length !== "") setLength((prev) => ((+prev * 12).toFixed(0)).toString())
        }
        setMeasureType(value)
    }

    const handleOnBlur = () => {
        if (measureType === "In") {
            setLength((prev) => ((+prev).toFixed(1)).toString())
        }
        else {
            setLength((prev) => ((+prev).toFixed(0)).toString())
        }
    }

    return (
        <div className="flex gap-2 p-2">
            <label>Handle Thickness:</label>
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
            onChange={(e) => handleOnChange(e.target.value)}
            onBlur={() => handleOnBlur()}
            />

            <div className="flex gap-4 items-center">
                <div className="flex gap-1">
                    <input 
                    type="radio" 
                    name="handle-thickness-cm/handle-thickness-in" 
                    defaultChecked
                    value="In"
                    onChange={(e) => onMeasureTypeChange(e.target.value)}
                    />
                    <label>In</label>
                </div>

                <div className="flex gap-1">
                    <input 
                    type="radio"
                    name="handle-thickness-cm/handle-thickness-in" 
                    value="cm"
                    onChange={(e) => onMeasureTypeChange(e.target.value)}
                    />
                    <label>cm</label>
                </div>
            </div>
        </div>
    )
}

export default HandleThicknessInput