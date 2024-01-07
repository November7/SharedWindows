class CPoint {
    constructor(x,y,z,color,size=1,id=0) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.id = id;
        this.color = color;
        this.size = size;
    }

    draw($) {
        $.save();
        $.beginPath();
        let alpha = 0;
        alpha = 1/(Math.exp(-.01*this.z));
        $.fillStyle = `rgba(${this.color},${alpha})`;
        $.arc(this.x, this.y, this.size, 0, 2 * Math.PI, true);
        $.fill();
        $.restore();
    }

    rotateX(fi, S = {x:0,y:0,z:0}) {
        let y = this.y - S.y;
        let z = this.z - S.z;
        let sin = Math.sin(fi);
        let cos = Math.cos(fi);
        this.y = y*cos - z*sin + S.y;
        this.z = y*sin + z*cos + S.z;
    }

    rotateY(fi, S = {x:0,y:0,z:0}) {
        let x = this.x - S.x;
        let z = this.z - S.z;
        let sin = Math.sin(fi);
        let cos = Math.cos(fi);
        this.x = x*cos - z*sin + S.x;
        this.z = x*sin + z*cos + S.z;
    }

    rotateZ(fi, S = {x:0,y:0,z:0}) {
        let x = this.x - S.x;
        let y = this.y - S.y;
        let sin = Math.sin(fi);
        let cos = Math.cos(fi);
        this.x = x*cos - y*sin + S.x;
        this.y = x*sin + y*cos + S.y;
    }
};

class CSphere {

    constructor(sx,sy,sz,radius,color,id=0) {
        this.points = [];
        this.numberOfPoints = 0;
        this.sx = sx;
        this.sy = sy;
        this.sz = sz;
        this.radius = radius;
        this.id = id;
        let TwoPi = 2*Math.PI;
        let step = Math.PI / 10;
        for(let z = -this.radius;z<=this.radius;z+=this.radius/10)
        for(let fi = 0 ; fi <TwoPi;fi+=step,this.numberOfPoints++) {
            let p = new CPoint(0,0,0,color,1);
            p.x = Math.cos(.5*Math.PI*z/this.radius)*this.radius * Math.cos(fi) + sx;
            p.y = Math.cos(.5*Math.PI*z/this.radius)*this.radius * Math.sin(fi) + sy;
            p.z += sz+this.radius*Math.sin(.5*Math.PI*z/this.radius);
            this.points[this.numberOfPoints] = p;
        }
    }

    rotate(a,b,c) {
        for (let i = 0; i < this.numberOfPoints; i++) {
           this.points[i].rotateX(a,{x:this.sx,y:this.sy,z:this.sz});
           this.points[i].rotateY(b,{x:this.sx,y:this.sy,z:this.sz});
           this.points[i].rotateZ(c,{x:this.sx,y:this.sy,z:this.sz});
        }
    }

    draw($) {
        for (let i = 0; i < this.numberOfPoints; i++) {
            this.points[i].draw($);
        }
    }

};