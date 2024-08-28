import { useState } from "react";
import NewCollectionKnifeForm from "../components/NewCollectionKnifeForm";

const AddNewKnifeToCollectionPage = () => {
    const [newKnifeStep, setNewKnifeStep] = useState("1")
    const [newKnifeObj, setNewKnifeObj] = useState<CollectionKnifeDTO | null>(null)
    const [formNotReady, setFormNotReady] = useState(true)
    
    const setNewKnifeObjOnSubmit = (obj: CollectionKnifeDTO) => {
        setNewKnifeObj(obj)
        setFormNotReady(false)
        setNewKnifeStep((prev) => (+prev + 1).toString())
    }

    const setFormNotReadyOnChange = () => {
        setFormNotReady(true)
    }

    return (
        <section className="w-full h-full flex justify-center items-center bg-shadow-green relative">
            {
                newKnifeStep === "1"
                ?
                <NewCollectionKnifeForm setNewKnifeObjOnSubmit={setNewKnifeObjOnSubmit} collectionKnifeObj={newKnifeObj} setFormNotReadyOnChange={setFormNotReadyOnChange} />
                :
                <></>
            }

            <div className="absolute top-0 left-0 bg-shadow">
                <button type="button" onClick={() => setNewKnifeStep("1")} className={
                    newKnifeStep === "1"
                    ?
                    "flex gap-1 items-center p-2 bg-shadow-green-offset w-full"
                    :
                    "flex gap-1 items-center p-2 w-full"
                }>
                    <h2 className="rounded-full border w-7 h-7 text-center">1</h2>
                    <p>Form</p>
                </button>

                {
                    formNotReady
                    ?
                    <button type="button" disabled onClick={() => setNewKnifeStep("2")} className="flex gap-1 items-center p-2 w-full bg-shadow-green">
                        <h2 className="rounded-full border w-7 h-7 text-center">2</h2>
                        <p>Gallery</p>
                    </button>
                    :
                    <button type="button" onClick={() => setNewKnifeStep("2")} className={
                        newKnifeStep === "2"
                        ?
                        "flex gap-1 items-center p-2 bg-shadow-green-offset w-full"
                        :
                        "flex gap-1 items-center p-2 w-full"
                    }>
                        <h2 className="rounded-full border w-7 h-7 text-center">2</h2>
                        <p>Gallery</p>
                    </button>
                }


                {
                    formNotReady
                    ?
                    <button type="button" disabled onClick={() => setNewKnifeStep("3")} className="flex gap-1 items-center p-2 bg-shadow-green w-full">
                        <h2 className="rounded-full border w-7 h-7 text-center">3</h2>
                        <p>Post</p>
                    </button>
                    :
                    <button type="button" onClick={() => setNewKnifeStep("3")} className={
                        newKnifeStep === "3"
                        ?
                        "flex gap-1 items-center p-2 bg-shadow-green-offset w-full"
                        :
                        "flex gap-1 items-center p-2 w-full"
                    }>
                        <h2 className="rounded-full border w-7 h-7 text-center">3</h2>
                        <p>Post</p>
                    </button>
                }

                {
                    formNotReady
                    ?
                    <button type="button" disabled onClick={() => setNewKnifeStep("4")} className="flex gap-1 items-center p-2 bg-shadow-green w-full">
                        <h2 className="rounded-full border w-7 h-7 text-center">4</h2>
                        <p>Submit</p>
                    </button>
                    :
                    <button type="button" onClick={() => setNewKnifeStep("4")} className={
                        newKnifeStep === "4"
                        ?
                        "flex gap-1 items-center p-2 bg-shadow-green-offset w-full"
                        :
                        "flex gap-1 items-center p-2 w-full"
                    }>
                        <h2 className="rounded-full border w-7 h-7 text-center">4</h2>
                        <p>Submit</p>
                    </button>
                }
            </div>
        </section>
    )
}

export default AddNewKnifeToCollectionPage; 