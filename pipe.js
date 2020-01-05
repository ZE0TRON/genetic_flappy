function Pipe() {
    this.top = random(height/10 * 8);
    this.offset = random(height / 5);
    this.offset = this.offset> 80 ? this.offset:80+this.offset;
    this.bottom = height - this.top - this.offset;
    this.x = width;
    this.w = 30;
    this.speed =3;
    this.show = function() {
        fill(255);
        rect(this.x,0,this.w,this.top);
        rect(this.x, height-this.bottom, this.w, this.bottom);
    }

    this.update = function() {
        this.x -= this.speed;
    }

    this.offscreen = function() {
        return this.x < -this.w;
    }

    this.hits = function(bird) {
        return (bird.y < this.top || bird.y > height-this.bottom) && ((bird.x - bird.radius  < this.x)&&(bird.x + bird.radius > this.x));
    }
}