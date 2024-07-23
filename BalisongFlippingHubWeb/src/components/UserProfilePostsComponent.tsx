import { useEffect, useState } from "react";
import { Post } from "../modals/Post";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import ProfilePostsCoverDisplay from "./ProfilePostsCoverDisplay";

const UserProfilePostsComponent = () => {
    const [activeNavItem, setActiveNavItem] = useState("All")
    const [posts, setPosts] = useState<Array<Post>>([])
    
    const { user } = useAuth()

    const displayPosts = () => {
        switch(activeNavItem) {
            case "All":
                return <ProfilePostsCoverDisplay posts={posts} />
            case "Sell/Trade":
                return <ProfilePostsCoverDisplay posts={posts} />
            case "Flipping":
                return <ProfilePostsCoverDisplay posts={posts} />
            case "Show Off":
                return <ProfilePostsCoverDisplay posts={posts} />
            case "Collection":
                return <ProfilePostsCoverDisplay posts={posts} />
            case "Misc.":
                return <ProfilePostsCoverDisplay posts={posts} />
            default:
                return (
                    <div>
                        Error Loading posts...
                    </div>
                )
        }

       return <div></div>
    }

    useEffect(() => {
        const getPosts = async() => {
            await axios.request({
                url: `/posts/any/${user?.id}/posts`,
                method: 'get'
            })
            .then((res) => {
                console.log(res)
                setPosts(res.data)
            })
            .catch((err) => {
               console.log(err)
            })
            .finally(() => {
                
            })
        }

        getPosts()
    },[])

    return (
        <div className="w-full flex flex-col mt-5 mb-5">
            {/*Posts Navigation*/}
            <ul className="flex text-lg font-semibold m-auto">
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

            {/*Display Posts*/}
            {
                displayPosts()
            }
            
        </div>
    )
}

export default UserProfilePostsComponent;