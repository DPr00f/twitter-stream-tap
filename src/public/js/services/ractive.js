import Ractive from '../libs/ractive';
var scriptSource = (function() {
    var scripts = document.getElementsByTagName('script'),
        script = scripts[scripts.length - 1];

    if (script.getAttribute.length !== undefined) {
        return script.getAttribute('src');
    }

    return script.getAttribute('src', 2);
}());

Ractive.DEBUG = !/\.min\.js/.test(scriptSource);

export default function ractive(options) {
  return new Ractive(options);
}
