function login(){
    $(document).ready(function(){
        $(".myButton").click(function(){
            let user = $("#user-input").val()
            let password = $("#password-input").val()
                
            const obj = { "email": user, "password": password }
    
            $.ajax({
                url: 'http://localhost:3333/auth',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(obj),
                error: function(){
                    alert("Usuario invalido" );
                },
                success: function ( data ){
                    localStorage.setItem('token', data.token)
                    localStorage.setItem('profileImg', data.user.profileImgUrl)
                    window.location = "../search/index.html"
                }
            })
        })  
    })
}

login()
   