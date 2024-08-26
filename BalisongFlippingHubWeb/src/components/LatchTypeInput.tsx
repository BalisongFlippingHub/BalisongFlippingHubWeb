import { useRef, useState } from "react"
import { latchType } from "../comboBoxData/LatchType"

interface params {
    setLatchTypeOnChange: Function
}

const LatchTypeInput = ({ setLatchTypeOnChange }: params) => {
    const latchTypeRef = useRef<HTMLInputElement>(null)
    
    const [lType, setlType] = useState("Unknown")

    const handleOnChange = (value: string) => {
        setlType(value)
        setLatchTypeOnChange(value)
        latchTypeRef.current?.blur()
    }


    return (
        <div className="flex gap-2 items-center">
            <label>Latch Type:</label>

            <select 
            id="latchTypeList"
            value={lType}
            className="bg-inherit p-2 border-2 border-black"
            onChange={(e) => handleOnChange(e.target.value)}
            >
            {
                latchType.map((value, i) => {
                    return (
                        <option className="text-black" key={i} value={value}>{value}</option>
                    )
                })
            }
            </select>
        </div>
    )
}

export default LatchTypeInput