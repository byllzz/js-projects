
const pages = [
  { id: 'home', label: 'Home Page', content: 'Welcome to the Home Page' },
  { id: 'about', label: 'About Page', content: 'This is the About Section' },
  { id: 'skills', label: 'Projects Page', content: 'Check out my Skills and Projects' },
  { id: 'contact', label: 'Contact Page', content: 'Get in touch with me' }
];

const header = document.createElement('header');
const container = document.createElement('div');
container.className = 'tabs-container';

const tabElements = {};

pages.forEach((page, index) => {
  const btn = document.createElement('button');
  btn.textContent = page.label;
  btn.className = 'tab-link';
  btn.dataset.attribute = page.id;
  header.appendChild(btn);
  const contentDiv = document.createElement('div');
  contentDiv.className = 'tab';
  if (index === 0) contentDiv.classList.add('active');
  contentDiv.innerHTML = `<h1>${page.content}</h1>`;

  tabElements[page.id] = contentDiv;
  container.appendChild(contentDiv);
});
header.addEventListener('click', (e) => {
  const targetId = e.target.dataset.attribute;
  if (!targetId) return;
  Object.values(tabElements).forEach(div => {
    div.classList.toggle('active', div === tabElements[targetId]);
  });
});

document.body.append(header, container);
