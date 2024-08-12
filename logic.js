let params = new URLSearchParams(window.location.search);
let level = params.get('level');
scorelvl = level;
document.getElementById('song').loop = true;
document.getElementById('song').volume = 0.3;
const canvas = document.getElementById('gameCanvas');
const score_display = document.getElementById('scorebar');
const timer_display = document.getElementById('timerbar');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth - 300;
canvas.height = window.innerHeight;
let highScore = localStorage.getItem('highScore');

const words = ["cat", "dog", "bat", "rat", "hat", "sun", "fun", "run", "lake", "mountain",
                "valley", "forest", "desert", "beach", "wave", "tide", "current", "whale",
                "dolphin", "shark", "octopus", "crab", "lobster", "shrimp", "jellyfish",
                "coral", "reef", "fish", "seal", "penguin", "polar", "bear", "walrus",
                "iceberg", "glacier", "snow", "hail", "storm", "thunder", "lightning",
                "tornado", "hurricane", "earthquake", "volcano", "eruption", "lava",
                "ash", "rock", "mineral", "gem", "crystal", "diamond", "ruby", "sapphire",
                "emerald", "gold", "pit", "sit", "hit", "fit", "bit", "tap", "map",
                "cap", "nap", "lap", "pat", "bag", "rag", "tag", "log", "fog", "bog",
                "dot", "cot", "hot", "lake", "mountain", "valley", "forest", "desert",
                "beach", "wave", "tide", "current", "whale", "dolphin", "shark", "octopus",
                "crab", "lobster", "shrimp", "jellyfish", "coral", "reef", "fish", "seal",
                "penguin", "polar", "bear", "walrus", "iceberg", "glacier", "snow", "hail",
                "storm", "thunder", "lightning", "tornado", "hurricane", "earthquake",
                "volcano", "eruption", "lava", "ash", "rock", "mineral", "gem", "crystal",
                "diamond", "ruby", "sapphire", "emerald", "gold", "lot", "pot", "not",
                "pen", "ten", "men", "hen", "red", "led", "bed", "net", "wet", "jet",
                "pet", "bun", "gun", "sun", "tin", "win", "fin", 
                "bin", "fan", "man", "pan", "can", "tan"];
let asteroids = [];
let inputWord = "";
let score = 0;

const spawnlevel = 2000 / level;
const wordspeed = 1 * level;
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
    update()
    {
        if (this.nextpos !== null)
        {
            const direction = this.nextpos > this.x ? 1 : -1;
            this.x += direction * 10;
            if (direction === 1 && this.x >= this.nextpos || direction === -1 && this.x <= this.nextpos)
            {
                this.nextpos = null;
            }
        }
        const inputBar = document.getElementById('inputBox');
        inputBar.style.left = (this.x + 55) + 'px';
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
let k = 0;
let firstpos = Math.random() * (canvas.width) * 0.9;

function spawnAsteroid(k)
{
    if (k !== 0)
        xrandom.push(Math.random() * (canvas.width) * 0.9);
    else
        xrandom.push(firstpos);
    const word = words[Math.floor(Math.random() * words.length)];
    asteroids.push(new Asteroid(word, xrandom[xrandom.length - 1] , -80, wordspeed));
    console.log(xrandom);
}

let player = new Player(firstpos);
function updateGame()
{
    let i = 0;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    while (i < asteroids.length)
    {
        const asteroid = asteroids[i];
        asteroid.update();
        asteroid.draw();
        player.update();
        if (asteroid.word === inputWord.trim())
        {
            sound = document.getElementById('kill');
            sound.load();   
            sound.play();
            xrandom.splice(i, 1);
            player.update(xrandom[0]);
            player.moveto(xrandom[0]);
            asteroids.splice(i, 1);
            inputWord = "";
            wordInput.value = "";
            score += 10 * scorelvl;
            score_display.innerText = 'Score: ' + score;
            level += 0.02;
            i--;
        }
        if (asteroid.y > canvas.height - 210)
        {
            var sound = document.querySelector('#song');
            sound.src = 'sounds/die.mp3';
            sound.load();   
            sound.play();
            sound.loop = false;
            const img = document.getElementById('cat');
            img.style = 'width: 210px; margin-right: 90px;';
            img.src = 'imgs/kitnnhit.png';
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

function useless()
{
    spawnAsteroid(k);
    k++;
}

setInterval(useless, spawnlevel);
updateGame();