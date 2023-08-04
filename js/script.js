$(document).ready(function() {
    $("#submit").click(function() {
        var message = $("#message").val();
        var userMessageDiv = $("<div class='userMessage'><b>사용자:</b> </div>");
        $("#chatbox").append(userMessageDiv);
        typeMessage(message, userMessageDiv);

        $.ajax({
            url: "https://cors-anywhere.herokuapp.com/http://api.haji.uno:5000/api/chat",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({ "message": message }),
            success: function(data) {
                var aiResponseDiv = $("<div class='aiMessage'><b>체르타:</b> </div>");
                $("#chatbox").append(aiResponseDiv);
                typeMessage(data.message, aiResponseDiv);
                $("#message").val("");
            },
            error: function() {
                var errorMessageDiv = $("<div class='aiMessage'><b>체르타:</b> </div>");
                $("#chatbox").append(errorMessageDiv);
                typeMessage("Sorry, I couldn't process your message.", errorMessageDiv);
            }
        });
    });
});
function typeMessage(message, targetElement) {
    var i = 0;
    var typingInterval = setInterval(function(){
        if(i < message.length){
            $(targetElement).append(message.charAt(i));
            i++;
        }
        else {
            clearInterval(typingInterval);
        }
    }, 10); // 타이핑 속도 조절 (단위: ms)
}