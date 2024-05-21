import $ from 'jquery';
import _ from 'lodash';
import '../css/main.css';
import logo from '../assets/holberton-logo.jpg';

$(document).ready(function() {
  $('body').append('<div id="logo"></div>');
  $('body').append('<p>Holberton Dashboard</p>');
  $('body').append('<p>Dashboard data for the students</p>');
  $('body').append('<button id="start-btn">Click here to get started</button>');
  $('body').append('<p id="count"></p>');
  $('body').append('<p>Copyright - Holberton School</p>');

  $('#logo').css({
    'width': '200px',
    'height': '200px',
    'background-image': `url(${logo})`,
    'background-size': '200px 200px',
    'background-repeat': 'no-repeat',
  });

  let count = 0;

  function updateCounter() {
    count++;
    $('#count').text(`${count} clicks on the button`);
  }

  $('#start-btn').on('click', _.debounce(updateCounter, 1000, { leading: true, trailing: false }));
});