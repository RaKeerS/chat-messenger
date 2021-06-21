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
    $("#registerModal").modal('show');
}

function establishConnection() {
    getToken();
}

function registerUser() {
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
            //$("#registerModal").modal('hide');
        },
        error: function (jqXHR) {
            //$("#divError").text(jqXHR.responseText);
            alert(JSON.parse(jqXHR.responseText).error_description);
        }
    });
}

function getToken() {
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
        },
        error: function (jqXHR) {
            alert(JSON.parse(jqXHR.responseText).error_description);
        }
    })
}

$(document).ready(() => {
    getAllUserChats();
    getUserChat();
    //openModal();
    showModal();
});
