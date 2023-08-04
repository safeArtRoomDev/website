$(document).ready(function() {
    $("#submit").click(function() {
        var message = $("#message").val();
        var userMessageDiv = $("<div class='userMessage'><b>사용자:</b> </div>");
        $("#chatbox").append(userMessageDiv);
        typeMessage(message, userMessageDiv);

        fetch("https://us-central1-haji-a6321.cloudfunctions.net/chatAPI-1", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "message": message }),
        })
        .then(response => response.json())
        .then(data => {
            var aiResponseDiv = $("<div class='aiMessage'><b>체르타:</b> </div>");
            $("#chatbox").append(aiResponseDiv);
            typeMessage(data.message, aiResponseDiv);
            $("#message").val("");
        })
        .catch((error) => {
            console.error('Error:', error);
            var errorMessageDiv = $("<div class='aiMessage'><b>체르타:</b> </div>");
            $("#chatbox").append(errorMessageDiv);
            typeMessage("Sorry, I couldn't process your message.", errorMessageDiv);
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