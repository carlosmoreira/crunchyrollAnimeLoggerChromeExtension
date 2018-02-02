//alert('content script loaded');
//https://developer.chrome.com/apps/messaging
chrome.extension.onMessage.addListener(
function (request, sender, sendResponse) {

    //debugger;
    /*
        - Retrieve Page Info 
            - Title
            - Season?
            - Episode
    */
    if (request.action == 'PageInfo') {
        var pageInfo = {
            title : "NA",
            episode : "NA"
        };

        try{
            var title = $('meta[property="og:title"]').attr("content");
            pageInfo.title = title;
            
            var episode = $('#showmedia_about_media h4:nth-child(2)');
            if(episode){
                episode = episode.text().trim();
                pageInfo.episode = episode;    
            }
        }catch(exception){
            console.log(exception)
        }
        
        sendResponse(pageInfo);
    }


});