import React, { Component } from 'react';

class Canvas extends Component {
    grid = 25;

    drawRect(len, x, y) {
        x =  x - len/2;
        y = y - len/2;
        this.ctx.beginPath();
        this.ctx.fillStyle = '#ffffff';
        if (x !== -300 && y !== -300) this.ctx.fillRect(x, y, len, len);
        this.ctx.closePath();
    }

    squareFractal(len, x, y, level) {
        if (len > this.level) {
            this.squareFractal(len/2, x-len/2, y-len/2);
            this.squareFractal(len/2, x+len/2, y-len/2);
            this.squareFractal(len/2, x+len/2, y+len/2);
            this.squareFractal(len/2, x-len/2, y+len/2);
        }
            
        this.drawRect(len, x, y)
    }
    
    
    draw() {
        this.ctx.save()
        this.ctx.translate(this.centerX - 300, this.centerY - 300)
        this.ctx.fillStyle = "#90a4ae";
        this.ctx.fillRect(0, 0, this.width - 200, this.height - 200);
        this.squareFractal(600, 0, 0);
        this.ctx.restore()
    }

    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height)
    }
}

export default Canvas;