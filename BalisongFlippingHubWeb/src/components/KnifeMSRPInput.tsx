
interface params {
    setKnifeMSRPOnChange: Function
}
const KnifeMSRPInput = ({ setKnifeMSRPOnChange }: params) => {

    const msrpOnChange = (value: string) => {
        setKnifeMSRPOnChange(value)
    }

    return (
        <div className="flex p-2 gap-1">
            <label>MSRP: </label>

            <div className="relative">
                <input 
                type="number"
                className="bg-inherit border-2 border-black pl-5 w-24 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                onChange={(e) => msrpOnChange(e.target.value)}
                placeholder="0.0"
                />

                <p className="absolute top-0 left-2">$</p>
            </div>

            <div>
                *USD
            </div>
        </div>
    )
}

export default KnifeMSRPInput