import { useRef, useState } from "react"
import { latchType } from "../comboBoxData/LatchType"

interface params {
    setLatchTypeOnChange: Function
}

const LatchTypeInput = ({ setLatchTypeOnChange }: params) => {
    const LatchTypeRef = useRef<HTMLInputElement>(null)
    
    const [lType, setlType] = useState("")
    const [previousLType, setPreviousLType] = useState("Unknown")

    const handleOnChange = (value: string) => {
        setlType(value)
        setLatchTypeOnChange(value)
        LatchTypeRef.current?.blur()
    }

    const handleOnFocus = () => {
        setPreviousLType(lType)
        setlType("")
    }

    const handleOnBlur = () => {
        
    }

    return (
        <div className="flex gap-2">
            <label>Latch Type:</label>
            <input 
            type="text" 
            list="latchTypeList"
            ref={LatchTypeRef}
            value={lType}
            placeholder={previousLType}
            className="border-2 border-black bg-inherit"
            onChange={(e) => handleOnChange(e.target.value)}
            onFocus={() => handleOnFocus()}
            onBlur={() => handleOnBlur()}
            />

            <datalist id="latchTypeList">
            {
                latchType.map((value, i) => {
                    return (
                        <option key={i} value={value}>{value}</option>
                    )
                })
            }
            </datalist>
        </div>
    )
}

export default LatchTypeInput