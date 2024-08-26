import { useRef, useState } from "react"
import { pinSystem } from "../comboBoxData/PinSystem"

interface params {
    setPinSystemOnChange: Function
}

const PinSystemInput = ({ setPinSystemOnChange }: params) => {
    const pinSystemRef = useRef<HTMLInputElement>(null)
    
    const [pSystem, setPSystem] = useState("")
    const [previousPSystem, setPreviousPSystem] = useState("Unknown")

    const handleOnChange = (value: string) => {
        setPSystem(value)
        setPinSystemOnChange(value)
        pinSystemRef.current?.blur()
    }

    const handleOnFocus = () => {
        setPreviousPSystem(pSystem)
        setPSystem("")
    }

    const handleOnBlur = () => {
        
    }

    return (
        <div className="flex gap-2">
            <label>Pin System:</label>
            <input 
            type="text" 
            list="pinSystemList"
            ref={pinSystemRef}
            value={pSystem}
            placeholder={previousPSystem}
            className="border-2 border-black bg-inherit"
            onChange={(e) => handleOnChange(e.target.value)}
            onFocus={() => handleOnFocus()}
            onBlur={() => handleOnBlur()}
            />

            <datalist id="pinSystemList">
            {
                pinSystem.map((value, i) => {
                    return (
                        <option key={i} value={value}>{value}</option>
                    )
                })
            }
            </datalist>
        </div>
    )
}

export default PinSystemInput