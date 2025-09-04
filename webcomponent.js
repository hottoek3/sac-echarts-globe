async loadECharts() {
  if (!window.echarts) {
    await new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/echarts@5/dist/echarts.min.js";
      script.onload = resolve;
      document.head.append(script);
    });
    await new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/echarts-gl/dist/echarts-gl.min.js";
      script.onload = resolve;
      document.head.append(script);
    });
  }
}
