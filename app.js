const composeHeight = $('#composeInput').height();
const tweet = $('#composeInput')
const tweetButton = $('.post-tweet')
const tweetArea = $('.tweets')
const addImage = $('#post-image')

const showActions = () => {
    $('.actions').css('display','flex');
    $('#composeIcon').hide();
    tweet.height(composeHeight*2);
}

const hideActions = () => {
    $('.actions').css('display', 'none');
    $('#composeIcon').show();
    tweet.height(composeHeight);
    tweetButton.attr("disabled","true")
    tweetButton.css('cursor', 'default')
    $('.message-count').text(280)
}

const useImage = (img) => {
    var file = img.files[0];
    var imagefile = file.type
    var match = ["image/jpeg", "image/png", "image/jpg"];
    if (!((imagefile == match[0]) || (imagefile == match[1]) || (imagefile == match[2]))) {
        alert("Invalid File Extension");
    } else {
        var reader = new FileReader();
        reader.onload = imageIsLoaded;
        reader.readAsDataURL(img.files[0])
    }
    function imageIsLoaded(e) {
        $('#twt-msg').append(`
            <img src="${e.target.result}" height="50%" width="100%" />
        `)
    }
}


var currTime = 0;
var minute = 0
var cycle = 0
const  timeAgo =  () => {
    const toAdd = 5;
    currTime = currTime + toAdd
    //reset currTime
    currTime >= 60 && (currTime = 0, cycle += 1, minute += 1)
    currTime === 30 && cycle === 0 ? $('.showTime').html(`${currTime} seconds ago . . .`):
        ( 
            cycle >= 1 && $('.showTime').html(minute < 2? `a minute ago. . .`: `${minute} minutes ago . . .`)
        )
   
    console.log(cycle, currTime)
    setTimeout(timeAgo,5000)
}


$(document).ready(()=>{
    $('.compose').focusin(showActions);
    $('.compose').focusout(()=>{
    tweet.val() === ''? (hideActions()):(showActions())
    });

    tweet.keyup(()=>{
        var charCount = 280 - tweet.val().length
        tweet.val() !== ''? tweetButton.removeAttr("disabled"):tweetButton.attr("disabled", "True")
        tweetButton.prop('disabled')? tweetButton.css('cursor', 'default'): tweetButton.css('cursor', 'pointer')
        charCount < 10? $('.message-count').css('color','red'): $('.message-count').css('color','#13B5F02')
        $('.message-count').text(charCount)
    })

    var input
    $('.actions').append(`
        <input type="file" id="image-handle">    
    `)
    $('#image-handle').css('display', 'none')

    addImage.click(()=>{
        input = $('#image-handle').click()
        tweetButton.removeAttr("disabled")
        showActions()
    })
    $('#composeIcon').click(()=>{
        input = $('#image-handle').click()
        tweetButton.removeAttr("disabled")
    })

    tweetButton.click((event)=>{
        input !== undefined && useImage(input[0])
        timeAgo()
        tweetArea.prepend(`
        <div class="tweet">
        <div class="profile">
            <img class="img-tweet-profile" src="img/damenleeturks.jpg">
        </div> 
        <div class="message">
            <div class="posted-by">
                <span class="display-name">Jeff</span>
                <span class="handle">@sometwitterwomen
                <span class="showTime"></span>
                </span>
            </div>
            <div class="content">
                <p id="twt-msg">${tweet.val()}</p>
            </div>
            <div class="tweet-actions">
                <i class="far fa-comment"></i>
                <i class="fas fa-retweet"></i>
                <i class="far fa-heart"></i>
                <i class="far fa-envelope"></i>
            </div>
        </div>
        </div>
        `)

        //reset the value
        input = undefined
        tweet.val('')
        hideActions()
        event.preventDefault()
    })

})
