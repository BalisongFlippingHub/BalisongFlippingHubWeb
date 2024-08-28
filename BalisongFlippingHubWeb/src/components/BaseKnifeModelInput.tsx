import { useEffect, useState } from "react"

interface params {
    setBaseKnifeModelOnChange: Function,
    parentBaseKnifeModel: string
}

const BaseKnifeModelInput = ({ setBaseKnifeModelOnChange, parentBaseKnifeModel }:params) => {
    const [baseKnifeModel, setBaseKnifeModel] = useState(parentBaseKnifeModel)

    const handleOnChange = (value: string) => {
        setBaseKnifeModel(value)
        setBaseKnifeModelOnChange(value)
    }

    useEffect(() => {
        setBaseKnifeModel(parentBaseKnifeModel)
    },[parentBaseKnifeModel])

    return (
        <div className="flex flex-col gap-1">
            <label>Base Knife Model:</label>
            <input 
            type="text" 
            required
            value={baseKnifeModel}
            onChange={(e) => handleOnChange(e.target.value)}
            className="text-black"
            />
        </div>
    )
}

export default BaseKnifeModelInput