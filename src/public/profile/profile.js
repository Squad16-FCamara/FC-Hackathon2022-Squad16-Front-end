let selected = [];

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
  const url = 'http://localhost:3333/user/';

  $(document).ready(function () {
    $.ajax({
      url: url + queryString('id'),
      type: 'GET',
      headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
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
    alert('mentoria agendada');
    console.log(selected);
  });
});
