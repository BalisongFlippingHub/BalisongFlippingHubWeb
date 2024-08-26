import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import KnifeMSRPInput from "./KnifeMSRPInput";
import OverallKnifeLengthInput from "./OverallKnifeLengthInput";
import KnifeWeightInput from "./KnifeWeightInput";
import PivotSystemInput from "./PivotSystemInput";
import LatchTypeInput from "./LatchTypeInput";
import PinSystemInput from "./PinSystemInput";

const NewCollectionKnifeForm = () => {
    // refs
    // form refs required info
    const displayNameRef = useRef<HTMLInputElement>(null)

    const knifeMakerRef = useRef<HTMLInputElement>(null)
    const baseKnifeModelRef = useRef<HTMLInputElement>(null)

    const coverImageFileRef = useRef<HTMLInputElement>(null)

    const selectedDateRef = useRef<HTMLInputElement>(null)

    // form refs additional knife info

    // form refs rankings

    // form refs mod work

    // states
    // form state values required info
    const [displayName, setDisplayName] = useState("")
    const [knifeMaker, setKNifeMaker] = useState("")
    const [baseKnifeModel, setBaseKnifeModel] = useState("")

    const [knifeType, setKnifeType] = useState("Live Blade")

    const [selectedCoverFileName, setSelectedCoverFileName] = useState("")
    const [selectedCoverFile, setSelectedCoverFile] = useState<File | null>(null)

    const [selectedDate, setSelectedDate] = useState("")

    const [isFavoriteKnife, setIsFavoriteKnife] = useState(false)
    const [isFavoriteFlipper, setIsFavroiteFlipper] = useState(false)

    // form state values knife info
    const [knifeMSRP, setKnifeMSRP] = useState("")
    const [overallLength, setOverallLength] = useState("")
    const [knifeWeight, setKnifeWeight] = useState("")
    const [pivotSystem, setPivotSystem] = useState("")
    const [latchType, setLatchType] = useState("")
    const [pinSystem, setPinSystem] = useState("")

    // form state values rankings
    const [averageScore, setAverageScore] = useState<Number | null>(null)

    const [qualityScore, setQualityScore] = useState(5)
    const [flippingScore, setFlippingScore] = useState(5)
    const [feelScore, setFeelScore] = useState(5)
    const [soundScore, setSoundScore] = useState(5)
    const [durabilityScore, setDurabilityScore] = useState(5)

    // form state values mod work

    // additional state values
    const [displayAdditionalKnifeInfo, toggleDisplayAdditionalKnifeInfo] = useState(false)
    const [displayRankingsInfo, toggleDisplayRankingsInfo] = useState(false)
    const [displayModWork, toggleDisplayModWork] = useState(false)

    // on form submit
    const handleFormSubmit = (e:any) => {
        e.preventDefault()

        const obj = {
            displayName: displayName,
            knifeMaker: knifeMaker,
            baseKnifeModel: baseKnifeModel, 
            knifeType: knifeType,
            selectedCoverFile: selectedCoverFile,
            selectedDate: selectedDate,
            isFavoriteFlipper: isFavoriteFlipper,
            isFavoriteKnife: isFavoriteKnife,
            knifeMSRP: knifeMSRP,
            overallLength: overallLength,
            knifeWeight: knifeWeight,
            pivotSystem: pivotSystem, 
            latchType: latchType, 
            pinSystem: pinSystem
        }

        console.log("new knife obj: ", obj)
    }

    // on change functions
    const displayNameOnChange = (e:any) => {
        setDisplayName(e.target.value)
    }

    const knifeMakerOnChange = (e:any) => {
        setKNifeMaker(e.target.value)
    }

    const baseKnifeModelOnChange = (e:any) => {
        setBaseKnifeModel(e.target.value)
    }

    const selectedCoverFileOnChange = (e:any) => {
        setSelectedCoverFileName(e.target.value)
        setSelectedCoverFile(e.target.files[0])
    }

    const selectedDateOnChange = (e:any) => {
        setSelectedDate(e.target.value)
    }

    const bladeTypeOnChange = (e:any) => {
        setKnifeType(e.target.value)
    }

    const qualityScaleOnChange = (e:any) => {
        setQualityScore(e.target.value)
        if (averageScore == null) {
            setAverageScore(0)
        }
    }

    const flippingScaleOnChange = (e:any) => {
        setFlippingScore(e.target.value)
        if (averageScore == null) {
            setAverageScore(0)
        }
    }

    const feelScaleOnChange = (e:any) => {
        setFeelScore(e.target.value)
        if (averageScore == null) {
            setAverageScore(0)
        }
    }

    const soundScaleOnChange = (e:any) => {
        setSoundScore(e.target.value)
        if (averageScore == null) {
            setAverageScore(0)
        }
    }

    const durabilityScaleOnChange = (e:any) => {
        setDurabilityScore(e.target.value)
        if (averageScore == null) {
            setAverageScore(0)
        }
    }

    const setKnifeMSRPOnChange = (input: string) => {
        setKnifeMSRP(input)
    }  

    const setOverallLengthOnChange = (input: string) => {
        setOverallLength(input)
    }

    const setKnifeWeightOnChange = (input: string) => {
        setKnifeWeight(input)
    }

    const setPivotSystemOnChange = (input: string) => {
        setPivotSystem(input)
    }

    const setLatchTypeOnChange = (input: string) => {
        setLatchType(input)
    }

    const setPinSystemOnChange = (input: string) => {
        setPinSystem(input)
    }

    useEffect(() => {
        if (averageScore != null)
            setAverageScore((+qualityScore + +flippingScore + +feelScore + +soundScore + +durabilityScore) / 5)
    }, [qualityScore, flippingScore, feelScore, soundScore, durabilityScore])

    // on mount
    useEffect(() => {
        displayNameRef.current?.focus()
    }, [])

    return (
        <form className="w-1/2 rounded-lg border border-none bg-shadow-green-offset p-4 flex flex-col gap-3" onSubmit={handleFormSubmit}>
            {/*Form Title*/}
            <h2 className="border-b-2 pb-1 m-auto text-3xl">Add New Knife</h2>

            {/*Major Info*/}
            <div className="flex justify-between">
                <div className="w-full mr-4 flex flex-col gap-3">
                    {/*Display Name for new knife*/}
                    <div className="flex flex-col gap-1">
                        <label>Display Name:</label>
                        <input 
                        type="text" 
                        required
                        ref={displayNameRef}
                        value={displayName}
                        onChange={(e) => displayNameOnChange(e)}
                        className="text-black"
                         />
                    </div>

                    {/*Knife Manufactuer Info*/}
                    <div className="flex flex-col gap-1">
                        <h3>Manufactuer Info:</h3>

                        <div className="border border-dashed p-3 flex flex-col gap-2">
                            {/*Knife Manufactuer*/}
                            <div className="flex flex-col gap-1">
                                <label>Knife Maker:</label>
                                <input
                                type="text"
                                required 
                                ref={knifeMakerRef}
                                value={knifeMaker}
                                onChange={(e) => knifeMakerOnChange(e)}
                                className="text-black"
                                />
                            </div>

                            {/*Base Knife Model*/}
                            <div className="flex flex-col gap-1">
                                <label>Base Knife Model:</label>
                                <input
                                type="text"
                                required 
                                ref={baseKnifeModelRef}
                                value={baseKnifeModel}
                                onChange={(e) => baseKnifeModelOnChange(e)}
                                className="text-black"
                                />
                            </div>

                            {/*Radio Button Selection for Live Blade, Trainer, or Both*/}
                            <div className="flex justify-evenly">
                                <div className="flex flex-col">
                                    <label>Live Blade</label>
                                    <input
                                    type="radio"
                                    name="bladeType"
                                    value="Live Blade"
                                    defaultChecked
                                    onChange={(e) => bladeTypeOnChange(e)}
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <label>Trainer</label>
                                    <input
                                    type="radio"
                                    name="bladeType"
                                    value="Trainer"
                                    onChange={(e) => setKnifeType(e.target.value)}
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <label>Both</label>
                                    <input 
                                    type="radio"
                                    name="bladeType" 
                                    value="Both"
                                    onChange={(e) => setKnifeType(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    
                </div>

                {/*Cover Image Input and Display for Image*/}
                <div className="flex flex-col gap-2">
                    <div className="w-full h-60 rounded-lg border overflow-hidden">
                        {
                            !selectedCoverFile
                            ?
                            <div className="w-full h-full flex items-center justify-center">
                                Cover Photo
                            </div>
                            :
                            <img src={URL.createObjectURL(selectedCoverFile)} className="w-full h-full object-cover" />
                        }
                    </div>
                    <input
                    type="file"
                    required 
                    ref={coverImageFileRef}
                    value={selectedCoverFileName}
                    onChange={(e) => selectedCoverFileOnChange(e)}
                    accept="jpeg, png"
                    />
                </div>
            </div>

            <span className="w-full h-1 bg-white"></span>

            {/*Extra Required Knife Info*/}
            <div className="flex justify-between">
                {/*Aqquired Date*/}
                <div className="flex flex-col gap-2">
                    <label>Date Aqquired:</label>
                    <input
                    type="date"
                    value={selectedDate}
                    ref={selectedDateRef}
                    required
                    onChange={(e) => selectedDateOnChange(e)}
                    className="text-black"
                    />
                </div>

                <div className="flex flex-col justify-evenly">
                    <label>Mark as Favorite Knife</label>
                    <input
                    type="checkbox"
                    onChange={() => setIsFavoriteKnife((prev) => !prev)}
                    />
                </div>

                <div className="flex flex-col justify-evenly">
                    <label>Mark as Favorite Flipper</label>
                    <input
                    type="checkbox"
                    onChange={() => setIsFavroiteFlipper((prev) => !prev)}
                    />
                </div>
            </div>

            <span className="w-full h-1 bg-white"></span>

            {/*Additional Knife Info*/}
            <div>
                <div className="flex items-center gap-1 hover:cursor-pointer" onClick={() => toggleDisplayAdditionalKnifeInfo((prev) => !prev)}>
                    <h3>Additional Knife Info</h3>
                    {
                        !displayAdditionalKnifeInfo
                        ?
                        <FontAwesomeIcon icon={faChevronUp} />
                        :
                        <FontAwesomeIcon icon={faChevronDown} />
                    }
                </div>

                {
                    displayAdditionalKnifeInfo
                    ?
                    <div className="flex flex-col">
                        {/*Knife Specs*/}
                        <div className="flex flex-col items-center gap-2">
                            <div className="text-xl font-bold border-b w-full flex justify-center p-1">
                                <h4>Specs</h4>
                            </div> 

                            <KnifeMSRPInput setKnifeMSRPOnChange={setKnifeMSRPOnChange} />

                            <OverallKnifeLengthInput setOverallLengthOnChange={setOverallLengthOnChange} />

                            <KnifeWeightInput setKnifeWeightOnChange={setKnifeWeightOnChange} />

                            <PivotSystemInput setPivotSystemOnChange={setPivotSystemOnChange} />

                            <LatchTypeInput setLatchTypeOnChange={setLatchTypeOnChange} />

                            <PinSystemInput setPinSystemOnChange={setPinSystemOnChange} />
                        </div>

                        {/*Blade Info*/}
                        <div className="flex flex-col items-center">
                            <div className="text-xl font-bold border-b w-full flex justify-center p-1">
                                <h4>Blade</h4>
                            </div>

                            <div>
                                Blade Style
                            </div>

                            <div>
                                Blade Length
                            </div>

                            <div>
                                Blade Thickness
                            </div>

                            <div>
                                Blade Finish
                            </div>
                            
                            <div>
                                Blade Material
                            </div>
                        </div>

                        {/*Handles Info*/}
                        <div className="flex flex-col items-center">
                            <div className="text-xl font-bold border-b w-full flex justify-center p-1">
                                <h4>Handles</h4>
                            </div>

                            <div>
                                Handle Construction
                            </div>

                            <div>
                                Handle Material
                            </div>

                            <div>
                                Handle Finish
                            </div>

                            <div>
                                Handle Length
                            </div>

                            <div>
                                Handle Thickness
                            </div>
                        </div>
                    </div>
                    :
                    <></>
                }
            </div>

            <span className="w-full h-1 bg-white"></span>

            {/*Rankings*/}
            <div>
                <div className="flex items-center gap-1 hover:cursor-pointer" onClick={() => toggleDisplayRankingsInfo((prev) => !prev)}>
                    <h3>Rankings</h3>
                    {
                        !displayRankingsInfo
                        ?
                        <FontAwesomeIcon icon={faChevronUp} />
                        :
                        <FontAwesomeIcon icon={faChevronDown} />
                    }
                </div>

                {
                    displayRankingsInfo
                    ?
                    <div className="w-full flex flex-col">
                        {/*Overall Score*/}
                        <div className="flex flex-col items-center justify-center gap-1">
                            <h5>Overall Score</h5>
                            <h6>{averageScore == null ? "-" : averageScore.toString()}/10</h6>
                        </div>

                        {/*Quality Scale*/}
                        <div className="flex flex-col items-center">
                            <label>Quality</label>
                            <h3>{qualityScore}</h3>
                            <div className="w-full flex justify-evenly items-center gap-2">
                                <h6>Poor</h6>
                                <input type="range" className="w-full" min={0} max={10} value={qualityScore} onChange={(e) => {qualityScaleOnChange(e)}} />
                                <h6>Fantastic</h6>
                            </div>
                        </div>

                        {/*Flippability Scale*/}
                        <div className="flex flex-col items-center">
                            <label>Flipping</label>
                            <h3>{flippingScore}</h3>
                            <div className="w-full flex justify-evenly items-center gap-2">
                                <h6>Poor</h6>
                                <input type="range" className="w-full" min={0} max={10} value={flippingScore} onChange={(e) => {flippingScaleOnChange(e)}} />
                                <h6>Fantastic</h6>
                            </div>
                        </div>

                        {/*Feel Scale*/}
                        <div className="flex flex-col items-center">
                            <label>Feel</label>
                            <h3>{feelScore}</h3>
                            <div className="w-full flex justify-evenly items-center gap-2">
                                <h6>Poor</h6>
                                <input type="range" className="w-full" min={0} max={10} value={feelScore} onChange={(e) => {feelScaleOnChange(e)}} />
                                <h6>Fantastic</h6>
                            </div>
                        </div>

                        {/*Sound Scale*/}
                        <div className="flex flex-col items-center">
                            <label>Sound</label>
                            <h3>{soundScore}</h3>
                            <div className="w-full flex justify-evenly items-center gap-2">
                                <h6>Poor</h6>
                                <input type="range" className="w-full" min={0} max={10} value={soundScore} onChange={(e) => {soundScaleOnChange(e)}} />
                                <h6>Fantastic</h6>
                            </div>
                        </div>

                        {/*Durability Scale*/}
                        <div className="flex flex-col items-center">
                            <label>Durability</label>
                            <h3>{durabilityScore}</h3>
                            <div className="w-full flex justify-evenly items-center gap-2">
                                <h6>Poor</h6>
                                <input type="range" className="w-full" min={0} max={10} value={durabilityScore} onChange={(e) => {durabilityScaleOnChange(e)}} />
                                <h6>Fantastic</h6>
                            </div>
                        </div>
                    </div>
                    :
                    <></>
                }
            </div>

            <span className="w-full h-1 bg-white"></span>

            {/*Mod Work*/}
            <div>
                <div className="flex items-center gap-1 hover:cursor-pointer" onClick={() => toggleDisplayModWork((prev) => !prev)}>
                    <h3>Mod Work</h3>
                    {
                        !displayModWork
                        ?
                        <FontAwesomeIcon icon={faChevronUp} />
                        :
                        <FontAwesomeIcon icon={faChevronDown} />
                    }
                </div>

                {
                    displayModWork
                    ?
                    <>
                        display
                    </>
                    :
                    <></>
                }
            </div>

            <span className="w-full h-1 bg-white"></span>
            
            
            {/*Submit Button*/}
            {
                !(displayName === "" || knifeMaker === "" || baseKnifeModel === "" || selectedCoverFileName === "" || selectedCoverFile === null || selectedDate === "")
                ?
                <button type="submit" className="bg-shadow w-1/3 m-auto p-2 rounded">Submit</button>
                :
                <button type="submit" disabled className="bg-shadow w-1/3 m-auto p-2 rounded">Submit</button>
            }
        </form>
    )
}

export default NewCollectionKnifeForm;