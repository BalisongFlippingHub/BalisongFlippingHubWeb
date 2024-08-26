import { useRef, useState } from "react"

interface params {
    setBladeThicknessOnChange: Function,
    parentBladeThickness: string
}

const BladeThicknessInput = ({ setBladeThicknessOnChange, parentBladeThickness }: params) => {
    const thicknessInputRef = useRef<HTMLInputElement>(null)
    
    const [measureType, setMeasureType] = useState("In")
    const [thickness, setThickness] = useState(parentBladeThickness)

    const handleOnChange = (value: string) => {
        setThickness(value)
        if (measureType !== "In") {
            setBladeThicknessOnChange(((+value / 12).toFixed(1)).toString())
        }
        else {
            setBladeThicknessOnChange(((+value).toFixed(1)).toString())
        }
    }

    const onMeasureTypeChange = (value: string) => {
        if (measureType !== "In") {
            if (thickness !== "") setThickness((prev) => ((+prev / 12).toFixed(1)).toString())
        }

        if (measureType !== "cm") {
            if (thickness !== "") setThickness((prev) => ((+prev * 12).toFixed(0)).toString())
        }
        setMeasureType(value)
    }

    const handleOnBlur = () => {
        if (measureType === "In") {
            setThickness((prev) => ((+prev).toFixed(1)).toString())
        }
        else {
            setThickness((prev) => ((+prev).toFixed(0)).toString())
        }
    }

    return (
        <div className="flex gap-2 p-2">
            <label>Blade thickness:</label>
            <input 
            type="number"
            ref={thicknessInputRef}
            value={thickness}
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
                    name="blade-thickness-cm/blade-thickness-in" 
                    defaultChecked
                    value="In"
                    onChange={(e) => onMeasureTypeChange(e.target.value)}
                    />
                    <label>In</label>
                </div>

                <div className="flex gap-1">
                    <input 
                    type="radio"
                    name="blade-thickness-cm/blade-thickness-in" 
                    value="cm"
                    onChange={(e) => onMeasureTypeChange(e.target.value)}
                    />
                    <label>cm</label>
                </div>
            </div>
        </div>
    )
}

export default BladeThicknessInput