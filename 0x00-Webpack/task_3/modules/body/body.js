import $ from 'jquery';
import _ from 'lodash';
import '../css/body.css';

$('body').append('<button>Click me</button>');
$('body').append('<p id="count"></p>');
let count = 0;

$('button').on('click', _.debounce(() => {
  count += 1;
  $('#count').text(`Count: ${count}`);
}, 500));