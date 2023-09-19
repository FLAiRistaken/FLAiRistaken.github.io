const proj1 = document.getElementById('proj1');
const proj2 = document.getElementById('proj2');
const proj3 = document.getElementById('proj3');
const nextBut = document.getElementById('nextButton');
const prevBut = document.getElementById('prevButton');
const carousel = document.getElementById('modulesCarousel');
const carouselContainer = document.getElementById('carouselContainer');
const contactGrid = document.getElementById('contactGrid');
const contactForm = document.getElementById('contactForm');
const googleMap = document.getElementById("googleMap");
const contactTextContainer = document.getElementById('contactTextContainer');
const navToggler = document.querySelector('.nav-toggler');
const nav = document.querySelector('.nav');
const navBackground = document.querySelector('.nav-background');
const lineOne = document.querySelector('.nav-toggler .line-1');
const lineTwo = document.querySelector('.nav-toggler .line-2');
const lineThree = document.querySelector('.nav-toggler .line-3');
const home = nav.children[0];
const about = nav.children[1];
const projects = nav.children[2];
const contact = nav.children[3];
const header = document.getElementsByTagName('header')[0];
const main = document.getElementsByTagName('main')[0];
const bodyTitle = document.querySelector('.body-title');
const titleBar = document.querySelector('.title-bar');
const titleBarContainer = document.querySelector('.title-bar-container');
const title = document.querySelector('.title');
const headerSec = document.querySelector('.header-sec');

/******** FUNCTIONS ********/

// function that overrides the default submit action and instead gets the form data in json format and formats it into a text file
function handleSubmit(ev) {
  ev.preventDefault();
  const form = ev.target;
  const data = new FormData(form);
  const jsonString = JSON.stringify(Object.fromEntries(data.entries()));
  const json = JSON.parse(jsonString);

  const file = new File(['Date submitted: ' + new Date() + '\nName: ' + json['name'] + '\nEmail: ' + json['email']
                         + '\nMessage: ' + json['message']], 'contact.txt', {type: 'text/plain'});

  console.log(json);

  downloadFile(file);

  alert('Thank you for your message, ' + json['name'] + '!');
}

// function that downloads the file containing the form data
function downloadFile(file) {
  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = URL.createObjectURL(file);
  a.download = file.name;

  document.body.appendChild(a);
  a.click();

  window.URL.revokeObjectURL(a.href);
  document.body.removeChild(a);
}

/******** MEDIA PREFERENCE CHECKER ********/
// function that checks if the user has set their media preference to reduce motion
// and if so, applies the opaque class to all elements
function checkReducedMotion() {
  const mediaPref = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (mediaPref.matches) {
    // get all elements and apply opaque class to them
    const allElements = Array.from(document.querySelectorAll('*'));
    allElements.forEach(element => {
      element.classList.add('opaque');
    });
  }
}

/******** INTERSECTION OBSERVER ********/
// function that applies the scroll-anim class to elements when they are in the viewport
// makes use of a timeout to delay the animation so that it doesn't happen all at once
function scrollAnimationApplier() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('scroll-anim');
        }, 300);
      }
    });
  });

  const subtitles = Array.from(document.querySelectorAll('.subtitle'));
  const projGrids = Array.from(document.querySelectorAll('.proj-grid-container'));
  const paras = Array.from(document.getElementsByTagName('p'));
  const h2s = Array.from(document.getElementsByTagName('h2'));
  const links = Array.from(document.querySelectorAll('.link'));
  const linkWrapper = document.querySelector('.link-wrapper');
  const socials = Array.from(document.querySelectorAll('.social'));
  const inputs = Array.from(document.querySelectorAll('.input'));
  const submit = document.querySelector('.submit');
  const hello = document.querySelector('.hello');
  const subH = document.querySelector('.sub-h');
  const headingUnderline = document.querySelector('.heading-underline');


  const elements = [].concat(subtitles, carousel, projGrids, links, linkWrapper, socials, inputs, submit, paras, h2s,
                             title, hello, subH, headingUnderline, googleMap);

  elements.forEach(element => {
    observer.observe(element);
  });
}
/******** EVENT LISTENERS ********/

