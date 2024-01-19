class LineChart {
  static get inputProperties() {
    return ['--points'];
  }

  paint(ctx, size, styleMap) {
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'blue';
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    const points = JSON.parse(styleMap.get('--points').toString());
    const rateX = size.width / points.length
    const rateY = size.height / 1
    ctx.moveTo(0, (1 - points[0]) * rateY);
    for (let i = 1; i < points.length; i++) {
      const x = i * rateX
      const y = (1 - points[i]) * rateY;
      const x1 = (i - 1) * rateX
      const y1 = (1 - points[i - 1]) * rateY;
      const x2 = (x - x1) / 2
      ctx.bezierCurveTo(x1 + x2, y1, x1 + x2, y, x, y);
    }

    ctx.stroke();

    for (let i = 0; i < points.length; i++) {
      const x1 = i / (points.length) * size.width;
      const y1 = (1 - points[i]) * size.height;
      this.drawCircle(ctx, 3, x1, y1)
    }

    // Draw X axis
    ctx.strokeStyle = "black";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, size.height);
    ctx.lineTo(size.width, size.height);
    ctx.stroke();

    // Draw Y axis
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, size.height);
    ctx.stroke();
  }

  drawCircle(ctx, r, x, y) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI)
    ctx.stroke();
    ctx.fill()
  }
}

registerPaint('line-chart', LineChart);