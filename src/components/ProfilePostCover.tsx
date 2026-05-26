import { useEffect, useState } from "react";
import { PostCover } from "../modals/Post";
import { axiosApiInstanceAuth } from "../api/axios";
import { Buffer } from "buffer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faComment, faLock, faBullhorn } from "@fortawesome/free-solid-svg-icons";

interface params {
  post: PostCover;
}

const ProfilePostCover = ({ post }: params) => {
  const [coverImg, setCoverImg] = useState<ImageBufferData | null>(null);

  useEffect(() => {
    if (post.coverFile && post.coverFile !== "") {
      axiosApiInstanceAuth
        .request({
          url: `/file/${post.coverFile}`,
          method: "get",
          responseType: "arraybuffer",
        })
        .then((res) => {
          setCoverImg({
            data: Buffer.from(res.data, "binary").toString("base64"),
            /*@ts-ignore*/
            type: res.headers.get("Content-Type"),
          } as ImageBufferData);
        })
        .catch((err) => console.log("Error getting img: ", err));
    }
  }, []);

  return (
    <div className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer border border-white/8 hover:border-white/20 transition-all duration-300">

      {/* Background — image or caption card */}
      {coverImg ? (
        <img
          className="w-full h-full object-cover"
          src={`data:${coverImg.type};base64,${coverImg.data}`}
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-[#1c1f27] to-[#0d0f14] flex items-center justify-center p-4">
          <p className="text-white/55 text-sm font-medium text-center leading-relaxed line-clamp-5">
            {post.caption || <span className="text-white/20 italic">No caption</span>}
          </p>
        </div>
      )}

      {/* Hover overlay — stats */}
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
        <div className="flex items-center gap-5 text-white">
          <span className="flex items-center gap-1.5 font-semibold text-sm">
            <FontAwesomeIcon icon={faHeart} />
            {post.likes.toLocaleString()}
          </span>
          <span className="flex items-center gap-1.5 font-semibold text-sm">
            <FontAwesomeIcon icon={faComment} />
            {post.comments.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Top-left badges — announcement / private */}
      {(post.isAnnouncement || post.isPrivate) && (
        <div className="absolute top-2 left-2 flex gap-1">
          {post.isAnnouncement && (
            <span className="flex items-center gap-1 text-[10px] bg-gold/20 text-gold border border-gold/30 px-1.5 py-0.5 rounded-full font-medium uppercase tracking-wider">
              <FontAwesomeIcon icon={faBullhorn} className="text-[8px]" />
              Announcement
            </span>
          )}
          {post.isPrivate && (
            <span className="flex items-center gap-1 text-[10px] bg-white/10 text-white/60 border border-white/20 px-1.5 py-0.5 rounded-full font-medium uppercase tracking-wider">
              <FontAwesomeIcon icon={faLock} className="text-[8px]" />
              Private
            </span>
          )}
        </div>
      )}

      {/* Bottom-left — identifier tag */}
      {post.identifier && (
        <div className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <span className="text-[10px] bg-black/60 text-white/70 px-2 py-0.5 rounded-full font-medium backdrop-blur-sm">
            {post.identifier}
          </span>
        </div>
      )}

    </div>
  );
};

export default ProfilePostCover;
