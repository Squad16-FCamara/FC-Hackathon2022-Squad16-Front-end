function loadMentors(){
    const url = 'http://localhost:3333/users'

    $(document).ready(function(){
        $.get(url, function( data ){
            let myResponse = data.users
        
            myResponse.forEach(element => {
                $(`
                    <div id="mentor">
                        <img src="https://github.com/carllitsy.png" alt="foto do mentor" id="profile">
                        <div id="mentor-info">
                        <h3 style="font-weight: 600;">${element.name}</h3>
                        <h6 style="font-weight: 500; margin-bottom: 16px;">${element.email}</h6>
                        <p style="font-weight: 400; margin-bottom: 24px;">Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
                        Temporibus, commodi quam molestiae laborum voluptate consectetur</p>
                        <div id="tags-mentor">
                            <p>JavaScript</p>
                            <p>C</p>
                            <p>PHP</p>
                            <p>React</p>
                        </div>
                        </div>
                        <div id="btns">
                        <button class="btn-agendar">Agendar mentoria</button>
                        <button class="btn-perfil">Ver perfil</button>
                        </div>
                    </div>
                    `).appendTo("#mentores");
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

            $.get(`http://localhost:3333/search/?name=${searchValue}`, function( data ){
                let myResponse = data.users

                console.log(myResponse)
        
                myResponse.forEach(element => {
                    $(`
                    <div id="mentor">
                        <img src="https://github.com/carllitsy.png" alt="foto do mentor" id="profile">
                        <div id="mentor-info">
                        <h3 style="font-weight: 600;">${element.name}</h3>
                        <h6 style="font-weight: 500; margin-bottom: 16px;">${element.email}</h6>
                        <p style="font-weight: 400; margin-bottom: 24px;">Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
                        Temporibus, commodi quam molestiae laborum voluptate consectetur</p>
                        <div id="tags-mentor">
                            <p>JavaScript</p>
                            <p>C</p>
                            <p>PHP</p>
                            <p>React</p>
                        </div>
                        </div>
                        <div id="btns">
                        <button class="btn-agendar">Agendar mentoria</button>
                        <button class="btn-perfil">Ver perfil</button>
                        </div>
                    </div>
                    `).appendTo("#mentores");
                });
            })
        })
        
        $("#search-bar").focusout(function(){
            var searchValue = $("#search-bar").val();

            $.get(`http://localhost:3333/search/?name=${searchValue}`, function( data ){
                let myResponse = data.users
        
                myResponse.forEach(element => {
                    $(`
                    <div id="mentor">
                        <img src="https://github.com/carllitsy.png" alt="foto do mentor" id="profile">
                        <div id="mentor-info">
                        <h3 style="font-weight: 600;">${element.name}</h3>
                        <h6 style="font-weight: 500; margin-bottom: 16px;">${element.email}</h6>
                        <p style="font-weight: 400; margin-bottom: 24px;">Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
                        Temporibus, commodi quam molestiae laborum voluptate consectetur</p>
                        <div id="tags-mentor">
                            <p>JavaScript</p>
                            <p>C</p>
                            <p>PHP</p>
                            <p>React</p>
                        </div>
                        </div>
                        <div id="btns">
                        <button class="btn-agendar">Agendar mentoria</button>
                        <button class="btn-perfil">Ver perfil</button>
                        </div>
                    </div>
                    `).appendTo("#mentores");
                });
            })
        })
    })
}

searchMentorByName()