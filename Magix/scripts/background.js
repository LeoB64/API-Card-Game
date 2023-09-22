let canvas = null;
let ctx = null;

let spriteList = [];
let backgroundList = [];
let dimension = [document.documentElement.clientWidth, document.documentElement.clientHeight];

window.addEventListener("load", () => {
	canvas = document.querySelector("canvas");
	canvas.width = dimension[0];
	canvas.height = dimension[1];
	 
	ctx = canvas.getContext("2d");

	backgroundList.push("img/global/background3.jpg");
	backgroundList.push("img/global/background2.jpg");
	backgroundList.push("img/global/background4.jpg");
	backgroundList.push("img/global/background1.jpg");


	spriteList.push(new BackgroundDefault("img/global/background-parchment.jpg"));
	spriteList.push(new FadingBackground(backgroundList[0]));

	tick();
})

let y = 0;
const tick = () => {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.canvas.width  = window.innerWidth;
	ctx.canvas.height = window.innerHeight;
	for (let i = 0; i < spriteList.length; i++) {
		let alive = spriteList[i].tick();
		if (!alive) {
			spriteList.splice(i, 1);
			y++
			if(y >= backgroundList.length){
				y = 0;
			}
			spriteList.push(new FadingBackground(backgroundList[y]));
		}
    }

    window.requestAnimationFrame(tick);
}

class BackgroundDefault {

    constructor(img) {	
        this.img = new Image();
        this.img.src = img;
    }

    tick() {
		if (this.img.complete) {
            ctx.drawImage(this.img, 0, 0, this.img.width,    this.img.height,     // source rectangle
				0, 0, canvas.width, canvas.height);
        }

        return true;
    }
}

class FadingBackground {
    constructor(img) {
		this.img = new Image();
		this.img.src = img;
		this.fading = 0;
		this.fadingTimer = 2;
		this.speed = 0.01;
		this.hasReachedMax = false;
    }

    tick() {
		let alive = true;	
		if(this.fading >= this.fadingTimer && !this.hasReachedMax ){
			this.speed = -this.speed;
			this.hasReachedMax = true;
		}	
		this.fading += this.speed;

		if(this.fading > .4){
			ctx.globalAlpha = .4;
		}else{
			ctx.globalAlpha = this.fading;
		}

		if (this.img.complete) {
			ctx.drawImage(this.img, 0, 0, this.img.width,    this.img.height,     // source rectangle
				0, 0, canvas.width, canvas.height);
		}
		ctx.globalAlpha = 1;

		if (this.fading < 0.01) {
			alive = false;
		}	

		return alive;
    }
}

