(function() {
    let myChart = null;
    let container = null;
    let isRendered = false;

    // Load E-charts and E-charts GL libraries
    function loadScripts(callback) {
        if (typeof echarts !== 'undefined' && typeof echartsgl !== 'undefined') {
            callback();
            return;
        }

        let script1 = document.createElement('script');
        script1.src = "./echarts.min.js";
        script1.onload = () => {
            let script2 = document.createElement('script');
            script2.src = "./echarts-gl.min.js";
            script2.onload = callback;
            document.head.appendChild(script2);
        };
        document.head.appendChild(script1);
    }

    // SAC 위젯 클래스 정의
    class EchartsGlobeMywidget extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({ mode: 'open' }); // 섀도우 DOM 사용
            container = document.createElement('div');
            container.style.width = '100%';
            container.style.height = '100%';
            this.shadowRoot.appendChild(container);
        }

        onCustomWidgetAfterUpdate(changedProperties) {
            if (!isRendered) {
                this.render();
                isRendered = true;
            }
        }

        render() {
            loadScripts(() => {
                if (!container || !echarts || !echartsgl) return;

                if (!myChart) {
                    myChart = echarts.init(container);
                }

                // E-charts 지구본 옵션
                const option = {
                    backgroundColor: '#000',
                    globe: {
                        baseTexture: 'https://raw.githubusercontent.com/hottoek3/sac-echarts-globe/main/starfield.jpg',
                        heightTexture: 'https://raw.githubusercontent.com/hottoek3/sac-echarts-globe/main/bathymetry_bw_composite_4k.jpg',
                        displacementTexture: 'none',
                        displacementScale: 0.05,
                        shading: 'realistic',
                        realisticMaterial: {
                            roughness: 0.9,
                            metalness: 0.1
                        },
                        postEffect: {
                            enable: true
                        },
                        light: {
                            main: {
                                intensity: 2
                            }
                        }
                    },
                    series: []
                };

                myChart.setOption(option);
            });
        }
    }

    // SAC에 위젯 등록
    customElements.define("echarts-globe-mywidget", EchartsGlobeMywidget);
})();
