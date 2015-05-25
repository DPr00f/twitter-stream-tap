import './registerComponents';
import ractive from './services/ractive';

ractive({
  el: document.body,

  template: require('./views/index')
});
