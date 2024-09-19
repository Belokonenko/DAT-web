 export default class Slider {
     constructor(nameParent) {
         this.nameParent = nameParent;
     }

     creatSlider() {
         const parent = document.querySelector(this.nameParent);
         parent.classList.add('sliderProd');

         try {
             parent.innerHTML += `
                 <div class="wrapper ">
                   <i id="left" class="fa-solid fa-angle-left"></i>
                   <ul class="carousel">
                     <li class="card">
                       <div class="img"><img src="images/img-1.jpg" alt="img" draggable="false"></div>
                       <h2>Blanche Pearson</h2>
                       <span>Sales Manager</span>
                     </li>
                     <li class="card">
                       <div class="img"><img src="images/img-2.jpg" alt="img" draggable="false"></div>
                       <h2>Joenas Brauers</h2>
                       <span>Web Developer</span>
                     </li>
                     <li class="card">
                       <div class="img"><img src="images/img-3.jpg" alt="img" draggable="false"></div>
                       <h2>Lariach French</h2>
                       <span>Online Teacher</span>
                     </li>
                     <li class="card">
                       <div class="img"><img src="images/img-4.jpg" alt="img" draggable="false"></div>
                       <h2>James Khosravi</h2>
                       <span>Freelancer</span>
                     </li>
                     <li class="card">
                       <div class="img"><img src="images/img-5.jpg" alt="img" draggable="false"></div>
                       <h2>Kristina Zasiadko</h2>
                       <span>Bank Manager</span>
                     </li>
                     <li class="card">
                       <div class="img"><img src="images/img-6.jpg" alt="img" draggable="false"></div>
                       <h2>Donald Horton</h2>
                       <span>App Designer</span>
                     </li>
                   </ul>
                   <i id="right" class="fa-solid fa-angle-right"></i>
                 </div>
             `;
         } catch (err) {
             console.log(err);
         }
     }

     initSlider() {
         const slidersProd = document.querySelectorAll('.sliderProd');
         slidersProd.forEach(slider => {
             const wrapper = slider.querySelector('.wrapper');
             const carousel = slider.querySelector('.carousel');
             const firstCardWidth = carousel.querySelector('.card').offsetWidth;
             const arrowBtns = slider.querySelectorAll('.wrapper i');
             const carouselChildrens = [...carousel.children];

             let isDragging = false,
                 isAutoPlay = true,
                 startX,
                 startScrollLeft,
                 timeoutId;

             // Get the number of cards that can fit in the carousel at once
             let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

             // Insert copies of the last few cards to beginning of carousel for infinite scrolling
             carouselChildrens
                 .slice(-cardPerView)
                 .reverse()
                 .forEach(card => {
                     carousel.insertAdjacentHTML('afterbegin', card.outerHTML);
                 });

             // Insert copies of the first few cards to end of carousel for infinite scrolling
             carouselChildrens.slice(0, cardPerView).forEach(card => {
                 carousel.insertAdjacentHTML('beforeend', card.outerHTML);
             });

             // Scroll the carousel at appropriate position to hide first few duplicate cards on Firefox
             carousel.classList.add('no-transition');
             carousel.scrollLeft = carousel.offsetWidth;
             carousel.classList.remove('no-transition');

             // Add event listeners for the arrow buttons to scroll the carousel left and right
             arrowBtns.forEach(btn => {
                 btn.addEventListener('click', () => {
                     carousel.scrollLeft += btn.id == 'left' ? -firstCardWidth : firstCardWidth;
                 });
             });

             const dragStart = e => {
                 isDragging = true;
                 carousel.classList.add('dragging');
                 // Records the initial cursor and scroll position of the carousel
                 startX = e.pageX;
                 startScrollLeft = carousel.scrollLeft;
             };

             const dragging = e => {
                 if (!isDragging) return; // if isDragging is false return from here
                 // Updates the scroll position of the carousel based on the cursor movement
                 carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
             };

             const dragStop = () => {
                 isDragging = false;
                 carousel.classList.remove('dragging');
             };

             const infiniteScroll = () => {
                 // If the carousel is at the beginning, scroll to the end
                 if (carousel.scrollLeft === 0) {
                     carousel.classList.add('no-transition');
                     carousel.scrollLeft = carousel.scrollWidth - 2 * carousel.offsetWidth;
                     carousel.classList.remove('no-transition');
                 }
                 // If the carousel is at the end, scroll to the beginning
                 else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
                     carousel.classList.add('no-transition');
                     carousel.scrollLeft = carousel.offsetWidth;
                     carousel.classList.remove('no-transition');
                 }

                 // Clear existing timeout & start autoplay if mouse is not hovering over carousel
                 clearTimeout(timeoutId);
                 if (!wrapper.matches(':hover')) autoPlay();
             };

             const autoPlay = () => {
                 if (window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
                 // Autoplay the carousel after every 2500 ms
                 timeoutId = setTimeout(() => (carousel.scrollLeft += firstCardWidth), 2500);
             };
             autoPlay();

             carousel.addEventListener('mousedown', dragStart);
             carousel.addEventListener('mousemove', dragging);
             document.addEventListener('mouseup', dragStop);
             carousel.addEventListener('scroll', infiniteScroll);
             wrapper.addEventListener('mouseenter', () => clearTimeout(timeoutId));
             wrapper.addEventListener('mouseleave', autoPlay);
         });
     }
 }