// function that contains most event listeners
function eventListeners() {
  navToggler.addEventListener('click', ev => {
    if (nav.classList.contains('open')) {
      navClose();
      navToggler.ariaExpanded = 'false';
    } else {
      navOpen();
      navToggler.ariaExpanded = 'true';
    }
    console.log('nav toggled');
  });

  contactForm.addEventListener('submit', handleSubmit);

  home.addEventListener('click', ev => {
    navButtonPress(home);
    console.log('home clicked');
  });

  about.addEventListener('click', ev => {
    navButtonPress(about);
    console.log('about clicked');
  });

  projects.addEventListener('click', ev => {
    navButtonPress(projects);
    console.log('projects clicked');
  });

  contact.addEventListener('click', ev => {
    navButtonPress(contact);
    console.log('contact clicked');
  });

  /* Project card hover event listsers that fades out the cards not currently hovered over */
  proj1.addEventListener('mouseover', ev => {
    proj2.style.opacity = '0.35';
    proj3.style.opacity = '0.35';
  });
  proj1.addEventListener('mouseout', ev => {
    proj2.style.opacity = '1';
    proj3.style.opacity = '1';
  });
  proj2.addEventListener('mouseover', ev => {
    proj1.style.opacity = '0.35';
    proj3.style.opacity = '0.35';
  });
  proj2.addEventListener('mouseout', ev => {
    proj1.style.opacity = '1';
    proj3.style.opacity = '1';
  });
  proj3.addEventListener('mouseover', ev => {
    proj1.style.opacity = '0.35';
    proj2.style.opacity = '0.35';
  });
  proj3.addEventListener('mouseout', ev => {
    proj1.style.opacity = '1';
    proj2.style.opacity = '1';
  });
}

// function when nav menu is opened
// applies classes to relevant elements, some of which are used for animations
function navOpen() {
  document.body.style.overflow = 'hidden';
  navBackground.classList.add('open');
  lineOne.classList.add('line-cross');
  lineTwo.classList.add('fade-out');
  lineThree.classList.add('line-cross');
  navToggler.classList.add('open');
  nav.classList.add('open');
  if (titleBar.contains(title)) {
    title.classList.add('open');
    titleBar.classList.add('open');
  }
  nav.classList.remove('nav-close-anim');
  navBackground.classList.remove('nav-close-anim');
  nav.classList.add('nav-open-anim');
  navBackground.classList.add('nav-open-anim');
}

// function used when nav menu is closed
// removes the classes applied when nav menu is opened
function navClose() {
  document.body.style.overflow = 'auto';
  lineOne.classList.remove('line-cross');
  lineTwo.classList.remove('fade-out');
  lineThree.classList.remove('line-cross');
  navToggler.classList.remove('open');
  if (titleBar.contains(title)) {
    title.classList.remove('open');
    titleBar.classList.remove('open');
  }
  nav.classList.remove('nav-open-anim');
  navBackground.classList.remove('nav-open-anim');
  nav.classList.add('nav-close-anim');
  navBackground.classList.add('nav-close-anim');
  // time out to allow animation to finish before nav and navBackground
  // displays are set to none
  setTimeout(() => {
    nav.classList.remove('open');
    navBackground.classList.remove('open');
  }, 700);
}

// function used when screen is resized
// closes the nav menu and removes animations from the nav menu
function closeAndRemoveNavAnimations() {
  navClose();
  nav.classList.remove('nav-open-anim');
  navBackground.classList.remove('nav-open-anim');
  nav.classList.remove('nav-close-anim');
  navBackground.classList.remove('nav-close-anim');
}

// function used when nav menu buttons are clicked
// closes the nav menu (if it is open) and sets the active button
function navButtonPress(button) {
  if (nav.classList.contains('open')) {
    navClose();
    home.classList.remove('active');
    about.classList.remove('active');
    projects.classList.remove('active');
    contact.classList.remove('active');
    button.classList.add('active');
  } else {
    home.classList.remove('active');
    about.classList.remove('active');
    projects.classList.remove('active');
    contact.classList.remove('active');
    button.classList.add('active');
  }
}

// function used to control the carousel
function carouselFunction() {
  // calculating percentage to translate the carousel container per card (23 cards in the carousel)
  const amount = 100 / 23;
  let value = 0;

  nextBut.addEventListener('click', ev => {
    if (value < (carouselContainer.children.length-1) * amount) {
      value += amount;
      carouselContainer.style.transform = `translateX(-${value}%)`;
    } else {
      value = 0;
      carouselContainer.style.transform = `translateX(-${value}%)`;
    }
  });

  prevBut.addEventListener('click', ev => {
    if (value > 0) {
      value -= amount;
      carouselContainer.style.transform = `translateX(-${value}%)`;
    } else {
      value = (carouselContainer.children.length-1) * amount;
      carouselContainer.style.transform = `translateX(-${value}%)`;
    }
  });
}

