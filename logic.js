let params = new URLSearchParams(window.location.search);
console.log(params);
let level = params.get('level');
const salam = localStorage.setItem('currentlevel', level);
const canvas = document.getElementById('gameCanvas');
const score_display = document.getElementById('scorebar');
const timer_display = document.getElementById('timerbar');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth - 300;
canvas.height = window.innerHeight;
console.log(canvas.height)
let highScore = localStorage.getItem('highScore');

const words = ["cat", "dog", "bird", "fish", "tree", "house", "car", "bike", "road", "sky",
"cloud", "rain", "sun", "moon", "star", "space", "planet", "comet", "galaxy",
"universe", "ocean", "river", "lake", "mountain", "valley", "forest", "desert",
"beach", "wave", "tide", "current", "whale", "dolphin", "shark", "octopus",
"crab", "lobster", "shrimp", "jellyfish", "coral", "reef", "fish", "seal",
"penguin", "polar", "bear", "walrus", "iceberg", "glacier", "snow", "hail",
"storm", "thunder", "lightning", "tornado", "hurricane", "earthquake", "volcano",
"eruption", "lava", "ash", "rock", "mineral", "gem", "crystal", "diamond",
"ruby", "sapphire", "emerald", "gold", "silver", "bronze", "copper", "iron",
"steel", "aluminum", "titanium", "platinum", "zinc", "lead", "mercury", "helium",
"hydrogen", "oxygen", "nitrogen", "carbon", "silicon", "phosphorus", "sulfur",
"chlorine", "argon", "krypton", "neon", "xenon", "radon"];
let asteroids = [];
let inputWord = "";
let score = 0;

const spawnlevel = 2000 / level;
const wordspeed = 1 * level;
const asteroidFrequency = 2000 / level;
const wordInput = document.getElementById('input_word');

canvas.style = `width: ${canvas.width}px; height: ${canvas.height}px;`;
class Player
{
    constructor(x)
    {
        this.x = x;
        this.nextpos = null;
    }
    moveto(x)
    {
        this.nextpos = x;
    }
    draw()
    {
        ctx.beginPath();
        ctx.arc(this.x, canvas.height - 100, 40, 0, Math.PI * 2, false);
        ctx.fillStyle = 'yellow';
        ctx.fill();
    }
    update()
    {
        if (this.nextpos !== null)
        {
            const direction = this.nextpos > this.x ? 1 : -1;
            this.x += direction * 50;
            if (direction === 1 && this.x >= this.nextpos || direction === -1 && this.x <= this.nextpos)
            {
                this.nextpos = null;
            }
        }
    }
}
class Asteroid
{
    constructor(word, x, y, speed)
    {
        this.word = word;
        this.x = x;
        this.y = y;
        this.speed = speed;
    }
    draw()
    {
        ctx.font = '40px VT323';
        ctx.fillStyle = '#fff';
        ctx.fillText(this.word, this.x, this.y);
    }
    update()
    {
        this.y += this.speed;
    }
}

var xrandom = [];

function spawnAsteroid()
{
    xrandom.push(Math.random() * (canvas.width) * 0.9);
    const word = words[Math.floor(Math.random() * words.length)];
    asteroids.push(new Asteroid(word, xrandom[xrandom.length - 1] , -80, wordspeed));
    console.log(xrandom);
}

let player = new Player(200);
function updateGame()
{
    let i = 0;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.update(xrandom[0]);
    player.draw();
    while (i < asteroids.length)
    {
        const asteroid = asteroids[i];
        asteroid.update();
        asteroid.draw();
        if (asteroid.word === inputWord.trim())
        {
            xrandom.splice(i, 1);
            player.update(xrandom[0]);
            player.draw();
            player.moveto(xrandom[0]);
            asteroids.splice(i, 1);
            inputWord = "";
            wordInput.value = "";
            score += 10 * level;
            score_display.innerText = 'Score: ' + score;
            i--;
        }
        if (asteroid.y > canvas.height - 140)
        {
            if (score > localStorage.getItem('highScore'))
                localStorage.setItem('highScore', score);
            if (highScore === null)
                highScore = 0;
            document.getElementById('highScoreDisplay').innerText = 'High Score: ' + highScore;
            document.getElementById('scoreDisplay').innerText = 'Your Score: ' + score;
            document.getElementById('loseScreen').style.display = 'block';
            return ;
        }
        i++;
    }
    requestAnimationFrame(updateGame);
}

function restartGame()
{
    let level = localStorage.getItem('currentlevel');
    console.log(level);
    window.location = 'game.html?level=' + level;
}
wordInput.addEventListener('input', updateInputWord);

function updateInputWord(event)
{
    inputWord = event.target.value;
}

setInterval(spawnAsteroid, spawnlevel);
updateGame();