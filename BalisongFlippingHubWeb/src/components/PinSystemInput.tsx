import { useRef, useState } from "react"
import { pinSystem } from "../comboBoxData/PinSystem"

interface params {
    setPinSystemOnChange: Function,
    parentPinSystem: string
}

const PinSystemInput = ({ setPinSystemOnChange, parentPinSystem }: params) => {
    const pinSystemRef = useRef<HTMLSelectElement>(null)
    
    const [pSystem, setPSystem] = useState(parentPinSystem)

    const handleOnChange = (value: string) => {
        setPSystem(value)
        setPinSystemOnChange(value)
        pinSystemRef.current?.blur()
    }

    return (
        <div className="flex gap-2 items-center">
            <label>Pin System:</label>

            <select 
            id="pinSystemList" 
            className="p-2 bg-inherit border-2 border-black" 
            onChange={(e) => handleOnChange(e.target.value)}
            ref={pinSystemRef}
            value={pSystem}
            >
            {
                pinSystem.map((value, i) => {
                    return (
                        <option className="text-black" key={i} value={value}>{value}</option>
                    )
                })
            }
            </select>
        </div>
    )
}

export default PinSystemInput