// function adds the title to the bodyTitle element
// calls titleBarScroll if the document is scrolled
function addTitleToBody() {
  if (document.documentElement.scrollTop > 50) {
    titleBarSroll();
  } else {
    bodyTitle.appendChild(title);
  }
  title.classList.remove('mobile');
  if (nav.classList.contains('open')) {
    nav.classList.remove('open');
  }
  console.log('title to bodyTitle');
}

// function adds the title to the titleBar element or removes it, depending on the scroll position
// also adds classes to the titleBar and headerSec elements allowing for animations and styling
function titleBarSroll() {
  // if the document is scrolled more than 350px and the titleBar does not contain the title
  // add the title to the titleBar
  if (document.documentElement.scrollTop > 350) {
    if (titleBarContainer.contains(title)) {
      return;
    }
    titleBar.classList.add('scrolled');
    title.classList.add('scrolled');
    headerSec.classList.add('scrolled');
    titleBarContainer.appendChild(title);
    console.log('titleBar scrolled');
  } else {
    if (bodyTitle.contains(title)) {
      return;
    }
    titleBar.classList.remove('scrolled');
    title.classList.remove('scrolled');
    headerSec.classList.remove('scrolled');
    bodyTitle.appendChild(title);
    console.log('titleBar not scrolled');
  }
}

function titleBarScrollMobile() {
  if (document.documentElement.scrollTop > 0) {
    titleBar.classList.add('scrolled');
    console.log('titleBar scrolled');
  } else {
    titleBar.classList.remove('scrolled');
    title.classList.remove('scrolled');
    headerSec.classList.remove('scrolled');
    console.log('titleBar not scrolled');
  }
}

// function used to set the active nav button depending on the scroll position
function activeNavButton() {
  if (document.documentElement.scrollTop < 700) {
    navButtonPress(home);
  } else if (document.documentElement.scrollTop < 1650) {
    navButtonPress(about);
  } else if (document.documentElement.scrollTop < 3000) {
    navButtonPress(projects);
  } else {
    navButtonPress(contact);
  }
}

// function used to set the active nav button depending on the scroll position on mobile
// (different scroll positions on smaller screens)
function activeNavButtonMobile() {
  if (document.documentElement.scrollTop < 700) {
    navButtonPress(home);
  } else if (document.documentElement.scrollTop < 1650) {
    navButtonPress(about);
  } else if (document.documentElement.scrollTop < 3700) {
    navButtonPress(projects);
  } else {
    navButtonPress(contact);
  }
}

// function used to determine whether to call activeNavButton or activeNavButtonMobile
// depending on the screen size
function setActiveNavButton() {
  if (document.documentElement.clientWidth >= 700) {
    activeNavButton();
  } else {
    activeNavButtonMobile();
  }
}

// function used to determine whether to call titleBarScroll or titleBarScrollMobile
// also calls setActiveNavButton
function scrollFunction() {
  if (title.classList.contains('mobile')) {
    titleBarScrollMobile();
  } else {
    titleBarSroll();
  }
  setActiveNavButton();
}

// function used to call all functions needed on screen resize
function resizeFunctions() {
  addTitleToBody();
  contactLayout();
  closeAndRemoveNavAnimations();
}

/*
 Google Maps API
 https://developers.google.com/maps/documentation/javascript/adding-a-google-map#maps_add_map-javascript
*/

// Initialize and add the map
function initMap() {
  // The location of Leicester
  const leics = { lat: 52.6369, lng: -1.1398 };
  // The map, centered at Leicester
  const map = new google.maps.Map(googleMap, {
    zoom: 4,
    center: leics,
  });
  // The marker, positioned at Leicester
  const marker = new google.maps.Marker({
    position: leics,
    map: map,
  });
}

// function to handle the layout of the contact section
// depending on the screen size
function contactLayout() {
  if (document.documentElement.clientWidth >= 700) {
    contactTextContainer.appendChild(googleMap)
    console.log('map to contactTextContainer');
  } else {
    contactGrid.appendChild(googleMap);
    console.log('map to contactGrid');
  }
}

/* CALLING FUNCTIONS */
window.initMap = initMap;
window.onresize = resizeFunctions;
window.onscroll = scrollFunction;

addTitleToBody();
scrollFunction();
carouselFunction();
contactLayout();
eventListeners();
scrollAnimationApplier();
checkReducedMotion();