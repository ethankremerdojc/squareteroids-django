class Player {
    constructor() {
        this.obj = null;
    }

    getShadow() {
        var top = parseInt(this.obj.style.top);
        var left = parseInt(this.obj.style.left);

        var shadow = new PlayerShaddow(top, left, 80);
        return shadow;
    }

    getDocObject(pageDimensions) {
        var height = 30,
            width = 30;

        var rect = document.createElement("span");
        rect.className = "player";
        rect.style.width = width;
        rect.style.height = height;

        rect.style.top = pageDimensions.height / 2;
        rect.style.left = pageDimensions.width / 2;

        return rect;
    }

    followMouse() {
        addEventListener('mousemove', (event) => {
            this.obj.style.top = event.clientY;
            this.obj.style.left = event.clientX;
        });

        document.addEventListener('touchmove', (event) => {
            this.obj.style.top = event.clientY;
            this.obj.style.left = event.clientX;
        });
    }
}

class PlayerShaddow {
    constructor(top, left, timeAlive) {
        this.top = top;
        this.left = left;
        this.height = 30;
        this.width = 30;
        this.timeAlive = timeAlive;
        
        this.obj = this.getDocObject();

        setTimeout(() => {
            this.obj.remove();
        }, this.timeAlive);
    }

    getDocObject() {
        var rect = document.createElement("span");
        rect.className = "player";
        rect.style.width = this.width;
        rect.style.height = this.height;
        rect.style.top = this.top;
        rect.style.left = this.left;
        rect.style.animation = `fadeAway ${this.timeAlive}ms linear`
        
        return rect;
    }
}

export {Player};