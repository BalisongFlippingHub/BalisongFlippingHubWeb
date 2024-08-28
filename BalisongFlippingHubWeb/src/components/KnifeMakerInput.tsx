import { useEffect, useState } from "react"

interface params {
    setKnifeMakerOnChange: Function,
    parentKnifeMaker: string
}

const KnifeMakerInput = ({ setKnifeMakerOnChange, parentKnifeMaker }:params) => {
    const [knifeMaker, setKnifeMaker] = useState(parentKnifeMaker)

    const handleOnChange = (value: string) => {
        setKnifeMaker(value)
        setKnifeMakerOnChange(value)
    }

    useEffect(() => {
        setKnifeMaker(parentKnifeMaker)
    },[parentKnifeMaker])

    return (
        <div className="flex flex-col gap-1">
            <label>Knife Maker:</label>
            <input 
            type="text" 
            required
            value={knifeMaker}
            onChange={(e) => handleOnChange(e.target.value)}
            className="text-black"
            />
        </div>
    )
}

export default KnifeMakerInput