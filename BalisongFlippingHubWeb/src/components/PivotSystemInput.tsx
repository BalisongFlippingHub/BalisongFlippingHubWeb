import { useRef, useState } from "react"
import { pivotSystem } from "../comboBoxData/PivotSystem"

interface params {
    setPivotSystemOnChange: Function
}

const PivotSystemInput = ({ setPivotSystemOnChange }: params) => {
    const pivotSystemRef = useRef<HTMLInputElement>(null)
    
    const [pSystem, setPSystem] = useState("")
    const [previousPSystem, setPreviousPSystem] = useState("Unknown")

    const handleOnChange = (value: string) => {
        setPSystem(value)
        setPivotSystemOnChange(value)
        pivotSystemRef.current?.blur()
    }

    const handleOnFocus = () => {
        setPreviousPSystem(pSystem)
        setPSystem("")
    }

    const handleOnBlur = () => {
        
    }

    return (
        <div className="flex gap-2">
            <label>Pivot System:</label>
            <input 
            type="text" 
            list="pivotList"
            ref={pivotSystemRef}
            value={pSystem}
            placeholder={previousPSystem}
            className="border-2 border-black bg-inherit"
            onChange={(e) => handleOnChange(e.target.value)}
            onFocus={() => handleOnFocus()}
            onBlur={() => handleOnBlur()}
            />

            <datalist id="pivotList">
            {
                pivotSystem.map((value, i) => {
                    return (
                        <option key={i} value={value}>{value}</option>
                    )
                })
            }
            </datalist>
        </div>
    )
}

export default PivotSystemInput