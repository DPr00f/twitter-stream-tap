import ractive from './services/ractive';

ractive({
  el: document.body,

  template: '<p>{{greeting}} {{name}}!</p>',

  data: {greeting: 'Hey', name: 'Joao'}
});