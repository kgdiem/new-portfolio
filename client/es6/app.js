require('./lib/history.js')(window);

const projects = require('./lib/projects.js');
const animations = require('./lib/animations.js')

module.exports = (() => {
  
  projects.getProjects().then(projects.appendProjects);
  
  document.querySelector('a[href="#projects"]').onclick = animations.switchToProjects;
  document.querySelector('#back').onclick = animations.switchToHome;
  
})();