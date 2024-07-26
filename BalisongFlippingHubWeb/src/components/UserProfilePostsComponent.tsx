import { useEffect, useState } from "react";
import { PostCover } from "../modals/Post";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import ProfilePostCover from "./ProfilePostCover";

const UserProfilePostsComponent = () => {
    const [activeNavItem, setActiveNavItem] = useState("All")
    const [posts, setPosts] = useState<Array<PostCover>>([])
    const [activePosts, setActivePosts] = useState<Array<PostCover>>([])

    const { user } = useAuth()

    const getPostsCovers = () => {
        return activePosts.map((post) => {
            return <ProfilePostCover post={post} key={post.id}/>
        })
    }

    useEffect(() => {
        switch(activeNavItem) {
            case "All":
                setActivePosts(posts)
                break
            case "Sell/Trade":
                setActivePosts(posts.filter((post) => {
                    return post.identifier === "Sell/Trade"
                }))
                break
            case "Flipping":
                setActivePosts(posts.filter((post) => {
                    return post.identifier === "Flipping"
                }))
                break
            case "Show-Off":
                setActivePosts(posts.filter((post) => {
                    return post.identifier === "Show-Off"
                }))
                break
            case "Collection":
                setActivePosts(posts.filter((post) => {
                    return post.identifier === "Collection"
                }))
                break
            case "Mod-Work":
                setActivePosts(posts.filter((post) => {
                    return post.identifier === "Mod-Work"
                }))
                break
            default:
                setActivePosts([])
                break
        }
    }, [activeNavItem])

    useEffect(() => {
        const getPosts = async() => {
            await axios.request({
                url: `/posts/any/${user?.id}/posts`,
                method: 'get'
            })
            .then((res) => {
                console.log(res)
                setPosts(res.data)
                setActivePosts(res.data)
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
        <div className="w-full flex flex-col mt-5">
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
                    activeNavItem === "Show-Off"
                    ?
                    <li className="p-2 border-r hover:cursor-pointer bg-shadow-green-offset" onClick={() => setActiveNavItem("Show-Off")}>Show-Off</li>
                    :
                    <li className="p-2 border-r hover:cursor-pointer" onClick={() => setActiveNavItem("Show-Off")}>Show-Off</li>
                }
                {
                    activeNavItem === "Collection"
                    ?
                    <li className="p-2 border-r hover:cursor-pointer bg-shadow-green-offset" onClick={() => setActiveNavItem("Collection")}>Collection</li>
                    :
                    <li className="p-2 border-r hover:cursor-pointer" onClick={() => setActiveNavItem("Collection")}>Collection</li>
                }
                {
                    activeNavItem === "Mod-Work"
                    ?
                    <li className="p-2 border-r hover:cursor-pointer bg-shadow-green-offset" onClick={() => setActiveNavItem("Mod-Work")}>Mod-Work</li>
                    :
                    <li className="p-2 border-r hover:cursor-pointer" onClick={() => setActiveNavItem("Mod-Work")}>Mod-Work</li>

                }
            </ul>

            {/*Display Posts*/}
            <div className="w-full flex flex-wrap mt-5">
            {
                getPostsCovers()
            }
            </div>
            
        </div>
    )
}

export default UserProfilePostsComponent;