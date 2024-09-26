
const itemsArray = [];
const cursor = document.querySelector('.cursor');


document.addEventListener('mousemove' , (e) =>{
    gsap.to(cursor , {
        x: e.clientX - cursor.offsetWidth / 2,
        y: e.clientY - cursor.offsetHeight / 2,
        duration : 0.5,
        ease : "power2.out"
    })
});


document.addEventListener('click' , function (event) {
    // const clickAudio = new Audio('./assets/img/audio.mp3')
    // clickAudio.play()

    const itemType = Math.random() > 0.5 ? "video" : "image"

    let container = document.createElement("div")
    let elementWidth  = 100;


    if(itemType === "video") {
        const videoNumber = Math.floor(Math.random() * 3) + 1;
        container.innerHTML = 
        `<div class="video-container">
            <video loop autoplay>
                <source src="./assets/img/${videoNumber}.mp4" type="video/mp4">
            </video>
        </div>`;
    } else {
        const imgNumber = Math.floor(Math.random() * 4) + 1;
        container.innerHTML = 
        `<div class="img-container">
            <img src="./assets/img/${imgNumber}.jpg" alt="img" class= "img-fluid">
        </div>`;
    }

    const appendElement = container.firstChild;
    document.querySelector(".items-container").appendChild(appendElement);

    appendElement.style.left = `${event.clientX - elementWidth / 2}px`;
    appendElement.style.top = `${event.clientY}px`;
    const randomRotation  = Math.random() * 10 - 5;

    gsap.set(appendElement , {
        scale : 0,
        rotation : randomRotation, 
        transformOrigin : "center"
    })

    const tl = gsap.timeline();

    const randomScale = Math.random() * 0.5 + 0.5;
    tl.to(appendElement , {
        scale : randomScale,
        duration : 0.5,
        delay : 0.1,   
    });
    tl.to(
        appendElement, {
        y : () => `-=500`,
        opacity : 1,
        duration : 4,
        ease : "none"
    }, '<'
    ).to(appendElement , {
        opacity : 0,
        duration : 1,
        onComplete: () => {
            appendElement.parentNode.removeChild(appendElement);
            const index = itemsArray.indexOf(appendElement);
            if( index > -1) {
                itemsArray.splice(index, 1)
            }
        },
    },'-=0.5');


})
