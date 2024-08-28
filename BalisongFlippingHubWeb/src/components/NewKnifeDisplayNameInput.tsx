import { useEffect, useState } from "react"

interface params {
    setDisplayNameOnChange: Function,
    parentDisplayName: string
}

const NewKnifeDisplayNameInput = ({ setDisplayNameOnChange, parentDisplayName }:params) => {
    const [displayName, setDisplayName] = useState("")

    const handleOnChange = (value: string) => {
        setDisplayName(value)
        setDisplayNameOnChange(value)
    }

    useEffect(() => {
        setDisplayName(parentDisplayName)
    }, [parentDisplayName])

    return (
        <div className="flex flex-col gap-1">
            <label>Display Name:</label>
            <input 
            type="text" 
            required
            value={displayName}
            onChange={(e) => handleOnChange(e.target.value)}
            className="text-black"
            />
        </div>
    )
}

export default NewKnifeDisplayNameInput