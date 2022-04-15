const token = localStorage.getItem('token');

function loadMentors() {
  const url = 'https://squad-sixteen-backend.herokuapp.com/search';

  $(document).ready(function () {
    $.ajax({
      url: url,
      type: 'GET',
      headers: { Authorization: 'Bearer ' + token },
      success: function (data) {
        let myResponse = data.users.filter(isMentor && isMyProfile);

        console.log(myResponse);

        myResponse.forEach((users) => {
          $(mentorComponent(users)).appendTo('#mentores');
        });
      },
    });
  });
}

function searchMentorByName() {
  const url = 'https://squad-sixteen-backend.herokuapp.com/search/';

  $(document).ready(function () {
    $('#search-bar').keypress(function (event) {
      var keycode = event.keyCode ? event.keyCode : event.which;

      if (keycode == '13') {
        var searchValue = $('#search-bar').val();
      }

      $.ajax({
        url: url + `?name=${searchValue}`,
        type: 'GET',
        headers: { Authorization: 'Bearer ' + token },
        success: function (data) {
          let myResponse = data.users;

          $('#mentores').empty();

          myResponse.forEach((users) => {
            $(mentorComponent(users)).appendTo('#mentores');
          });
        },
      });
    });

    $('#search-bar').focusout(function () {
      var searchValue = $('#search-bar').val();

      $.ajax({
        url: url + `?name=${searchValue}`,
        type: 'GET',
        headers: { Authorization: 'Bearer ' + token },
        success: function (data) {
          let myResponse = data.users;

          $('#mentores').empty();

          myResponse.forEach((users) => {
            $(mentorComponent(users)).appendTo('#mentores');
          });
        },
      });
    });
  });
}

function goToMentorPage(id) {
  window.location = '/profile/index.html?id=' + id;
}

function isMentor(user) {
  return user.mentor == true;
}

function isMyProfile(user) {
  return user.id != localStorage.getItem('id');
}

function loadProfileImage() {
  $(document).ready(function () {
    $('.mini-profile').attr('src', localStorage.getItem('profileImg'));
  });
}

loadMentors();
searchMentorByName();
loadProfileImage();
