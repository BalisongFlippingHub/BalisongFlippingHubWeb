import { useRef, useState } from "react"
import { bladeFinish } from "../comboBoxData/BladeFinish"

interface params {
    setBladeFinishOnChange: Function,
    parentBladeFinish: string
}

const BladeFinishInput = ({ setBladeFinishOnChange, parentBladeFinish }: params) => {
    const bladeFinishRef = useRef<HTMLSelectElement>(null)
    
    const [bladeFinishState, setBladeFinishState] = useState(parentBladeFinish)

    const handleOnChange = (value: string) => {
        setBladeFinishState(value)
        setBladeFinishOnChange(value)
        bladeFinishRef.current?.blur()
    }

    return (
        <div className="flex gap-2 items-center">
            <label>Blade Finish</label>

            <select 
            className="bg-inherit p-2 border-2 border-black" 
            id="bladeFinishList"
            ref={bladeFinishRef}
            value={bladeFinishState}
            onChange={(e) => handleOnChange(e.target.value)}
            >
            {
                bladeFinish.map((value, i) => {
                    return (
                        <option className="text-black" key={i} value={value}>{value}</option>
                    )
                })
            }
            </select>
        </div>
    )
}

export default BladeFinishInput
