import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Granim from 'granim';
import { CountUp } from 'countup.js/dist/countUp.min';
import Typed from 'typed.js';
import Headroom from 'headroom.js';


/* Switch theme */
const switchThemeBtn = document.querySelector('.theme-switch')
const switchThemeItem = document.querySelector('.switch')
const myBody = document.querySelector('body')

function toggleColorMode() {
    if (myBody.classList.contains('light-mode')) {
        myBody.classList.remove('light-mode');
        myBody.classList.add('dark-mode');
        switchThemeItem.classList.add('switched')
        switchThemeBtn.classList.add('switched')
    } else {
        myBody.classList.remove('dark-mode');
        myBody.classList.add('light-mode');
        switchThemeItem.classList.remove('switched')
        switchThemeBtn.classList.remove('switched')
    }
}

switchThemeBtn.addEventListener('click', toggleColorMode);

// Vérifier le mode de couleur actuel lors du chargement de la page
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    // Le navigateur est en mode sombre, initialisez votre page en mode sombre
    myBody.classList.add('dark-mode');
} else {
    // Le navigateur est en mode lumière, initialisez votre page en mode lumière
    myBody.classList.add('light-mode');
}


const myHeader = document.querySelector('#main-header');
var options = {
    // vertical offset in px before element is first unpinned
    offset: 0,
    // or you can specify offset individually for up/down scroll
    offset: {
        up: 100,
        down: 50
    },
    // scroll tolerance in px before state changes
    tolerance: 0,
    // or you can specify tolerance individually for up/down scroll
    tolerance: {
        up: 5,
        down: 0
    },
    // css classes to apply
    classes: {
        // when element is initialised
        initial: "headroom",
        // when scrolling up
        pinned: "headroom--pinned",
        // when scrolling down
        unpinned: "headroom--unpinned",
        // when above offset
        top: "headroom--top",
        // when below offset
        notTop: "headroom--not-top",
        // when at bottom of scroll area
        bottom: "headroom--bottom",
        // when not at bottom of scroll area
        notBottom: "headroom--not-bottom",
        // when frozen method has been called
        frozen: "headroom--frozen",
        // multiple classes are also supported with a space-separated list
        pinned: "headroom--pinned foo bar"
    },
    // element to listen to scroll events on, defaults to `window`
    scroller: window,
    // callback when pinned, `this` is headroom object
    onPin: function () { },
    // callback when unpinned, `this` is headroom object
    onUnpin: function () { },
    // callback when above offset, `this` is headroom object
    onTop: function () { },
    // callback when below offset, `this` is headroom object
    onNotTop: function () { },
    // callback when at bottom of page, `this` is headroom object
    onBottom: function () { },
    // callback when moving away from bottom of page, `this` is headroom object
    onNotBottom: function () { }
};
// pass options as the second argument to the constructor
// supplied options are merged with defaults
var headroom = new Headroom(myHeader, options);


headroom.init();

// Utilisez ensuite ces bibliothèques dans votre script
gsap.registerPlugin(ScrollTrigger);

// Fonction pour détecter le mode de couleur préféré du navigateur
function isDarkMode() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

const toggleFavicon = () => {
    const favicon = document.getElementById('favicon');
    favicon.href = isDarkMode() ? 'favicon-dark.ico' : 'favicon-light.ico';
};

// Appeler la fonction pour mettre à jour le favicon
toggleFavicon();


