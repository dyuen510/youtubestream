import React from 'react';

const VideoDetail = (props) => {
    const video = props.video;
    
    if(!video){
        return <div>Loading...</div>;
    }
    
    let videoId = video.id.videoId;

    // console.log(videoId)
    
    const url = `https://www.youtube.com/embed/${videoId}`;
    // const comment = `https://www.googleapis.com/youtube/v3/commentThreads?part=id%2Csnippet&videoId=${videoId}&key=AIzaSyBdVut9QCzqAHBzfDEh30yUp4E529som6s`

//added Chat /> here but not sure if its the correct spot to place it at.
    return (
        <div className="video-detail col-md-8">
            <div className="embed-responsive embed-responsive-16by9">
                <iframe className="embed-responsive-item" src={url}></iframe>
            

            </div>
            <div className="details">
                <div>{video.snippet.title}</div>
                <div className = 'description'>{video.snippet.description}</div>
                {/* <div>{console.log(video.items[0])}</div> */}
                
                
                
            </div>
        </div>
    );
};

export default VideoDetail;