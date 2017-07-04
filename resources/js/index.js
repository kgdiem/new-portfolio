'use strict';

/* Fetch the data */
fetch("/projects").then(function (response) {
  return response.json();
}).then(function (data) {

  addProjects(data);

  var carousel = new Carousel();
  carousel.hideElements();
  carousel.addEventHandlers();
}).catch(function (error) {
  console.log(error);
});

/* add projects to the page */
function addProjects(projects) {
  var attrs = '';
  projects.map(function (project) {
    attrs = '';
    if(project.attrs)
      project.attrs.map(function (attr) {
        attrs += '<span> ' + attr + '; </span>';
    });

    var category = document.getElementById(project.category);
    
    if(category)
      category.innerHTML += '\n    <div class="project">\n      <h2 class="title text-center"> <a href="' + project.url + '">' + project.name + '</a> </h2>\n      <img src="' + project.img + '">\n      <div class="attributes">\n        ' + attrs + '\n      </div>\n    </div>\n    ';
  
    
  });
}

function Carousel() {
  /* get elements to fill */
  var full = document.getElementById("full"),
      front = document.getElementById("front"),
      back = document.getElementById("back"),
      android = document.getElementById("android");

  /* Get list of projects */
  this.projectElements = {
    fullProjects: full.getElementsByClassName("project"),
    frontProjects: front.getElementsByClassName("project"),
    backProjects: back.getElementsByClassName("project"),
    androidProjects: android.getElementsByClassName("project")
  };

  this.indexes = {
    full: 0,
    front: 0,
    back: 0,
    android: 0
  };

  var that = this;

  this.addEventHandlers = function addEventHandlers() {
    /* Get arrows */
    var arrows = document.getElementsByClassName("arrow");

    var i = 0;
    /* set onclick handler for each arrow */
    for (i; i < arrows.length; i++) {
      arrows[i].onclick = that.shift;
    }
  };

  this.hideElements = function hideElements() {
    var projectElements = that.projectElements;

    /* Get keys of each list */
    var keys = Object.keys(projectElements);

    /* We only want to hide the 2nd argument */
    var i = 1;

    /* loop thru keys */
    keys.map(function (key) {
      /* reset i */
      i = 1;

      /* if there's more than 1 */
      if (projectElements[key][i]) {
        /* loop thru and hide 'em */
        for (i; i < projectElements[key].length; i++) {
          projectElements[key][i].style.display = "none";
        }
      }
    });
  };

  /* Shift the carousel */
  this.shift = function shift(event) {
    var c = this.className,
        id = this.parentNode.id,
        index = that.indexes[id],
        length = that.projectElements[id + "Projects"].length;

    /* if it's right, add else subtract*/
    if (/(right)/ig.test(c)) {
      that.indexes[id] = index + 1 < length ? index + 1 : 0;
    } else {
      that.indexes[id] = index - 1 < 0 ? length - 1 : index - 1;
    }

    /*Switch the elements display properties*/
    that.projectElements[id + "Projects"][index].style.display = "none";
    that.projectElements[id + "Projects"][that.indexes[id]].style.display = "block";
  };
}