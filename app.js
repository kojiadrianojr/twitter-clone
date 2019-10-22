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
        $('#image-handle').click()
    })
    $('#composeIcon').click(()=>{
       var input = $(':file').click()
    })

    tweetButton.click(()=>{
        tweetArea.prepend(`
        <div class="tweet">
        <div class="profile">
            <img class="img-tweet-profile" src="img/damenleeturks.jpg">
        </div> 
        <div class="message">
            <div class="posted-by">
                <span class="display-name">Jeff</span>
                <span class="handle">@sometwitterwomen</span>
            </div>
            <div class="content">
                <p>${tweet.val()}</p>
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
        tweet.val('')
        hideActions()
        console.log(input)
    })

})
