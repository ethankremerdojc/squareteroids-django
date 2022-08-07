class Player {
    constructor() {
        this.obj = null;
        this.username = prompt("What is your username?");
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
    }
}

export {Player};