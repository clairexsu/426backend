$(function () {
    $(document).on('click', '#login-old-submit', async function(event) {
        event.preventDefault();
        let userTyped = $("#user-old-input").val();
        let passwordTyped = $("#password-old-input").val();
        const result = await axios( {
            method: 'post',
            url: 'http://localhost:3001/login',
            data: {
                username: `${userTyped}`,
                password: `${passwordTyped}`
            },
            withCredentials: true
        });
        console.log(result.data);
        if(result.data == true){
            location.href = "./index.html"
            //   getUserInfo();
        }
        // let cookie = result.data;
      
})

$(document).on('click', '#createaccount-submit', async function(event) {
    event.preventDefault();
    let userTyped = $("#user-new-input").val();
    let password1 = $("#password-one").val();
    let password2= $("#password-two").val();
    
    if (password1 != password2) {
        alert("Passwords do not match, try again!");
        return;
    } else {
        const result = await axios( {
            method: 'post',
            url: 'http://localhost:3001/createUser',
            data: {
                username: `${userTyped}`,
                password: `${password1}`
            },
            withCredentials: true
        });
        console.log(results.data);
       
    }
})
})

// async function getUserInfo(){
//     const result = await axios( {
//         method: 'get',
//         url: 'http://localhost:3001/secret',
//         withCredentials: true

//     });
//     console.log(result.data);

// }
