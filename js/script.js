
window.addEventListener("DOMContentLoaded",init,false)
let line = 'media/visual_assets/line.svg' ;
let window_box = 'media/visual_assets/window.svg' ;
let cross = 'media/visual_assets/cross.svg' ;
let shine_path = 'media/visual_assets/shine.svg'
let buttons;
let lastHoveredButton ;
let background ;
/*CARROUSSEL */
let carouselContainer ;
let prevButton ;
let nextButton ;
let currentIndex = 0;
let moon ;
let close_menu ;
let menu_container ;
let menu_open = false ;


function init(){

    /* pour le menu */
    moon = document.getElementById('menu_icon') ;
    close_menu = document.getElementById('close_menu') ;
    menu_container = document.getElementById('menu_container') ;
    if(moon && close_menu && menu_container){
        moon.addEventListener('click', menu_click) ;
        close_menu.addEventListener('click', menu_click) ;
    }


    /* CARROUSSEL */
    carouselContainer = document.querySelector('.carousel-container');
    prevButton = document.querySelector('.carousel-button.prev');
    nextButton = document.querySelector('.carousel-button.next');
    if(nextButton){
        nextButton.addEventListener('click', () => {
            const totalItems = document.querySelectorAll('.carousel-item').length;
            currentIndex = (currentIndex + 1) % totalItems; // Loop back to the first item
            updateCarousel();z
        });
    }
    
    if(prevButton){
        prevButton.addEventListener('click', () => {
            const totalItems = document.querySelectorAll('.carousel-item').length;
            currentIndex = (currentIndex - 1 + totalItems) % totalItems; // Loop to the last item
            updateCarousel();
        });
    }

    background = document.getElementById('background'); 
    if(background){createStars() ;}

    buttons = document.getElementsByClassName('button') ;
    if(buttons.length>0){

        lastHoveredButton = buttons[0]
        lastHoveredButton.classList.add('hovered');
        Array.from(buttons).forEach(button=>{
            for (let i = 0; i < 4; i++) {
                let selection = document.createElement('img');
                selection.src = 'media/visual_assets/selection.svg' ;
                button.appendChild(selection) ;
            }
        })
        Array.from(buttons).forEach(button => {
            /* pour le hover */
            button.addEventListener('mouseenter', handleHover);
            button.addEventListener('mouseleave', () => {
                lastHoveredButton.classList.add('hovered');
            });
        });

    }
    

    let i = 1.75;
    let menu = document.getElementById('menu_accueil') ;
    if(menu!=null){
        let buttons = menu.children;
        Array.from(buttons).forEach(button=>{
            i+=0.3 ;
            button.style.animation = 'floatIn 0.2s ' + i + 's forwards ease-in-out'; // Correct concatenation
        })
    }


    let boxes = document.getElementsByClassName('boxes') ;
    Array.from(boxes).forEach(box=>{
        let line_img = document.createElement('img');
        line_img.src = line ;

        let window_box_img = document.createElement('img');
        window_box_img.src = window_box ;

        let cross_img = document.createElement('img');
        cross_img.src = cross ;

        box.appendChild(line_img) ;
        box.appendChild(window_box_img) ;
        box.appendChild(cross_img) ;
    })

    let shines = document.getElementsByClassName('shine') ;
    Array.from(shines).forEach(shine=>{
        let shine_img = document.createElement('img');
        shine_img.src = shine_path ;

        shine.appendChild(shine_img) ;
    })

    window.onload = function() {
        document.getElementById('loading-screen').style.display = 'none';
        document.querySelector('main').style.display = 'flex';
    };

  
}

/* POUR LE MENUUUU */

function menu_click(){
    if(menu_open){
        menu_open = false ;
        menu_container.style.display = 'none' ;
    }else{
        let contact_items = document.getElementsByClassName('contact') ;
        Array.from(contact_items).forEach(contact=>{
        contact.style.animation = 'none';
    })
        menu_container.style.display = 'flex' ;
        menu_open = true ;
    }
}

function me_contacter(){
    menu_container.style.display = 'flex' ;
    menu_open = true ;
    let contact_items = document.getElementsByClassName('contact') ;
    let i = 0 ;
    Array.from(contact_items).forEach(contact=>{
        contact.style.animation = 'none';
        contact.offsetHeight;
        contact.style.animation = 'showContact 0.5s ' +i+'s alternate 2 forwards ease-in-out' ;
        i++
    })
}



function handleHover() {
    Array.from(buttons).forEach(button => button.classList.remove('hovered'));
    this.classList.add('hovered');
    lastHoveredButton = this;
}

/* Pour les étoiles !! */

function createStars() {
    const numStars = 20; // Number of stars to create

    for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        const randomX = Math.random() * 100; 
        const randomDelay = Math.random() * 15; // Add some delay
        const randomSize = Math.random() * 5+ 15;

        // Position the star randomly
        star.style.left = `${randomX}vw`;
        star.style.width = `${randomSize}px`;
        star.style.height = `${randomSize}px`;

        // Apply animation delay for staggered start
        star.style.animation = `fallingStar 15s ease-in-out ${randomDelay}s infinite, spin 5s linear ${randomDelay}s infinite`;

        // Append the star to the background section
        background.appendChild(star);
    }
}


/* CARROUSSEL */

function updateCarousel() {
    const itemWidth = document.querySelector('.carousel-item').offsetWidth;
    carouselContainer.style.transform = `translateX(${-currentIndex * itemWidth}px)`;
}
