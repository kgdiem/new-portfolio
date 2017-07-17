module.exports = {
    switchToProjects: switchToProjects,
    switchToHome: switchToHome
};

let dom = require('./dom.js');

const changeText = require('./changeText.js');

function switchToProjects(e){
  if(e){
    e.preventDefault();
    e.stopPropagation();
  }
  
  dom.home.classList.add('rotateOut');
  
  setTimeout(function() {
    dom.projectSection.style.display = 'block';
    
    dom.projectSection.classList.add('rotateInTop');
    
    window.history.pushState({}, "Projects", "projects");
    
    setTimeout(function(){
      dom.projectSection.classList.remove('rotateInTop');
    }, 600);
    
  }, 350);
  
  setTimeout(function(){
    
    dom.home.style.display = 'none';
    dom.home.classList.remove('rotateOut');
    
    if(dom.home.hasAttribute('interval')){
      const interval = parseInt(dom.home.getAttribute('interval'));
      clearInterval(interval);
    }
  }, 600);
}

function switchToHome(e){
  if(e){
    e.preventDefault();
    e.stopPropagation();
  }
  dom.projectSection.classList.add('rotateOutLeft');
  
  setTimeout(function(){
    dom.home.style.display = 'block';
      
    dom.home.classList.add('rotateInBottom');
    
    window.history.pushState({}, "Kevin Diem", "/");
    
    setTimeout(function(){
      dom.home.classList.remove('rotateInBottom');
    }, 600);
    
  }, 350);
      
  
  setTimeout(function(){
    
    dom.projectSection.style.display = 'none';
    changeText();
    
    return dom.projectSection.classList.remove('rotateOutLeft');
    
  }, 600);
  
}