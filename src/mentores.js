const url = 'https://randomuser.me/api/?results=1'
let get_data;


$(document).ready(function(){
    $('.btn-agendar').click(function(){
        $.get(url, function(data){
            get_data = data;
            console.log(get_data.results[0].email)
        });
    })

    $('.btn-perfil').click(function(){
        $(this).append(get_data.results[0].email);
    })
})

// $.get(url, function( data ){
//     get_data = data;
//     alert ( get_data.results[0].email )

//     $(`
//         <div id="mentor">
//         <img src= ${data.results[0].picture.large} alt="foto do mentor" id="profile">
//         <div id="mentor-info">
//         <h3 id="mentor-name" style="font-weight: 600;"> ${data.results[0].name.first} </h3>
//         <h6 style="font-weight: 500; margin-bottom: 16px;"> ${data.results[0].login.username} </h6>
//         <p style="font-weight: 400; margin-bottom: 24px;">Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
//         Temporibus, commodi quam molestiae laborum voluptate consectetur</p>
//         <div id="tags-mentor">
//             <p>JavaScript</p>
//             <p>C</p>
//             <p>PHP</p>
//             <p>React</p>
//         </div>
//         </div>
//         <div>
//         <button class="btn-agendar">Agendar mentoria</button>
//         <button class="btn-perfil">Ver perfil</button>
//         </div>
//     </div>    
//     `).appendTo("#mentores");
// })

