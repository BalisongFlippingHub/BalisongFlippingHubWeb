
import { useEffect, useState } from "react";
import CustomCollectionBanner from "../components/CustomCollectionBanner";
import { Collection } from "../modals/Collection";

const UserCollectionPage = () => {
    const [collection, setCollection] = useState<Collection | null>(null)

    useEffect(() => {

    }, [])

    return (
        <section className="w-full h-full flex flex-col">
            {
                collection?.bannerImg || collection?.bannerImg === "" || collection === null
                ?
                <CustomCollectionBanner />
                :
                <CustomCollectionBanner imageId={collection.bannerImg} />
            }
        </section>
    )
}

export default UserCollectionPage;