    // Mobile menu toggle
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("show");
    });

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Dark mode toggle
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
});

// Particles.js configuration
particlesJS('particles-js', {
    particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: '#3498db' },
        shape: { type: 'circle' },
        opacity: { value: 0.5, random: false },
        size: { value: 3, random: true },
        line_linked: { enable: true, distance: 150, color: '#3498db', opacity: 0.4, width: 1 },
        move: { enable: true, speed: 6, direction: 'none', random: false, straight: false, out_mode: 'out', bounce: false }
    },
    interactivity: {
        detect_on: 'canvas',
        events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' }, resize: true },
        modes: { repulse: { distance: 100, duration: 0.4 }, push: { particles_nb: 4 } }
    },
    retina_detect: true
});

// Sidebar toggle functionality
const sidebarToggle = document.querySelector('.sidebar-toggle');
const sideNavbar = document.querySelector('.side-navbar');

if (sidebarToggle && sideNavbar) {
    sidebarToggle.addEventListener('click', () => {
        sideNavbar.classList.toggle('show');
    });
}

// Movie button functionality
const movieBtn = document.querySelector('.movie-btn');
if (movieBtn) {
    movieBtn.addEventListener('click', () => {
      alert('Movie functionality coming soon!');
    });
}

// Mouse trail effect
const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll('.circle');

const colors = [
    '#ffb56b', '#fdaf69', '#f89d63', '#f59761', '#ef865e', '#ec805d', '#e36e5c', '#df685c',
    '#d5585c', '#d1525c', '#c5415d', '#c03b5d', '#b22c5e', '#ac265e', '#9c155f', '#950f5f',
    '#830060', '#7c0060', '#680060', '#60005f', '#48005f', '#3d005e'
];

circles.forEach(function (circle, index) {
    circle.x = 0;
    circle.y = 0;
    circle.style.backgroundColor = colors[index % colors.length];
});

window.addEventListener('mousemove', function(e){
    coords.x = e.clientX;
    coords.y = e.clientY;
});

function animateCircles() {
    let x = coords.x;
    let y = coords.y;
    
    circles.forEach(function (circle, index) {
        circle.style.left = x - 12 + 'px';
        circle.style.top = y - 12 + 'px';
        
        circle.style.scale = (circles.length - index) / circles.length;
        
        circle.x = x;
        circle.y = y;

        const nextCircle = circles[index + 1] || circles[0];
        x += (nextCircle.x - x) * 0.3;
        y += (nextCircle.y - y) * 0.3;
    });
 
    requestAnimationFrame(animateCircles);
}

animateCircles();

const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
const numberOfParticles = 100;

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.size > 0.2) this.size -= 0.1;

        // Wrap particles around the screen
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
    }

    draw() {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function init() {
    particles = [];
    for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height));
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        if (particles[i].size <= 0.2) {
            particles.splice(i, 1);
            i--;
        }
    }
    requestAnimationFrame(animate);
}

function handleResize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init(); // Reinitialize particles on resize
}

window.addEventListener('resize', handleResize);

let mouse = {
    x: null,
    y: null
}

window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y + window.scrollY; // Add scroll offset
    for (let i = 0; i < 2; i++) {
        particles.push(new Particle(mouse.x, mouse.y));
    }
});

init();
animate();


document.addEventListener('DOMContentLoaded', function() {
    const sideNavLinks = document.querySelectorAll('.side-navbar a');
    const projectItems = document.querySelectorAll('.project-item');
    const dynamicStyles = document.getElementById('dynamic-styles');
  
    function focusProject(projectId) {
      projectItems.forEach(item => {
        if (item.id === projectId) {
          item.classList.add('focused');
          item.classList.remove('blurred');
        } else {
          item.classList.add('blurred');
          item.classList.remove('focused');
        }
      });
  
      // Scroll to the focused project
      const focusedProject = document.getElementById(projectId);
      if (focusedProject) {
        focusedProject.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  
    function resetProjects() {
      projectItems.forEach(item => {
        item.classList.remove('focused', 'blurred');
      });
    }
  
    sideNavLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const projectId = this.getAttribute('data-project');
        focusProject(projectId);
  
        // Update URL hash without scrolling
        history.pushState(null, null, this.getAttribute('href'));
      });
    });
  
    // Handle initial load and back/forward navigation
    window.addEventListener('load', handleHashChange);
    window.addEventListener('hashchange', handleHashChange);
  
    function handleHashChange() {
      const hash = window.location.hash.substring(1);
      if (hash) {
        focusProject(hash);
      } else {
        resetProjects();
      }
    }
  
    // Reset projects when clicking outside
    document.addEventListener('click', function(e) {
      if (!e.target.closest('.side-navbar') && !e.target.closest('.project-item')) {
        resetProjects();
        history.pushState(null, null, window.location.pathname);
      }
    });
  });