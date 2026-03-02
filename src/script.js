
//Navbar Topic dropdown section script
document.getElementById('topicNavigation').addEventListener('change', function() {
    if (this.value) {
        window.location.href = this.value;
    }
});

//Chat with us form section script
const chatForm = document.getElementById('chat-form');
const submitChatBtn = document.getElementById('submit-chat-btn');
const confirmationMessage = document.getElementById('chat-confirmation');
const chatUsBtn = document.getElementById('chat-us-btn');
const cancleChatBtn = document.getElementById('cancel-chat-btn');
const nameField = document.getElementById('name');
const emailField = document.getElementById('email');
const messageField = document.getElementById('message');
const errorAlertDiv = document.getElementById('error-alert');
const errorEmailAlertDiv = document.getElementById('error-alert-email');
const errMsgAlertDiv = document.getElementById('error-alert-message');
const pattern = /^[A-Za-z']+(\s+[A-Za-z'-]+)+$/;
//const userEmailInput =document.getElementById('email').value.trim();
//supports patterns 
    /**me.dow@example.com
    user456@email-test.net
    met.first+label@cub.domain.org**/
const emailRegexPattern =  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const numOnlyRegex =  /^\d+$/ ;

//display the chat form when the "Chat with us!" button is clicked
document.getElementById('chat-us-btn').addEventListener('click', function(e) {
    e.preventDefault();
    chatForm.hidden = false;
    chatForm.style.display = 'block';
     chatUsBtn.style.display="none";
});

// logic to clear form when cancel button is clicked
function cancelChatLogic(){
    nameField.value ="";
    emailField.value ="";
    messageField.value ="";
    clearErrorMsgLogic(errorAlertDiv);
    clearErrorMsgLogic(errorEmailAlertDiv);
    clearErrorMsgLogic(errMsgAlertDiv);
    confirmationMessage.hidden = true;
    confirmationMessage.style.display = 'none';
}

// logic to display field error
function displayFieldErrorMsg(divErr,errmsg){
    divErr.textContent = errmsg;
    divErr.hidden = false;
    divErr.style.display = "block";
}

// logic to handle confirmation message when successfully submitted
function submitChatLogic(){
   
    confirmationMessage.hidden = false;
    confirmationMessage.style.display = 'block';
    setTimeout(() => {
        confirmationMessage.hidden = true;
        confirmationMessage.style.display = 'none';
        chatForm.style.display="none"; // clears the form after submission
    }, 5000);
}

// logic to clear error field
function clearErrorMsgLogic(errDiv){

    errDiv.hidden = true;
    errDiv.style.display = "none";
}

//function to validate userinput data
function isValid(checkPattern, userInput) {
    return checkPattern.test(userInput);
}

//handle the cancel button click to close the chat form without submission
cancleChatBtn.addEventListener('click', function(event) {

    event.preventDefault(); /// prevent page refresh on click refresh
   cancelChatLogic();
    chatForm.style.display='none';
     chatUsBtn.style.display="block";
});

//submit form logic and input validation check
chatForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Always stop the refresh first
    const userInputName = document.getElementById('name').value.trim();
    const userEmailInput =document.getElementById('email').value.trim();
    const userMsgInput =document.getElementById('message').value.trim();
    const nameValid = isValid(pattern, userInputName);
    const emailValid = isValid(emailRegexPattern, userEmailInput);
    
    // Check message is not empty AND not only numbers
    const msgInputValid = (userMsgInput !== "" && !isValid(numOnlyRegex, userMsgInput));

    // variable to keep track of user input field 
    let isFormReady = true;

    // Checks Name field
    if (!nameValid) {
        displayFieldErrorMsg(errorAlertDiv, "Please enter text only firstname and lastname!");
        isFormReady = false; 
    } else {
        clearErrorMsgLogic(errorAlertDiv); // Clear error if fixed
    }

    // Checks Email field
    if (!emailValid) {
        displayFieldErrorMsg(errorEmailAlertDiv, "Please enter a valid email (e.g., me@example.com)");
        isFormReady = false;
    } else {
        clearErrorMsgLogic(errorEmailAlertDiv);
    }

    // Checks Message field
    if (!msgInputValid) {
        displayFieldErrorMsg(errMsgAlertDiv, "Please enter a message (text only)!");
        isFormReady = false;
    } else {
        clearErrorMsgLogic(errMsgAlertDiv);
    }

    //  Only submit if NO errors were found
    if (isFormReady) {
        submitChatLogic();
        chatForm.reset(); 
        chatUsBtn.style.display="block";
    }
});