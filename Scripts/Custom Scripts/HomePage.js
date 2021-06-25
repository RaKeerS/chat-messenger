function getAllUserChats() {
    for (i = 0; i < 11; i++) {
        $("#custom-table-body1").append(`
        <tr>
            <td style="padding: 3px; border-bottom: 1px solid grey">
                <div class="card-body dflex">
                    <div class="img-circle fake-img"></div>
                    <div class="dflexcol card-details">
                        <h3 class="custom-margin-block">Test Name</h3>
                        <label>Some random text message!</label>
                    </div>
                </div>
            </td>
        </tr>`);
    }
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

function getUserChat(userID) {
    for (i = 0; i < chats.length; i++) {

        if (chats[i].userID == 001) {
            $("#custom-table-body2").append(
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
            $("#custom-table-body2").append(
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
            $("#registerModal").modal('hide');
            $("#loaderClass").addClass('hide');
        },
        error: function (jqXHR) {
            alert(JSON.parse(jqXHR.responseText).error_description);
            $("#loaderClass").addClass('hide');
        },
    })
}

function sendMessage() {
    let message = $('#messageBox').val();
    let messageBox = { accessToken: localStorage.getItem('access_token'), messageString: message };

    $.ajax({
        url: window.location.origin + '/home/sendMessage',
        method: 'POST',
        data: messageBox,
        success: function (jqXHR) {
            let response = jqXHR[0].Value;
        },
        error: function (jqXHR) {
            let error = jqXHR;
            alert(JSON.parse(jqXHR));
        }
    })
}

$(document).ready(() => {
    getAllUserChats();
    getUserChat();
    //openModal();
    showModal();
});
