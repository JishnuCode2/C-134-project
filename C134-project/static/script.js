
//Update date
var date = new Date()
let display_date= "Date:" + date.toLocaleDateString()
console.log(display_date) 
//Load HTML DOM
$(document).ready(function(){
        $("#display_date").html(display_date)
    })
    
//let predicted_emotion;
//  write an event, when Submit button is clicked
$(function (){
    $('#button').click(function(){

        //  get the text value from the textarea using the 'val()' method
        let text_value = $('#text').val()

        //  Convert it to JS object.
        //  Provide a 'key' here and in write the same in app.py file as well to extract data
        let input_text = {'#text' : text_value}
        console.log(input_text)

        //  ajax request
        $.ajax({
            //  type of web request
            type : 'POST',

            //URL
            url: '/predict_emotions',

            //  Data to be sent in JSON format
            data : JSON.stringify(input_text),

            //  type of response expected is json
            dataType : 'json',

            //  contentType
            contentType : 'application/json',

            //  if everything is successful, run this function
            success : function(result){

                // extract prediction and emoticon url from result
                predicted_emotion = result.data.predicted_emotion
                emo_url = result.data.predicted_emotion_img_url

                //  update the DOM elements
                var sentiment = "Sentiment: "+ predicted_emotion
                console.log(sentiment)

                $("#sentiment").html(sentiment)
                $("#sentiment").css("display", "block")

                $("#emo_img_url").attr('src',emo_url)
                $("#emo_img_url").css("display","block")
            },

            //  if any error, run this function
            error : function(result){
                alert(result.responseJSON.message)
                console.log(result)
            }
        })


        //  clearing the textbox after every button push
        $('#text').val("")
    })
})

        