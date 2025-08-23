        // Header scroll effect
        window.addEventListener('scroll', function() {
            const header = document.getElementById('header');
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });

        // Mobile menu toggle
        const menuBtn = document.getElementById('menuBtn');
        const navLinks = document.getElementById('navLinks');
        
        menuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
            });
        });

        // Animate skill bars when they come into view
        const skillBars = document.querySelectorAll('.skill-progress');
        
        function animateSkillBars() {
            skillBars.forEach(bar => {
                const position = bar.getBoundingClientRect();
                if(position.top < window.innerHeight && position.bottom >= 0) {
                    bar.style.width = bar.getAttribute('data-width');
                }
            });
        }

        window.addEventListener('scroll', animateSkillBars);
        // Initial call to check if skills are in view on page load
        animateSkillBars();

        // Form submission
        document.getElementById('contactForm').addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
            // Projects auto-scroll functionality
            document.addEventListener('DOMContentLoaded', function() {
                const track = document.querySelector('.projects-track');
                const cards = document.querySelectorAll('.project-card');
                const prevBtn = document.querySelector('.prev-btn');
                const nextBtn = document.querySelector('.next-btn');
                const dotsContainer = document.querySelector('.pagination-dots');
                
                let currentPosition = 0;
                let autoScrollInterval;
                const cardWidth = cards[0].offsetWidth + 30; // width + gap
                const visibleCards = Math.floor(document.querySelector('.projects-container').offsetWidth / cardWidth);
                const totalCards = cards.length;
                
                // Create pagination dots
                for (let i = 0; i < totalCards - visibleCards + 1; i++) {
                    const dot = document.createElement('div');
                    dot.classList.add('dot');
                    if (i === 0) dot.classList.add('active');
                    dot.addEventListener('click', () => {
                        moveToPosition(i);
                    });
                    dotsContainer.appendChild(dot);
                }
                
                const dots = document.querySelectorAll('.dot');
                
                // Function to move to specific position
                function moveToPosition(position) {
                    currentPosition = position;
                    track.style.transform = `translateX(-${currentPosition * cardWidth}px)`;
                    
                    // Update active dot
                    dots.forEach((dot, index) => {
                        dot.classList.toggle('active', index === currentPosition);
                    });
                }
                
                // Next button functionality
                nextBtn.addEventListener('click', () => {
                    if (currentPosition < totalCards - visibleCards) {
                        moveToPosition(currentPosition + 1);
                    } else {
                        moveToPosition(0); // Loop back to start
                    }
                    resetAutoScroll();
                });
                
                // Previous button functionality
                prevBtn.addEventListener('click', () => {
                    if (currentPosition > 0) {
                        moveToPosition(currentPosition - 1);
                    } else {
                        moveToPosition(totalCards - visibleCards); // Loop to end
                    }
                    resetAutoScroll();
                });
                
                // Auto-scroll functionality
                function startAutoScroll() {
                    autoScrollInterval = setInterval(() => {
                        if (currentPosition < totalCards - visibleCards) {
                            moveToPosition(currentPosition + 1);
                        } else {
                            moveToPosition(0); // Loop back to start
                        }
                    }, 5000); // Change every 5 seconds
                }
                
                function resetAutoScroll() {
                    clearInterval(autoScrollInterval);
                    startAutoScroll();
                }
                
                // Start auto-scroll
                startAutoScroll();
                
                // Pause auto-scroll on hover
                const projectsContainer = document.querySelector('.projects-container');
                
                projectsContainer.addEventListener('mouseenter', () => {
                    clearInterval(autoScrollInterval);
                });
                
                projectsContainer.addEventListener('mouseleave', () => {
                    startAutoScroll();
                });
                
                // Handle window resize
                window.addEventListener('resize', () => {
                    const newVisibleCards = Math.floor(document.querySelector('.projects-container').offsetWidth / cardWidth);
                    if (currentPosition > totalCards - newVisibleCards) {
                        moveToPosition(totalCards - newVisibleCards);
                    }
                });
            });
        