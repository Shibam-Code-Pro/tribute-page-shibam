// Enhanced Tribute Page Interactions
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    addScrollEffects();
    addInteractiveElements();
});

function initializeAnimations() {
    // Animate timeline items on scroll
    const timelineItems = document.querySelectorAll('.timeline-item');
    const achievementCards = document.querySelectorAll('.achievement-card');
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Initially hide elements for animation
    [...timelineItems, ...achievementCards].forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });
}

function addScrollEffects() {
    // Parallax effect for header
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const header = document.querySelector('header');
        const rate = scrolled * -0.5;
        
        if (header) {
            header.style.transform = `translateY(${rate}px)`;
        }
    });
    
    // Progress indicator
    const progressBar = createProgressBar();
    
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        
        progressBar.style.width = scrolled + '%';
    });
}

function createProgressBar() {
    const progressContainer = document.createElement('div');
    progressContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 4px;
        background: rgba(255, 255, 255, 0.1);
        z-index: 1000;
    `;
    
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        height: 100%;
        background: linear-gradient(45deg, #667eea, #764ba2);
        width: 0%;
        transition: width 0.3s ease;
    `;
    
    progressContainer.appendChild(progressBar);
    document.body.appendChild(progressContainer);
    
    return progressBar;
}

function addInteractiveElements() {
    // Add smooth scrolling to timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            item.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
        });
        
        // Add hover sound effect (visual feedback)
        item.addEventListener('mouseenter', () => {
            item.style.cursor = 'pointer';
        });
    });
    
    // Add typing effect to the main title
    addTypingEffect();
    
    // Add floating animation to achievement icons
    addFloatingAnimation();
    
    // Add image zoom functionality
    addImageZoom();
}

function addTypingEffect() {
    // Typing effect disabled to ensure title content is immediately available for tests
    // const title = document.getElementById('title');
    // const originalText = title.textContent;
    // title.textContent = '';
    
    // let i = 0;
    // const typeWriter = () => {
    //     if (i < originalText.length) {
    //         title.textContent += originalText.charAt(i);
    //         i++;
    //         setTimeout(typeWriter, 100);
    //     }
    // };
    
    // Start typing effect after a short delay
    // setTimeout(typeWriter, 500);
}

function addFloatingAnimation() {
    const icons = document.querySelectorAll('.achievement-icon');
    
    icons.forEach((icon, index) => {
        // Add CSS animation
        icon.style.animation = `float 3s ease-in-out infinite`;
        icon.style.animationDelay = `${index * 0.5}s`;
    });
    
    // Add CSS keyframes for floating animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
        }
        
        .timeline-item {
            cursor: pointer;
        }
        
        .timeline-item:hover .content {
            transform: translateY(-5px) scale(1.02);
        }
        
        .achievement-card {
            cursor: pointer;
        }
    `;
    document.head.appendChild(style);
}

function addImageZoom() {
    const image = document.getElementById('image');
    const imgDiv = document.getElementById('img-div');
    
    image.addEventListener('click', () => {
        // Create modal for image zoom
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 2000;
            cursor: pointer;
        `;
        
        const zoomedImage = image.cloneNode();
        zoomedImage.style.cssText = `
            max-width: 90%;
            max-height: 90%;
            border-radius: 15px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        `;
        
        modal.appendChild(zoomedImage);
        document.body.appendChild(modal);
        
        // Close modal on click
        modal.addEventListener('click', () => {
            document.body.removeChild(modal);
        });
        
        // Add escape key listener
        const escapeHandler = (e) => {
            if (e.key === 'Escape') {
                document.body.removeChild(modal);
                document.removeEventListener('keydown', escapeHandler);
            }
        };
        document.addEventListener('keydown', escapeHandler);
    });
    
    // Add click cursor to image
    image.style.cursor = 'pointer';
    image.title = 'Click to enlarge';
}

// Add smooth reveal animation for quote section
function addQuoteAnimation() {
    const quoteSection = document.querySelector('.quote-section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const blockquote = entry.target.querySelector('blockquote');
                const cite = entry.target.querySelector('cite');
                
                blockquote.style.opacity = '0';
                cite.style.opacity = '0';
                
                setTimeout(() => {
                    blockquote.style.transition = 'opacity 1s ease';
                    blockquote.style.opacity = '1';
                }, 300);
                
                setTimeout(() => {
                    cite.style.transition = 'opacity 1s ease';
                    cite.style.opacity = '1';
                }, 800);
            }
        });
    }, { threshold: 0.5 });
    
    if (quoteSection) {
        observer.observe(quoteSection);
    }
}

// Initialize quote animation
document.addEventListener('DOMContentLoaded', addQuoteAnimation);

// Add Easter egg - Konami code
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.code);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        triggerEasterEgg();
        konamiCode = [];
    }
});

function triggerEasterEgg() {
    // Add special effects
    document.body.style.animation = 'rainbow 2s infinite';
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    // Show message
    const message = document.createElement('div');
    message.textContent = '🎉 You discovered Marie Curie\'s secret! 🧪⚛️';
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(45deg, #667eea, #764ba2);
        color: white;
        padding: 20px 40px;
        border-radius: 15px;
        font-size: 1.2rem;
        font-weight: bold;
        z-index: 3000;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    `;
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        document.body.removeChild(message);
        document.body.style.animation = '';
    }, 3000);
}