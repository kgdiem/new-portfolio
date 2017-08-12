module.exports = {
    getProjects: getProjects,
    appendProjects: appendProjects
};

const dom = require('./dom.js');

async function getProjects(){
  const data = await fetch('/api/projects');
  
  const json = await data.json();
  
  return json;
}

function appendProjects(projects){
  projects.map(project => dom.projectSection.appendChild(projectNode(project)));
}

function projectNode(project){
  let p = document.createElement('div');
  
  let description = project.desc ? project.desc : ``;

  p.classList.add('col-12', 'projects');
  
  if(project.git){
    description += `<br><a href="${project.git}"><img height="50px" width="50px" src="/resources/icons/github-icon-black.svg"></a>`;
  }
  
  if(project.url){
    if(!project.git)
      description += '<br>';
      
    description += `<a href="${project.url}"><img height="50px" width="40px" src="/resources/icons/web.svg"></a>`
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