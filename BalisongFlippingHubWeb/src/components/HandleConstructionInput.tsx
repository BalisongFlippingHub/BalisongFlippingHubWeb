import { useRef, useState } from "react"
import { handleConstruction } from "../comboBoxData/HandleConstruction"

interface params {
    setHandleConstructionOnChange: Function,
    parentHandleConstruction: string
}

const HandleConstructionInput = ({ setHandleConstructionOnChange, parentHandleConstruction }: params) => {
    const handleConstructionRef = useRef<HTMLSelectElement>(null)

    const [handleConstructionState, setHandleConstructionState] = useState(parentHandleConstruction)
    
    const handleOnChange = (value: string) => {
        setHandleConstructionState(value)
        setHandleConstructionOnChange(value)
        handleConstructionRef.current?.blur()
    }

    return (
        <div className="flex gap-2 items-center">
            <label>Handle Construction</label>

            <select 
            className="bg-inherit p-2 border-2 border-black" 
            id="handleConstructionList"
            ref={handleConstructionRef}
            value={handleConstructionState}
            onChange={(e) => handleOnChange(e.target.value)}
            >
            {
                handleConstruction.map((value, i) => {
                    return (
                        <option className="text-black" key={i} value={value}>{value}</option>
                    )
                })
            }
            </select>
        </div>
    )
}

export default HandleConstructionInput
