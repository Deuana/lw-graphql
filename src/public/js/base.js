function toast(message, color) {
  $('.alert-message').html(message);
  $('.alert-wrapper .alert').addClass('alert-' + color).addClass('show');
}
