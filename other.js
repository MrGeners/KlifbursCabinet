
const audio = document.getElementById("audio");
const playButton = document.getElementById("playButton");

playButton.addEventListener("click", function () {
    if (audio.paused) {
        audio.play();
    }
    else {
        audio.pause();
    }
});


const canvas = document.createElement("canvas");
canvas.id = "lighting-canvas";
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.position = "absolute";
canvas.style.top = "0";
canvas.style.left = "0";
canvas.style.width = "3839px";
canvas.style.pointerEvents = "none";
document.body.appendChild(canvas);

const ctx = canvas.getContext("2d");


class Light {
    constructor({ x, y, radius, intensity }) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.intensity = intensity;
        this.blur = 15; // Set the blur radius
    }

    draw(lightSources) {
        for (const light of lightSources) {
            const distance = Math.sqrt(Math.pow(this.x - light.x, 2) + Math.pow(this.y - light.y, 2));
            if (distance < light.radius) {
                const brightness = (1 - distance / light.radius) * light.intensity;
                const radius = light.radius - distance;
                ctx.globalCompositeOperation = "destination-out";
                ctx.shadowColor = "rgba(0, 0, 0, 1)";
                ctx.shadowBlur = this.blur;
                ctx.beginPath();
                ctx.arc(this.x, this.y, radius, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fill();
                ctx.globalCompositeOperation = "source-over";
                ctx.shadowBlur = 0;
            }
        }
    }
}

const noise = window.noise;

function makeFireflies(number_of_fireflies) {
    let fireflies = [];
    for (let i = 0; i < number_of_fireflies; i++) {
        const firefly = document.createElement("div");
        firefly.classList.add("firefly");
        firefly.style.left = Math.floor(Math.random() * (window.innerWidth - firefly.offsetWidth)) + "px";
        firefly.style.top = Math.floor(Math.random() * (window.innerHeight - firefly.offsetHeight)) + "px";
        document.body.appendChild(firefly);
        fireflies.push(firefly);
    }
    return fireflies;
}

let time = 0;
function moveFireflies(fireflies) {
    let lightSources = [];
    for (const firefly of fireflies) {
        // Get current position
        let x = parseFloat(firefly.style.left, 10);
        let y = parseFloat(firefly.style.top, 10);

        // Generate new position using Perlin noise
        let noiseX = noise.perlin2(time + x, time + y);
        let noiseY = noise.perlin2(time + y, time + x);
        let newX = x + 30 * noiseX;
        let newY = y + 30 * noiseY;

        // Make sure new position is within the bounds of the page
        newX = Math.max(Math.min(newX, window.innerWidth - firefly.offsetWidth), 0);
        newY = Math.max(Math.min(newY, window.innerHeight - firefly.offsetHeight), 0);

        // Transition to new position with easing
        let transitionTime = time == 0 ? "0s" : "0.5s";

        x = Math.min(x, window.innerWidth);

        firefly.style.transition = `transform ${transitionTime} ease-out`;
        firefly.style.transform = `translate(${newX}px, ${newY}px)`;

        // Update light source position
        const light = new Light({ x: newX + firefly.offsetWidth / 2, y: newY + firefly.offsetHeight / 2, radius: 60, intensity: 0.3 });
        lightSources.push(light);
    }

    // Clear canvas
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw lights
    for (const light of lightSources) {
        light.draw(lightSources);
    }


    // Update time and schedule next movement
    time += 0.01;
    requestAnimationFrame(() => moveFireflies(fireflies));
}

// Start moving the fireflies
let fireflies = makeFireflies(20);
moveFireflies(fireflies);

