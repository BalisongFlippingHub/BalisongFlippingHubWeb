import { useState } from "react";

const UserProfilePostsComponent = () => {
    const [activeNavItem, setActiveNavItem] = useState("All")
    
    
    const displayPosts = () => {
        switch(activeNavItem) {
            case "All":
                break
            case "Sell/Trade":
                break
            case "Flipping":
                break
            case "Show Off":
                break
            case "Collection":
                break
            case "Misc.":
                break
            default:
                break
        }

       return <div></div>
    } 

    return (
        <div className="flex justify-center pt-7">
            {/*Posts Navigation*/}
            <ul className="flex text-lg font-semibold">
                {
                    activeNavItem === "All"
                    ?
                    <li className="p-2 border-r border-l hover:cursor-pointer bg-shadow-green-offset" onClick={() => setActiveNavItem("All")}>All</li>
                    :
                    <li className="p-2 border-r border-l hover:cursor-pointer" onClick={() => setActiveNavItem("All")}>All</li>
                }
                {
                    activeNavItem === "Sell/Trade"
                    ?
                    <li className="p-2 border-r hover:cursor-pointer bg-shadow-green-offset" onClick={() => setActiveNavItem("Sell/Trade")}>Sell/Trade</li>
                    :
                    <li className="p-2 border-r hover:cursor-pointer" onClick={() => setActiveNavItem("Sell/Trade")}>Sell/Trade</li>
                }
                {
                    activeNavItem === "Flipping"
                    ?
                    <li className="p-2 border-r hover:cursor-pointer bg-shadow-green-offset" onClick={() => setActiveNavItem("Flipping")}>Flipping</li>
                    :
                    <li className="p-2 border-r hover:cursor-pointer" onClick={() => setActiveNavItem("Flipping")}>Flipping</li>
                }
                {
                    activeNavItem === "Show Off"
                    ?
                    <li className="p-2 border-r hover:cursor-pointer bg-shadow-green-offset" onClick={() => setActiveNavItem("Show Off")}>Show Off</li>
                    :
                    <li className="p-2 border-r hover:cursor-pointer" onClick={() => setActiveNavItem("Show Off")}>Show Off</li>
                }
                {
                    activeNavItem === "Collection"
                    ?
                    <li className="p-2 border-r hover:cursor-pointer bg-shadow-green-offset" onClick={() => setActiveNavItem("Collection")}>Collection</li>
                    :
                    <li className="p-2 border-r hover:cursor-pointer" onClick={() => setActiveNavItem("Collection")}>Collection</li>
                }
                {
                    activeNavItem === "Misc."
                    ?
                    <li className="p-2 border-r hover:cursor-pointer bg-shadow-green-offset" onClick={() => setActiveNavItem("Misc.")}>Misc.</li>
                    :
                    <li className="p-2 border-r hover:cursor-pointer" onClick={() => setActiveNavItem("Misc.")}>Misc.</li>

                }
            </ul>

            <div>
                {/*Display Posts*/}
                {
                    displayPosts()
                }
            </div>
        </div>
    )
}

export default UserProfilePostsComponent;