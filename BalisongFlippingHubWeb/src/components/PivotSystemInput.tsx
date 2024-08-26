import { useRef, useState } from "react"
import { pivotSystem } from "../comboBoxData/PivotSystem"

interface params {
    setPivotSystemOnChange: Function,
    parentPivotSystem: string
}

const PivotSystemInput = ({ setPivotSystemOnChange, parentPivotSystem }: params) => {
    const pivotSystemRef = useRef<HTMLSelectElement>(null)
    
    const [pSystem, setPSystem] = useState(parentPivotSystem)

    const handleOnChange = (value: string) => {
        setPSystem(value)
        setPivotSystemOnChange(value)
        pivotSystemRef.current?.blur()
    }

    return (
        <div className="flex gap-2 items-center">
            <label>Pivot System:</label>

            <select 
            id="pivotList"
            className="bg-inherit p-2 border-2 border-black"
            value={pSystem}
            ref={pivotSystemRef}
            onChange={(e) => handleOnChange(e.target.value)}
            >
            {
                pivotSystem.map((value, i) => {
                    return (
                        <option className="text-black" key={i} value={value}>{value}</option>
                    )
                })
            }
            </select>
        </div>
    )
}

export default PivotSystemInput