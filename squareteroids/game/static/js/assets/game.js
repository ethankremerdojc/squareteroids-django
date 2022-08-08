class Game {
    constructor() {
        this.obj = null;
        this.sprites = [];
    }

    getDocObject() {
        var rect = document.createElement("section");
        rect.id = "game";
        return rect;
    }

    placeObject(obj) {
        this.obj.append(obj)
    }

    placeObjects() {
        for (var sprite of this.sprites) {
            this.placeObject(sprite.obj);
        }
    }
}

export {Game};