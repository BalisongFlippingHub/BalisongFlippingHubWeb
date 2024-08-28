import { useState } from "react"

interface params {
    setKnifeTypeOnChange: Function,
    parentKnifeType: string
}

const KnifeTypeInput = ({ setKnifeTypeOnChange, parentKnifeType }: params) => {
    const [_bladeType, setBladeType] = useState(parentKnifeType)
    
    const handleOnChange = (value: string) => {
        setBladeType(value)
        setKnifeTypeOnChange(value)
    }

    return (
        <div className="flex justify-evenly">
            <div className="flex flex-col">
                <label>Live Blade</label>
                {
                    parentKnifeType === "Live Blade"
                    ?
                    <input
                    type="radio"
                    name="bladeType"
                    value="Live Blade"
                    defaultChecked   
                    onChange={(e) => handleOnChange(e.target.value)}
                    />
                    :
                    <input
                    type="radio"
                    name="bladeType"
                    value="Live Blade"   
                    onChange={(e) => handleOnChange(e.target.value)}
                    />
                }
            </div>

            <div className="flex flex-col">
                <label>Trainer</label>
                {
                    parentKnifeType === "Trainer"
                    ?
                    <input
                    type="radio"
                    name="bladeType"
                    value="Trainer"
                    defaultChecked
                    onChange={(e) => handleOnChange(e.target.value)}
                    />
                :
                    <input
                    type="radio"
                    name="bladeType"
                    value="Trainer"
                    onChange={(e) => handleOnChange(e.target.value)}
                    />
                }
            </div>

            <div className="flex flex-col">
                <label>Both</label>
                {
                    parentKnifeType === "Both"
                    ?
                    <input 
                    type="radio"
                    name="bladeType" 
                    value="Both"
                    defaultChecked
                    onChange={(e) => handleOnChange(e.target.value)}
                    />
                    :
                    <input 
                    type="radio"
                    name="bladeType" 
                    value="Both"
                    onChange={(e) => handleOnChange(e.target.value)}
                    />
                }
            </div>
        </div>
    )
}

export default KnifeTypeInput