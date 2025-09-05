(function() {
    let myChart = null;
    let container = null;

    // GitHub의 Raw 링크를 사용하도록 수정합니다.
    function loadScripts(callback) {
        if (typeof echarts !== 'undefined' && typeof echartsgl !== 'undefined') {
            callback();
            return;
        }

        let script1 = document.createElement('script');
        // 'hottoek3/sac-echarts-globe/main' 부분을 사용자의 GitHub 정보에 맞춰 수정하세요.
        script1.src = "https://raw.githubusercontent.com/hottoek3/sac-echarts-globe/main/echarts.min.js"; 
        script1.onload = () => {
            let script2 = document.createElement('script');
            script2.src = "https://raw.githubusercontent.com/hottoek3/sac-echarts-globe/main/echarts-gl.min.js";
            script2.onload = callback;
            document.head.appendChild(script2);
        };
        document.head.appendChild(script1);
    }

    // SAC 위젯 클래스 정의
    class CustomEchartsGlobe extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({ mode: 'open' }); // 섀도우 DOM 사용
            container = document.createElement('div');
            container.style.width = '100%';
            container.style.height = '100%';
            this.shadowRoot.appendChild(container);

            loadScripts(() => {
                this.render();
            });
        }

        onCustomWidgetAfterUpdate(changedProperties) {
            if (this.readyToRender) {
                this.render();
            }
        }

        render() {
            if (!container || !echarts || !echartsgl) return;

            if (!myChart) {
                myChart = echarts.init(container);
            }

            const option = {
                backgroundColor: '#000',
                globe: {
                    baseTexture: 'https://raw.githubusercontent.com/hottoek3/sac-echarts-globe/main/world.topo.bathy.200401.jpg', // 이미지 링크도 GitHub Raw 링크로 변경
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
            this.readyToRender = true;
        }

        onCustomWidgetDestroy() {
            if (myChart) {
                myChart.dispose();
                myChart = null;
            }
        }
    }

    customElements.define('com-sap-sample-echarts-globe', CustomEchartsGlobe);
})();
