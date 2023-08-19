export const VideoComponent = ({isMobile}) => {
  return (
    <div  className="video-section" style={{height:isMobile?'30vh':'100vh',marginTop:60}}>
      <video src="/video.mp4" loop autoPlay muted></video>

    </div>
  );
};
