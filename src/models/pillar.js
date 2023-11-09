class Pillar {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.color = "#b8b8ff";
    }

    show() {
        rect(this.x, this.y, this.w, this.h);
        noStroke();
        fill(this.color);
    }
}