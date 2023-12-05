class LineChart {
  static get inputProperties() {
    return ['--points'];
  }

  paint(ctx, size, styleMap) {
    const points = JSON.parse(styleMap.get('--points').toString());

    ctx.lineWidth = 2;
    ctx.strokeStyle = 'blue';
    ctx.beginPath();
    ctx.moveTo(0, size.height);

    for (let i = 0; i < points.length - 1; i++) {
      const x1 = i / (points.length - 1) * size.width;
      const y1 = (1 - points[i]) * size.height;
      const x2 = (i + 1) / (points.length - 1) * size.width;
      const y2 = (1 - points[i + 1]) * size.height;
      const cx = (x1 + x2) / 2;
      const cy = (y1 + y2) / 2;

      ctx.quadraticCurveTo(x1, y1, cx, cy);
    }

    ctx.stroke();

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
}

registerPaint('line-chart', LineChart);