module.exports = changeTextInitiator;

let dom = require('./dom.js');

const types = ['web', 'android', 'javascript', 'java', 'php', 'python'];

function changeTextInitiator(index = 0){
  
  let interval = dom.home.hasAttribute('interval') ? dom.home.getAttribute('interval') : false;
  
  
  changeText(types[index]);
  
  if(interval)
    clearInterval(parseInt(interval));
  
  interval = setInterval(function(){
    index++;
    
    if(index >= types.length)
      index = 0;
    
    changeText(types[index]);
    
  }, 2000);
  
  dom.home.setAttribute('interval', interval);
  
}

function changeText(str){
  dom.type.textContent = str;
}