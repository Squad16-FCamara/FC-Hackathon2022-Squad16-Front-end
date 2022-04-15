function skillComponent(skills) {
    ret = '';

    skills.forEach(skill => {
        ret = ret + `<p>${skill}</p> \n`;
    });

    return ret;
}

function mentorComponent(user) {
    const skills = [];

    for(const[key, value] of Object.entries(user)){
        if(key == 'c' || key == 'cpp' || key == 'css' || key == 'html' || key == 'java' || key == 'javascript' || key == 'julia' || key == 'python' || key == 'r' || key == 'ruby' || key == 'typescript'){
            if(value != '0')
              skills.push(key)
          }
    }

    return (`
        <div id="mentor">
            <img src="${user.profileImgUrl}" alt="foto do mentor" id="profile">
            <div id="mentor-info">
            <h3 style="font-weight: 600;">${user.name}</h3>
            <h6 style="font-weight: 500; margin-bottom: 16px;">${user.jobTitle}</h6>
            <p style="font-weight: 400; margin-bottom: 24px;">${user.about}</p>
            <div id="tags-mentor">
                ${skillComponent(skills)}  
            </div>
            </div>
            <div id="btns">
            <button onclick="goToMentorPage(${user.id})" class="btn-agendar">Agendar mentoria</button>
            <button class="btn-perfil">Ver perfil</button>
            </div>
        </div>
    `);
}
