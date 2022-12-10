# import the necessary modules
from flask import Flask , render_template , request , jsonify

# importing sentiment_analysis file as sa
import sentiment_analysis as sa

app = Flask(__name__)

# app route for index page
@app.route('/')
def home():
    return render_template('index.html')

# write a route for post request
@app.route('/predict_emotions' , methods = ['POST'])
def review():

    # extract the customer_review by writing the appropriate 'key' from the JSON data
    review = request.json.get('#text')

    # check if the customer_review is empty, return error
    if not review:
        return jsonify({'status' : 'error' , 
                        'message' : 'Empty response'})
    else:

        predicted_emotion, predicted_emotion_img_url = sa.predict(review)
        # Response to send if the input_text is not undefined
        response ={
            "status": "success",
            "data": {
                "predicted_emotion": predicted_emotion,
                "predicted_emotion_img_url": predicted_emotion_img_url
            }
        }
        # Send Response     
        return jsonify(response) 


if __name__  ==  "__main__":
    app.run(debug = True)