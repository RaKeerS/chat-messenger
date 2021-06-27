var userChatAccountsList = [];
var messageList = [];

let commonBridge;

let currentChatUserName = '';

//function getAllUserChatAccounts() {
//    for (i = 0; i < 11; i++) {
//        $("#custom-table-body1").append(`
//        <tr>
//            <td style="padding: 3px; border-bottom: 1px solid grey">
//                <div class="card-body dflex">
//                    <div class="img-circle fake-img"></div>
//                    <div class="dflexcol card-details">
//                        <h3 class="custom-margin-block">Test Name</h3>
//                        <label>Some random text message!</label>
//                    </div>
//                </div>
//            </td>
//        </tr>`);
//    }
//}

function getAllUserChatAccounts() {
    for (i = 0; i < userChatAccountsList.length; i++) {
        $("#custom-table-body1").empty().append(`
        <tr class="clickable" onclick="openCoversation(this)">
            <td style="padding: 3px; border-bottom: 1px solid grey">
                <div class="card-body dflex">
                    <div class="img-circle fake-img"></div>
                    <div class="dflexcol card-details">
                        <h3 id="${'user'+i}" class="custom-margin-block">${userChatAccountsList[i].userName}</h3>
                        <label id="${'label'+i}">${userChatAccountsList[i].message[0] ? userChatAccountsList[i].message[0].message : '' }</label>
                    </div>
                </div>
            </td>
        </tr>`);
    }
}

function getUserConversationWindow() {
    $('#custom-card-header').empty().append(`
        <div class="card-content dflex" style="padding: 5px 7px; border-bottom: 1px solid grey">
            <div class="img-circle fake-img" style="flex: 3%;"></div>
            <div class="dflexcol card-details" style="flex: 90%;">
                <h3 id="currentConvoUserName" class="custom-margin-block"></h3>
                <label id="currentConvoLabel"></label>
            </div>
        </div>
    `);
}


const chats = [
    { bearer: 'asqw23323sqw(not exactly needed)', userID: '001', message: 'Hello! Whatsup!?!' },
    { bearer: 'asqw23323sqw(not exactly needed)', userID: '002', message: 'Hey there! Nothing much' },
    { bearer: 'asqw23323sqw(not exactly needed)', userID: '002', message: 'How about you!?' },
    { bearer: 'asqw23323sqw(not exactly needed)', userID: '001', message: 'Oh, very well then!' },
    { bearer: 'asqw23323sqw(not exactly needed)', userID: '001', message: 'Hello! Whatsup!?!' },
    { bearer: 'asqw23323sqw(not exactly needed)', userID: '002', message: 'Hey there! Nothing much' },
    { bearer: 'asqw23323sqw(not exactly needed)', userID: '002', message: 'How about you!?' },
    { bearer: 'asqw23323sqw(not exactly needed)', userID: '001', message: 'Oh, very well then!' },
    { bearer: 'asqw23323sqw(not exactly needed)', userID: '001', message: 'Hello! Whatsup!?!' },
    { bearer: 'asqw23323sqw(not exactly needed)', userID: '002', message: 'Hey there! Nothing much' },
    { bearer: 'asqw23323sqw(not exactly needed)', userID: '002', message: 'How about you!?' },
    { bearer: 'asqw23323sqw(not exactly needed)', userID: '001', message: 'Oh, very well then!' },
    { bearer: 'asqw23323sqw(not exactly needed)', userID: '001', message: 'Hello! Whatsup!?!' },
    { bearer: 'asqw23323sqw(not exactly needed)', userID: '002', message: 'Hey there! Nothing much' },
    { bearer: 'asqw23323sqw(not exactly needed)', userID: '002', message: 'How about you!?' },
    { bearer: 'asqw23323sqw(not exactly needed)', userID: '001', message: 'Oh, very well then!' },
    { bearer: 'asqw23323sqw(not exactly needed)', userID: '001', message: 'Hello! Whatsup!?!' },
    { bearer: 'asqw23323sqw(not exactly needed)', userID: '002', message: 'Hey there! Nothing much' },
    { bearer: 'asqw23323sqw(not exactly needed)', userID: '002', message: 'How about you!?' },
    { bearer: 'asqw23323sqw(not exactly needed)', userID: '001', message: 'Oh, very well then!' },
    { bearer: 'asqw23323sqw(not exactly needed)', userID: '001', message: 'Hello! Whatsup!?!' },
    { bearer: 'asqw23323sqw(not exactly needed)', userID: '002', message: 'Hey there! Nothing much' },
    { bearer: 'asqw23323sqw(not exactly needed)', userID: '002', message: 'How about you!?' },
    { bearer: 'asqw23323sqw(not exactly needed)', userID: '001', message: 'Oh, very well then!' }
]

