import Ractive from '../libs/ractive';

export function add(options) {
  return Ractive.extend(options);
}

export function register(name, widget) {
  Ractive.components[name] = widget;
}
