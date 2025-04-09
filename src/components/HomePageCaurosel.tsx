import myVideo from "../assets/HomePageVideo.mp4"

const HomePageCaurosel = () => {
  return (
    <div className="w-full h-full opacity-80">
      <video src={myVideo} muted autoPlay loop className="w-full h-full object-cover" />
    </div>
  );
};

export default HomePageCaurosel;
