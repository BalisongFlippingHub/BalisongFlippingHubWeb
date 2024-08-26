import { useRef, useState } from "react"
import { handleMaterial } from "../comboBoxData/HandleMaterial"

interface params {
    setHandleMaterialOnChange: Function,
    parentHandleMaterial: string
}

const HandleMaterialInput = ({ setHandleMaterialOnChange, parentHandleMaterial }: params) => {
    const handleMaterialRef = useRef<HTMLSelectElement>(null)
    
    const [handleMaterialState, setHandleMaterialState] = useState(parentHandleMaterial)
    
    const handleOnChange = (value: string) => {
        setHandleMaterialState(value)
        setHandleMaterialOnChange(value)
        handleMaterialRef.current?.blur()
    }

    return (
        <div className="flex gap-2 items-center">
            <label>Handle Material</label>

            <select 
            className="bg-inherit p-2 border-2 border-black" 
            id="handleMaterialList"
            ref={handleMaterialRef}
            value={handleMaterialState}
            onChange={(e) => handleOnChange(e.target.value)}
            >
            {
                handleMaterial.map((value, i) => {
                    return (
                        <option className="text-black" key={i} value={value}>{value}</option>
                    )
                })
            }
            </select>
        </div>
    )
}

export default HandleMaterialInput
