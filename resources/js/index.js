var projectSection = document.querySelector('#projects');
var projectContainer = document.querySelector('#projects .container');
var home = document.querySelector('#top');
var type = document.querySelector('#type');
var interval; 

var types = ['web', 'android', 'javascript', 'java', 'php', 'python'];

getProjects().then(json => {
  appendProjects(json);
});

changeTextInitiator();

document.querySelector('a[href="#projects"]').onclick = switchToProjects;
document.querySelector('#back').onclick = switchToHome;

async function getProjects(){
  var data = await fetch('/projects');
  
  var json = await data.json();
  
  console.log(json);
  return json;
}

function appendProjects(projects){
  projects.map((project, i) => {
    projectSection.appendChild(projectNode(project));
  });
}

function projectNode(project){
  var p = document.createElement('div');
  
  var description = project.description ? project.description : `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`;

  p.classList.add('col-12');
  p.classList.add('projects');
  
  if(project.git){
    description += `<br><a href="${project.git}"><img height="50px" width="50px" src="http://untv.github.io/assets/images/github-icon-black.svg"></a>`;
  }
  
  if(project.url){
    if(!project.git)
      description += '<br>';
      
    description += `<a href="${project.url}"><img height="50px" width="40px" src="http://cdn.onlinewebfonts.com/svg/img_387394.svg"></a>`
  }
  
  p.innerHTML = `
    <h2>${project.name}</h2>
    <div class="projects-div">
      <div>
        <img class="project-img" src="${project.img}">
        <p>${description}</p>
      </div>
    </div>`;
    
  return p;
  
}

function switchToProjects(e){
  e.preventDefault();
  e.stopPropagation();
  
  home.classList.add('rotateOut');
  
  setTimeout(function() {
    projectSection.style.display = 'block';
    
    projectSection.classList.add('rotateInTop');
    
    setTimeout(function(){
      projectSection.classList.remove('rotateInTop');
    }, 900);
    
  }, 600);
  
  setTimeout(function(){
    
    home.style.display = 'none';
    home.classList.remove('rotateOut');
    
    clearInterval(interval);
    
  }, 900);
}

function switchToHome(e){
  e.preventDefault();
  e.stopPropagation();
  
  projectSection.classList.add('rotateOutLeft');
  
  setTimeout(function(){
    home.style.display = 'block';
      
    home.classList.add('rotateInBottom');
    
    setTimeout(function(){
      home.classList.remove('rotateInBottom');
    }, 900);
    
  }, 600);
      
  
  setTimeout(function(){
    
    projectSection.style.display = 'none';
    changeTextInitiator();
    
    return projectSection.classList.remove('rotateOutLeft');
    
  }, 900);
  
}

function changeTextInitiator(index = 0){
  
  changeText(types[index]);
  
  interval = setInterval(function(){
    index++;
    
    if(index >= types.length)
      index = 0;
    
    changeText(types[index]);
    
  }, 2000);
  
}

function changeText(str){
  var ps = document.querySelectorAll('#intro p');
  
  type.textContent = str;
}