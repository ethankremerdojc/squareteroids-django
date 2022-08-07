import * as utils from "../../utils/utils.js";

class Enemy {
    constructor(size, bgColor) {
        this.obj = null;
        this.size = size;
        this.bgColor = bgColor;
        this.rotationTime = utils.randWholeNum(10) + 4;
    }

    getX() {
        return parseInt(this.obj.style.left);
    }

    getY() {
        return parseInt(this.obj.style.top); 
    }

    collidesWith(sprite) {
        return utils.elementsOverlap(sprite.obj, this.obj)
    }

    isOutOfBounds(pageDimensions) {
        var cases = [
            this.getY() > pageDimensions.height + this.size,
            this.getY() < 0 - this.size,
            this.getX() > pageDimensions.width + this.size,
            this.getX() < 0 - this.size
        ]

        var outOfBounds = false;

        for (var c of cases) {
            if (c) {
                outOfBounds = true;
                break
            }
        }

        return outOfBounds
    }

    setVelocities(velocityX, velocityY) {
        this.velocityX = velocityX;
        this.velocityY = velocityY;
    }

    getRandomPointOnEdgeOfScreen(pageDimensions) {
        var randomSide = utils.randWholeNum(4);
        var side = null;

        switch (randomSide) {
            case 0:
                side = "top";
                break;
            case 1:
                side = "bottom";
                break;
            case 2:
                side = "left";
                break;
            case 3:
                side = "right";
                break;
        }

        var top = null,
            left = null;

        if (["top", "bottom"].includes(side)) {
            left = utils.randWholeNum(pageDimensions.width);

            switch (side) {
                case "top":
                    top = 0 - this.size;
                    break;
                case "bottom":
                    top = pageDimensions.height + this.size;
                    break;
            }
        } else {
            top = utils.randWholeNum(pageDimensions.width);

            switch (side) {
                case "left":
                    left = 0 - this.size;    
                    break;
                case "right":
                    left = pageDimensions.width + this.size;
                    break;
            }
        }

        return {
            side: side,
            top: top,
            left: left
        }
    }

    getDocObject(startX, startY) {
        var height = this.size,
            width = this.size;

        var rect = document.createElement("span");
        rect.className = "enemy";
        rect.style.width = width;
        rect.style.height = height;

        rect.style.top = startY;
        rect.style.left = startX;

        rect.style.backgroundColor = this.bgColor;

        var b = utils.randBool();
        var rotationType;

        if (b) {
            rotationType = "rotateLeft"
        } else {
            rotationType = "rotateRight"
        }


        var animation = `${rotationType} ${this.rotationTime}s infinite linear`
        rect.style.animation = animation;
        return rect;
    }

    move() {
        var currentTop = parseInt(this.obj.style.top),
            currentLeft = parseInt(this.obj.style.left);

        var newTop = currentTop + this.velocityY,
            newLeft = currentLeft + this.velocityX;

        this.obj.style.top = newTop;
        this.obj.style.left = newLeft;
    }
}

export {Enemy};