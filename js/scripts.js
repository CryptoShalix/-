// ON INIT

$(document)
  .ready(function () {
    // Load header
    loadHeader();

    // Load pages
    loadMainContainer();

    // Load footer
    loadFooter();
  });

// PAGES

function loadHeader() {
  $("#header").load("./components/header.html", () => {
    $(".nav").load("./components/nav.html", () => {
      setActiveRouterLink();
    });
  });
}

function loadMainContainer() {
  $("#main-container").load("./pages/main.html", () => {
    loadContactForm();
    loadProjects();
    loadAboutMe();
    onTranslate();
  });
}

function loadFooter() {
  $("#footer").load("./components/footer.html", () => {
    onTranslate();
  });
}

function loadContactForm() {
  $(".contact-form").load("./components/contact-form.html", () => {
    onTranslate();
  });
}

// DATA

function loadProjects() {
  // Projects data
  const projects = [
    {
      id: 1,
      title: "BitAkashico",
      link: "https://cryptoshalix.github.io/BitAkashico",
      logo: "projects_bitakashico_logo.png",
      preview: "projects_bitakashico_preview.png",
      description: "bitakashico",
      show: true
    },
    {
      id: 2,
      title: "Corazon de Jazmyn",
      link: "https://corazondejazmyn.github.io/site",
      logo: "projects_corazondejazmyn_logo.png",
      preview: "projects_corazondejazmyn_preview.png",
      description: "corazondejazmyn",
      show: true
    },
    {
      id: 3,
      title: "Encuentra tu fuerza",
      link: "https://www.encuentratufuerza.com",
      logo: "projects_encuentratufuerza_logo.jpg",
      preview: "projects_encuentratufuerza_preview.png",
      description: "encuentratufuerza",
      show: true
    },
    {
      id: 4,
      title: "Finance manager",
      link: "https://cryptoshalix.github.io/finance-manager",
      logo: "projects_financemanager_logo.png",
      preview: "projects_financemanager_preview.png",
      description: "financemanager",
      show: false
    },
  ];

  // Select the ul element by its ID
  const $projectsList = $("#projects");

  // Clear the current list
  $projectsList.empty();

  // Iterate over the projects and append them to the ul element
  projects.forEach(project => {
    if (project.show) {
      const _html = `
        <img
          class="img-preview"
          src="images/${project.preview}"
          alt="${project.title} preview"
        />
        <div class="data flex row-mobile">
          <a
            class="link"
            href="${project.link}"
            target="_blank"
          >
            <img
              class="img"
              src="images/${project.logo}"
              alt="${project.title} logo"
            />
            <div class="link-text flex col h-start">
              <span class="title">${project.title}</span>
              <span class="url">
                ${project.link}
              </span>
            </div>
          </a>
          <span
            class="description trn flex p t-center"
            data-trn-key="pages.main.projects.${project.description}"
          ></span>
        </div>
      `;
      const $li = $("<li class='project'>").html(_html);
      $projectsList.append($li);
    }
  });
}

function loadAboutMe() {
  const aboutMeData = [
    {
      id: 'nickname',
      image: 'me_nature.jpg',
      show: true
    },
    {
      id: 'story_tech',
      image: 'me_tech.jpg',
      show: true
    },
    {
      id: 'story_spirit',
      image: 'me_sun.jpg',
      show: true
    }
  ];

  // Select the ul element by its ID
  const $aboutMeItem = $("#aboutMeData");

  // Clear the current list
  $aboutMeItem.empty();

  // Iterate over the items and append them to the ul element
  aboutMeData.forEach(item => {
    if (item.show) {
      const _html = `
        <input
          type="checkbox"
          id="${item.id}_title"
        />
        <label
          for="${item.id}_title"
          class="trn"
          data-trn-key="pages.about.${item.id}_title"
        ></label>
        <div class="content">
          <img src="images/${item.image}" alt="${item.image}">
          <span
            class="trn"
            data-trn-key="pages.about.${item.id}"
          ></span>
        </div>
      `;
      const $div = $("<div class='accordion'>").html(_html);
      $aboutMeItem.append($div);
    }
  });
}

// ON WINDOW CHANGED

$(window).on('hashchange', function (e) {
  setActiveRouterLink();
});

// NAVIGATION

let navShow = false;
function toggleNav() {
  // Toggle nav side menu
  navShow = !navShow;
  const navSide = $('.nav-side');
  if (navShow) {
    navSide.addClass('animate');
  } else {
    navSide.removeClass('animate');
  }
}

function setActiveRouterLink() {
  // For each link (a) with class .router-link do...
  $("a.router-link").each((event, routerLink) => {
    // Get current page location
    const currentPage = window.location.href;
    // Remove class 'active'
    $(routerLink).removeClass("active");
    // If the current link is the same as the currentPage
    if ($(routerLink)[0].href === currentPage
      || (!currentPage.includes('#') && $(routerLink)[0].href.includes('home'))
    ) {
      // Add class 'active'
      $(routerLink).addClass("active");
    }
  });
}

function onRouterClicked() {
  toggleNav();
}