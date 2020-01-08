export function buildCommentRequest(videoId, nextPageToken){
    return buildCommentsRequest('Get',
    '/youtube/v3/commentThreads',
    {
        part: 'id,snippet',
        pageToken: nextPageToken,
        videoId,
    }, null);
}