let selected = [];
const token = localStorage.getItem('token');

function queryString(parameter) {
  let loc = location.search.substring(1, location.search.length);
  let param_value = false;
  let params = loc.split('&');

  for (i = 0; i < params.length; i++) {
    param_name = params[i].substring(0, params[i].indexOf('='));
    if (param_name == parameter) {
      param_value = params[i].substring(params[i].indexOf('=') + 1);
    }
  }

  if (param_value) {
    return param_value;
  } else {
    return undefined;
  }
}

function loadMentor() {
  const url = 'https://squad-sixteen-backend.herokuapp.com/user/';

  $(document).ready(function () {
    $.ajax({
      url: url + queryString('id'),
      type: 'GET',
      headers: { Authorization: 'Bearer ' + token },
      success: function (data) {
        let myResponse = data.user;

        $('#name-mentor').html(myResponse.name);
        $('#jobTitle-mentor').html(myResponse.jobTitle);
        $('#aboutMe').html(myResponse.about);
        $('#tags-mentor').append(skillComponent(skillsToList(myResponse)));
        $('.profile-photo').attr('src', myResponse.profileImgUrl);
      },
    });
  });
}

function loadProfileImage() {
  $(document).ready(function () {
    $('.mini-profile').attr('src', localStorage.getItem('profileImg'));
  });
}

loadProfileImage();
loadMentor();

$(document).ready(function () {
  $('#dias div').click(function () {
    $(this).closest('#dias').find('div').removeClass('selected');
    $(this).addClass('selected');
  });

  $('#horas p').click(function () {
    $(this).closest('#horas').find('p').removeClass('selected');
    $(this).addClass('selected');
  });

  $('#duracao p').click(function () {
    $(this).closest('#duracao').find('p').removeClass('selected');
    $(this).addClass('selected');
  });

  $('#close').click(function () {
    $('#confirmacao').addClass('off');
  });

  $('#agendar').click(function () {
    selected.push(
      document.querySelectorAll('#dias .selected p')[0].textContent
    );
    selected.push(
      document.querySelectorAll('#dias .selected p')[1].textContent
    );
    selected.push(document.querySelector('#horas .selected').textContent);
    selected.push(document.querySelector('#duracao .selected').textContent);

    $('div').removeClass('selected');
    $('p').removeClass('selected');

    $('#confirmacao').removeClass('off');

    fetch('https://squad-sixteen-backend.herokuapp.com/connect', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({
        mentorId: parseInt(queryString('id')),
      }),
    }).then((data) => {
      if (data.status === 201 || data.status === 401) {
        setTimeout(function(){
          document.location.replace('/chat');
        }, 2500)
      }
    });
  });
});
