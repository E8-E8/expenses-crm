const baseUrl = 'http://localhost:5000/api/v1'

async function login() {
    const email = $('#login-email');
    const password = $('#login-password');

    const credentials = JSON.stringify({ email: email.val(), password: password.val() });
    axios.post(`${baseUrl}/auth/login`, credentials, {
        headers: {
          'Content-Type': 'application/json'
        }
    }).then(
        res => {
            localStorage.jwt = res.data.token
            localStorage.userId = res.data.user.id
            window.location.replace("../html/expenses.html");
        }, 
        error => {
            if (error.response.status === 401) {
                email.addClass('is-invalid')
            }else if(error.response.status === 400){
                password.addClass('is-invalid')
            }else{
                return error;
            }
        }
    );
}


function register(){
    const email = $('#register-email');
    const password = $('#register-password');
    const name = $('#register-name');

    const credentials = JSON.stringify({ email: email.val(), password: password.val(), name: name.val() });

    axios.post(`${baseUrl}/auth/register`, credentials, {
        headers: {
          'Content-Type': 'application/json'
        }
    }).then(
        res => {
            window.location.replace("../index.html");
        }, 
        error => {
            if (error.response.status === 401) {
                email.addClass('is-invalid')
            }else if(error.response.status === 400){
                password.addClass('is-invalid')
            }else{
                return error;
            }
        }
    );
}

