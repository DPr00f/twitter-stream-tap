import { add } from '../services/component';
import inputView from '../views/input';
import utils from '../utils';
function onBlur() {
  let value = this.value.trim();
  if (value.length === 0) {
    utils.removeClass(this, 'input--filled');
  }
}

function onFocus() {
  utils.addClass(this, 'input--filled');
}

var Input = add({
  template: inputView,


  data: {
    placeholder: ''
  },
  

  onrender: function() {
    let el = this.find('input');
    this.on('blur', onBlur.bind(el));
    this.on('focus', onFocus.bind(el));
  }
});
export default Input;