function getUserChat() {
    let userChat = userChatAccountsList.filter((item, index) => item.userName == currentChatUserName);
    if (userChat && userChat.length > 0) {
        let chats = userChat[0].message;
        for (i = 0; i < chats.length; i++) {
            if (chats[i].senderUserName == localStorage.getItem('userName')) {
                $("#custom-table-body2").empty().append(
                    `
                    <tr>
                        <td colspan="2" style="display: flex; justify-content: flex-end;">
                            <div class="custom-card-body">
                                <span>
                                    ${chats[i].message}
                                </span>
                            </div>
                        </td>
                    </tr>
                `
                );
            }
            else {
                $("#custom-table-body2").empty().append(
                    `
                    <tr>
                        <td colspan="2" style="display: flex; justify-content: flex-start;">
                            <div class="custom-card-body">
                                <span>
                                    ${chats[i].message}
                                </span>       
                            </div>
                        </td>
                    </tr>
                `
                );
            }
        }
    }
}

function openModal() {
    $("#modal-exhibit").load("RegisterLoginModal");
}

function showModal() {
    if (localStorage.getItem('access_token')) {
        let expiryDate = new Date(localStorage.getItem('expires'));
        let currentDate = new Date();
        if (expiryDate.getTime() < currentDate.getTime()) {
            $("#registerModal").modal('show');
        }
    }
    else {
        $("#registerModal").modal('show');
    }
}

function establishConnection() {
    if (!validator()) {
        alert("Please fill all the required fields");
        return;
    }
    getToken();
}

function validator() {
    let userName = $('#userName').val();
    let password = $('#password').val();
    if ((userName && userName.trim().length > 0) && (password && password.trim().length > 0)) {
        return true;
    }
    else {
        return false;
    }
}

function registerUser() {
    if (!validator()) {
        alert("Please fill all the required fields");
        return;
    }
    $("#loaderClass").removeClass('hide');
    $.ajax({
        url: window.location.origin + '/api/account/register',
        headers: {
            'content-type': 'application/json; charset=utf8'
        },
        method: 'POST',
        data: JSON.stringify({
            'UserName': $('#userName').val(),
            'Email': $('#userName').val() + "@noreply.com",
            'Password': $('#password').val()
        }),
        success: function () {
            getToken();
            $("#loaderClass").addClass('hide');
            //$("#registerModal").modal('hide');
        },
        error: function (jqXHR) {
            //$("#divError").text(jqXHR.responseText);
            alert(JSON.parse(jqXHR.responseText).error_description);
            $("#loaderClass").addClass('hide');
        }
    });
}

function getToken() {
    $("#loaderClass").removeClass('hide');
    let _data = 'username=' + $('#userName').val() + '&password=' + $('#password').val() + '&grant_type=password';
    $.ajax({
        url: window.location.origin + '/token',
        method: 'POST',
        data: _data,
        success: function (jqXHR) {
            localStorage.setItem('access_token', jqXHR['access_token']);
            localStorage.setItem('expires', jqXHR['.expires']);
            localStorage.setItem('issued', jqXHR['.issued']);
            localStorage.setItem('userName', jqXHR['userName']);
            $("#registerModal").modal('hide');
            $("#loaderClass").addClass('hide');
        },
        error: function (jqXHR) {
            alert(JSON.parse(jqXHR.responseText).error_description);
            $("#loaderClass").addClass('hide');
        },
    });
}

