let id = queryString("id");

function queryString(parameter){
    let loc = location.search.substring(1, location.search.length);
    let param_value = false;   
    let params = loc.split("&");

    for (i=0; i<params.length;i++) {   
        param_name = params[i].substring(0,params[i].indexOf('='));   
        if (param_name == parameter) {                                          
            param_value = params[i].substring(params[i].indexOf('=')+1)   
        }   
    } 

    if (param_value) {   
        return param_value;   
    } 

    else {   
        return undefined;   
    }   
}

function loadMentor(){
    const url = 'http://localhost:3333/user/'

    $(document).ready(function(){
        $.get(url + id, function( data ){
            let myResponse = data.user

            $("#name-mentor").html(myResponse.name)
            $("#jobTitle-mentor").html(myResponse.jobTitle)
            $("#aboutMe").html(myResponse.about)
            $("#tags-mentor").append(skillComponent(myResponse.skills))
        })
    })
}

loadMentor()


