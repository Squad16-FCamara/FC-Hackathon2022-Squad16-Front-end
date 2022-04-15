function teste(id) { 
    window.location = "../profile/index.html?id=" + id
 }

function skillComponent(skills){
    ret = ''

    skills.forEach(skill => {
        ret = ret + `<p>${skill}</p> \n`; 
    })

    return ret;
}

function mentorComponent(users){
    return(`
        <div id="mentor">
            <img src="../../images/perfil.png" alt="foto do mentor" id="profile">
            <div id="mentor-info">
            <h3 style="font-weight: 600;">${users.name}</h3>
            <h6 style="font-weight: 500; margin-bottom: 16px;">${users.jobTitle}</h6>
            <p style="font-weight: 400; margin-bottom: 24px;">${users.about}</p>
            <div id="tags-mentor">
                ${skillComponent(users.skills)}  
            </div>
            </div>
            <div id="btns">
            <button onclick="teste(${users.id})" class="btn-agendar">Agendar mentoria</button>
            <button class="btn-perfil">Ver perfil</button>
            </div>
        </div>
    `) 
}

function isMentor(user){
    return user.mentor == true;
}

function loadMentors(){
    const url = 'http://localhost:3333/users'

    $(document).ready(function(){
        $.get(url, function( data ){
            let myResponse = data.users.filter(isMentor)

            myResponse.forEach(users => {
                $(mentorComponent(users)).appendTo("#mentores");
            });
        })
    })
}

function searchMentorByName(){
    const url = 'http://localhost:3333/search/';

    $(document).ready(function(){
        $("#search-bar").keypress(function(event){
            var keycode = (event.keyCode ? event.keyCode : event.which);
    
            if(keycode == '13'){
                var searchValue = $("#search-bar").val();
            }

            $.get(url + `?name=${searchValue}`, function( data ){
                let myResponse = data.users

                $("#mentores").empty();
        
                myResponse.forEach(users => {
                    $(mentorComponent(users)).appendTo("#mentores");
                });
            })
        })
        
        $("#search-bar").focusout(function(){
            var searchValue = $("#search-bar").val();

            $.get(url + `?name=${searchValue}`, function( data ){
                let myResponse = data.users

                $("#mentores").empty();

                myResponse.forEach(users => {
                    $(mentorComponent(users)).appendTo("#mentores");
                });
            })
        })
    })
}

loadMentors()
searchMentorByName()