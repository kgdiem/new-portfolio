const animations = require('./animations.js');
const changeText = require('./changeText.js');

module.exports = (window) => {
  
    changeText();
    
    window.onpopstate = function(event) {
      if(document.location.pathname == '/projects'){
        animations.switchToProjects();
      }else{
        animations.switchToHome();
      }
    };
    
    window.onload = function(event){
      if(document.location.pathname == '/projects'){
        animations.switchToProjects();
      }
    };
};