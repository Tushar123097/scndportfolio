// Custom Cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    }, 100);
});

// Hamburger Menu
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Scroll to Top Button
const scrollTopBtn = document.querySelector('.scroll-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.style.display = 'block';
    } else {
        scrollTopBtn.style.display = 'none';
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Three.js Particle Background
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('particles-js').appendChild(renderer.domElement);

// Create particles
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 2000;
const posArray = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 5;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
const particlesMaterial = new THREE.PointsMaterial({
    size: 0.005,
    color: 0x00f7ff,
    transparent: true,
    opacity: 0.8
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

camera.position.z = 2;

// Animation
function animate() {
    requestAnimationFrame(animate);
    particlesMesh.rotation.y += 0.001;
    renderer.render(scene, camera);
}

animate();

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Hero Section Animation
gsap.from('.hero-content', {
    duration: 1,
    y: 50,
    opacity: 0,
    ease: 'power3.out'
});

// About Section Animation
gsap.from('.about-content', {
    scrollTrigger: {
        trigger: '.about',
        start: 'top center'
    },
    duration: 1,
    y: 50,
    opacity: 0,
    ease: 'power3.out'
});

// Skills Section Animation
gsap.from('.skill-card', {
    scrollTrigger: {
        trigger: '.skills',
        start: 'top center'
    },
    duration: 0.8,
    y: 50,
    opacity: 0,
    stagger: 0.2,
    ease: 'power3.out'
});

// Projects Section Animation
gsap.from('.project-card', {
    scrollTrigger: {
        trigger: '.projects',
        start: 'top center'
    },
    duration: 0.8,
    y: 50,
    opacity: 0,
    stagger: 0.2,
    ease: 'power3.out'
});

// Contact Section Animation
gsap.from('.contact-content', {
    scrollTrigger: {
        trigger: '.contact',
        start: 'top center'
    },
    duration: 1,
    y: 50,
    opacity: 0,
    ease: 'power3.out'
});

// Form Submission
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Simulate form submission
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        submitBtn.textContent = 'Message Sent!';
        submitBtn.style.backgroundColor = '#4CAF50';
        
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.style.backgroundColor = '';
            contactForm.reset();
        }, 2000);
    }, 1500);
});

// 3D Hover Effect for Project Cards
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
});

// Parallax Effect
const heroContent = document.querySelector('.hero-content');

document.addEventListener('mousemove', (e) => {
    const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
    const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
    
    heroContent.style.transform = `translate(${moveX}px, ${moveY}px)`;
});

// Particle Interaction
document.addEventListener('mousemove', (e) => {
    const mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    const mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    
    particlesMesh.rotation.x = mouseY * 0.2;
    particlesMesh.rotation.y = mouseX * 0.2;
});

// Social Dropdown and Mobile Menu
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const socialTrigger = document.querySelector('.social-trigger');
    const socialDropdown = document.querySelector('.social-dropdown-content');

    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Handle social dropdown on mobile
    if (window.innerWidth <= 768) {
        socialTrigger.addEventListener('click', function(e) {
            e.preventDefault();
            socialDropdown.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}); 