// Utiliser une IIFE (Immediately Invoked Function Expression) pour éviter les variables globales
(function () {

    const granimInstance = new Granim({
        element: '#canvas-basic',
        name: 'basic-gradient',
        direction: 'left-right',
        opacity: [1, 0],
        isPausedWhenNotInView: true,
        states: {
            "default-state": {
                gradients: [
                    ['#66E3F6', '#5252EE'],
                    ['#5252EE', '#66E3F6'],
                    ['#66E3F6', '#5252EE']
                ],
                transitionSpeed: 5500,
                loop: true
            }
        }
    });


    const typed = new Typed('#wordThatChange', {
        strings: ['entreprise', 'logement', 'usine', 'restaurant', 'boutique'],
        typeSpeed: 70,
        startDelay: 1300,
        backSpeed: 20,
        backDelay: 1500,
        loop: true,
        loopCount: Infinity,
    });

    // GSAP
    const initGSAP = () => {
        const isSmallScreen = window.innerWidth < 992;
        const dynamicBgServices = document.getElementById("dynamic-bg-services");
        const serviceSections = document.querySelectorAll(".service-item-section");

        serviceSections.forEach((section) => {
            const bgImage = section.getAttribute("data-bg-image");

            const serviceAnimation = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: "top 70%",
                    end: "bottom 60%",
                    scrub: false,
                },
            });

            serviceAnimation.from(section, { opacity: 0, y: 130 });

            if (!isSmallScreen) {
                const serviceAnimation2 = gsap.timeline({
                    scrollTrigger: {
                        trigger: section,
                        start: "top 40%",
                        end: "bottom 60%",
                        scrub: false,
                    },
                });

                // Déplacez le background vers le bas
                serviceAnimation2.fromTo(
                    dynamicBgServices,
                    { backgroundPositionY: "-100%" },
                    { backgroundPositionY: "90%", duration: 0.75 }
                );

                // ScrollTrigger pour changer le background
                ScrollTrigger.create({
                    trigger: section,
                    start: "top 40%",
                    end: "bottom 60%",
                    onEnter: () => {
                        dynamicBgServices.style.backgroundImage = `url(${bgImage})`;
                    },
                    onLeave: () => {
                        dynamicBgServices.style.backgroundImage = "";
                    },
                    onLeaveBack: () => {
                        dynamicBgServices.style.backgroundImage = "";
                    },
                });
            }

        });

        // Scroll down button
        const scrollDownButton = document.getElementById("scroll-down-btn");
        scrollDownButton.addEventListener("click", () => {
            const newScrollPosition = window.scrollY + window.innerHeight;
            window.scrollTo({
                top: newScrollPosition,
                behavior: "smooth",
            });
        });

        // Scroll top button
        const scrollTopButton = document.getElementById("scroll-top-btn");

        const handleScrollTopButton = () => {
            const pageHeight = document.documentElement.scrollHeight;
            const windowHeight = window.innerHeight;
            const scrollY = window.scrollY;

            //scroll to top
            scrollTopButton.addEventListener('click', () => {
                window.scrollTo({ top: 0, behaviour: 'smooth' });
            })

            if (scrollY + windowHeight >= pageHeight - 200) {
                scrollTopButton.style.display = "block";
                scrollDownButton.style.display = "none";
                myBody.classList.add('bg-move');
            } else if (scrollY > 200 && isSmallScreen) {
                scrollDownButton.style.display = "none";
                dynamicBgServices.style.display = "none";
            } else {
                scrollTopButton.style.display = "none";
                scrollDownButton.style.display = "block";
                myBody.classList.remove('bg-move');
            }
        };

        // Écouter l'événement de scroll de la fenêtre
        window.addEventListener("scroll", () => {
            handleScrollTopButton();

        });



        // Indicateur de progression des étapes
        const indicator = document.getElementById('steps-cursor');
        const steps = document.querySelectorAll('.step');
        const stepsSection = document.querySelector('#steps-section');


        ScrollTrigger.create({
            trigger: stepsSection,
            start: "top top",
            end: "bottom bottom",
            onEnter: () => {
                dynamicBgServices.style.display = 'none';
            }
        })

        steps.forEach((step, index) => {
            const animation = gsap.to(indicator, {
                top: `${index * 200}px`,
                paused: true,                
            });

            ScrollTrigger.create({
                trigger: step,
                start: "75% 75%",
                end: "50 center",
                animation: animation,
            });
        });

        const section = document.getElementById('services-section');
        ScrollTrigger.create({
            trigger: section,
            start: "top 75%",
            onEnter: () => {
                granimInstance.changeState('default-state');
            },
            onLeaveBack: () => {
                granimInstance.changeState('default-state');
            },
        });

        /* Indicator btn change on hover cta step section */
        const btnRdv = document.getElementById('btn-rdv');
        const btnIndication = document.getElementById('btn-indication');
        const texteOrigine = btnIndication.textContent;

        btnRdv.addEventListener('mouseover', () => {
            btnIndication.textContent = 'Go !';
        })
        btnRdv.addEventListener('mouseout', () => {
            btnIndication.textContent = texteOrigine;
        })

        // Counter stats

        initCountUp();
        function initCountUp() {
            const counters = document.querySelectorAll('.count-up'); // Sélectionnez tous les éléments où vous voulez afficher les compteurs
            counters.forEach(counter => {
                const startValue = 0; // Valeur de départ du compteur
                const endValue = parseInt(counter.textContent, 10); // Valeur de fin du compteur (récupérée depuis le contenu HTML)
                const options = {
                    startVal: startValue,
                    endVal: endValue,
                    duration: 2, // Durée de l'animation en secondes
                    separator: ',', // Séparateur pour les milliers (facultatif)
                };

                const countUp = new CountUp(counter, endValue, options);

                // Utilisez ScrollTrigger pour déclencher le compteur lorsque l'élément est visible
                ScrollTrigger.create({
                    trigger: counter,
                    start: "-50% 80%", // Démarrez l'animation lorsque l'élément atteint 80 % de la vue
                    onEnter: () => {
                        if (!countUp.error) {
                            countUp.start();
                        } else {
                            console.error(countUp.error);
                        }
                    },
                });
            });
        }
    };

    gsap.to("#trust-section", {
        opacity: 1,
        y: -55,
        duration: 1,
        scrollTrigger: {
            trigger: "#trust-section",
            start: "-70px center", // Démarrer l'animation lorsque le haut de la section atteint le centre de la fenêtre
            end: "bottom center", // Arrêter l'animation lorsque le bas de la section atteint le centre de la fenêtre
            scrub: false, // Pour une animation en douceur lors du défilement
        },
    });
    gsap.to(".cta-stats-wrapper", {
        opacity: 1,
        y: -20,
        duration: 1,
        delay: 0.35,
        scrollTrigger: {
            trigger: "#trust-section",
            start: "top center", // Démarrer l'animation lorsque le haut de la section atteint le centre de la fenêtre
            end: "bottom center", // Arrêter l'animation lorsque le bas de la section atteint le centre de la fenêtre
            scrub: false, // Pour une animation en douceur lors du défilement
        },
    });

    // Appeler la fonction d'initialisation GSAP
    initGSAP();
})();
