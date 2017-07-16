/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var projectSection = document.querySelector('#projects');
var projectContainer = document.querySelector('#projects .container');
var home = document.querySelector('#top');
var type = document.querySelector('#type');
var interval;

var types = ['web', 'android', 'javascript', 'java', 'php', 'python'];

getProjects().then(function (json) {
  appendProjects(json);
});

changeTextInitiator();

window.onpopstate = function (event) {
  console.log(document.location);
  if (document.location.pathname == '/projects') {
    switchToProjects();
  } else {
    switchToHome();
  }
};

window.onload = function (event) {
  if (document.location.pathname == '/projects') {
    switchToProjects();
  }
};

document.querySelector('a[href="#projects"]').onclick = switchToProjects;
document.querySelector('#back').onclick = function () {
  return switchToHome();
};

async function getProjects() {
  var data = await fetch('/api/projects');

  var json = await data.json();

  return json;
}

function appendProjects(projects) {
  projects.map(function (project, i) {
    projectSection.appendChild(projectNode(project));
  });
}

function projectNode(project) {
  var p = document.createElement('div');

  var description = project.desc ? project.desc : 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.';

  p.classList.add('col-12');
  p.classList.add('projects');

  if (project.git) {
    description += '<br><a href="' + project.git + '"><img height="50px" width="50px" src="http://untv.github.io/assets/images/github-icon-black.svg"></a>';
  }

  if (project.url) {
    if (!project.git) description += '<br>';

    description += '<a href="' + project.url + '"><img height="50px" width="40px" src="http://cdn.onlinewebfonts.com/svg/img_387394.svg"></a>';
  }

  p.innerHTML = '\n    <h2>' + project.name + '</h2>\n    <div class="projects-div">\n      <div>\n        <img class="project-img" src="' + project.img + '">\n        <p>' + description + '</p>\n      </div>\n    </div>';

  return p;
}

function switchToProjects(e) {
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }

  home.classList.add('rotateOut');

  setTimeout(function () {
    projectSection.style.display = 'block';

    projectSection.classList.add('rotateInTop');

    window.history.pushState({}, "Projects", "projects");

    setTimeout(function () {
      projectSection.classList.remove('rotateInTop');
    }, 600);
  }, 350);

  setTimeout(function () {

    home.style.display = 'none';
    home.classList.remove('rotateOut');

    clearInterval(interval);
  }, 600);
}

function switchToHome(e) {
  if (e) {
    e.preventDefault();
    e.stopPropagation();
  }
  projectSection.classList.add('rotateOutLeft');

  setTimeout(function () {
    home.style.display = 'block';

    home.classList.add('rotateInBottom');

    window.history.pushState({}, "Kevin Diem", "/");

    setTimeout(function () {
      home.classList.remove('rotateInBottom');
    }, 600);
  }, 350);

  setTimeout(function () {

    projectSection.style.display = 'none';
    changeTextInitiator();

    return projectSection.classList.remove('rotateOutLeft');
  }, 600);
}

function changeTextInitiator() {
  var index = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;


  changeText(types[index]);

  if (interval) clearInterval(interval);

  interval = setInterval(function () {
    index++;

    if (index >= types.length) index = 0;

    changeText(types[index]);
  }, 2000);

  console.log(interval);
}

function changeText(str) {
  type.textContent = str;
}

/***/ })
/******/ ]);