function sendMessage() {
    let message = $('#messageBox').val();
    let messageBox = { accessToken: localStorage.getItem('access_token'), messageString: message, userName: currentChatUserName };

    let currentUserChat = userChatAccountsList.find((item, index) => item.userName == currentChatUserName);
    currentUserChat.message.push({ receiverUserName: currentChatUserName, senderUserName: localStorage.getItem('userName'), message: message });

    commonBridge.invoke('sendMessageTo', localStorage.getItem('userName'), currentChatUserName, message).then(() => {
        console.log('Invoked sendMessageTo successfully!');
        $('#messageBox').val('');
        getUserChat();
    }).catch( (err) => console.log(err));

    //$.ajax({
    //    url: window.location.origin + '/home/sendMessage',
    //    method: 'POST',
    //    data: messageBox,
    //    success: function (jqXHR) {
    //        let response = jqXHR[0].Value;
    //        $('#messageBox').val('');
    //        getUserChat();
    //    },
    //    error: function (jqXHR) {
    //        let error = jqXHR;
    //        alert(JSON.parse(jqXHR));
    //    }
    //});
}

function connectUser() {
    if (!($('#connectToUserName').val() && $('#connectToUserName').val().trim().length > 0)) {
        alert("Please fill all the required fields");
        return;
    }
    $.ajax({
        url: window.location.origin + '/home/startNewChat',
        method: 'POST',
        data: {
            userName: $('#connectToUserName').val()
        },
        success: function (jqXHR) {
            let response = jqXHR;
            userChatAccountsList.push({ userId: jqXHR[0].Value, userName: jqXHR[1].Value, message: _.cloneDeep(messageList) });
            getAllUserChatAccounts();
            closeModal('chatConnectionModal');
        },
        error: function (jqXHR) {
            alert(JSON.parse(jqXHR));
            //$("#chatConnectionModal").modal('hide');
        }
    })
}

function startNewChat() {
    $("#chatConnectionModal").modal('show');
}

function openCoversation(elem) {
    $('#currentConvoUserName')[0].innerText = elem.children[0].children[0].children[1].children[0].innerText;
    $('#currentConvoLabel')[0].innerText = elem.children[0].children[0].children[1].children[1].innerText;

    currentChatUserName = elem.children[0].children[0].children[1].children[0].innerText;

    $('#cardFooter').removeClass('hidden');
    $('#img-div').removeClass('hidden');

    // Load all chat messages - call function for it!
    getUserChat();

}

function closeModal(modalId) {
    $('#' + modalId).modal('hide');
}

$(document).ready(() => {
    getAllUserChatAccounts();
    getUserChat();
    //openModal();
    showModal();
    initiateSignalR();
}); 


function initiateSignalR() {
    var connection = $.hubConnection();
    commonBridge = connection.createHubProxy('commonBridge');
    commonBridge.on('hello', () => {
        console.log('Hello!!');
        alert('Hello!');
    });

    commonBridge.on('messageReceived', (senderUserName, receiverUserName, message) => {
        // We sent the message to server and received the response here.
        console.log('messageReceived', senderUserName, receiverUserName, message);

        if (localStorage.getItem('userName') == receiverUserName) {
            // Create list of Users on left panel
            userChatAccountsList.push({ userId: '', userName: senderUserName, message: _.cloneDeep(messageList) });

            // Add the message broadcasted to thus newly added User's (in left panel) message list
            let currentUserChat = userChatAccountsList.find((item, index) => item.userName == senderUserName);
            currentUserChat.message.push({ receiverUserName: receiverUserName, senderUserName: senderUserName, message: message });

            getAllUserChatAccounts();
        }
        //let currentUserChat = userChatAccountsList.find((item, index) => item.userName == currentChatUserName);
        //currentUserChat.message.push({ receiverUserName: currentChatUserName, senderUserName: localStorage.getItem('userName'), message: message });
    });

    connection.start().catch(err => console.error(err.toString())).then(function () {
        commonBridge.invoke('hello').then(function () {
            console.log('Successful!!');
            alert('Successful!!');
        });
    });
}

