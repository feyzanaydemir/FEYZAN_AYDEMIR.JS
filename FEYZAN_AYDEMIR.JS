(() => {
    const init = async () => {
        // only fetch if our products aren't in localStorage
        if (!localStorage.getItem('mightLikeProducts')) {
            async function getProducts() {
                const response = await fetch('https://gist.githubusercontent.com/sevindi/5765c5812bbc8238a38b3cf52f233651/raw/56261d81af8561bf0a7cf692fe572f9e1e91f372/products.json');
                const mightLikeProducts = await response.json();
                localStorage.setItem('mightLikeProducts', JSON.stringify(mightLikeProducts));
            } 

            await getProducts();
        }

        buildHTML();
        buildCSS();
        setEvents();

        // toggle favorite and update localStorage
        function toggleFavorite(element) {
            const mightLikeProducts = JSON.parse(localStorage.getItem('mightLikeProducts'))
            const i = parseInt(element.id.split('might-like-product-')[1], 10) - 1;
            if ('favorite' in mightLikeProducts[i]) {
                mightLikeProducts[i].favorite = !mightLikeProducts[i].favorite;
            } else {
                mightLikeProducts[i].favorite = true;
            }

            localStorage.setItem('mightLikeProducts', JSON.stringify(mightLikeProducts));

            const svgPath = element.querySelector('svg path');
            if (mightLikeProducts[i].favorite) {
                svgPath.setAttribute('fill', '#193db0');
                svgPath.setAttribute('stroke', '#193db0');
            } else {
                svgPath.setAttribute('fill', 'none');
                svgPath.setAttribute('stroke', '#555');
            }
        }

        const mightLikeProducts = JSON.parse(localStorage.getItem('mightLikeProducts')) || [];
        const mightLikeSliderTray = document.getElementsByClassName('might-like-slider-tray')[0];
        mightLikeProducts.forEach(product => {
            const productSlide = document.createElement('div');
            productSlide.classList.add('might-like-product-slide');
            productSlide.innerHTML = `
                <div class="might-like-product-inner-slide">
                    <div class="might-like-product-card">
                        <div class="might-like-product-image-wrapper">
                            <a href=${product.url} target="_blank">
                                <img src=${product.img}>
                            </a>
                            <div>
                            <div class="might-like-product-button" id="might-like-product-${product.id}">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20.576" height="19.483" viewBox="0 0 20.576 19.483"><path fill=${product.favorite ? "#193db0" : "none"} stroke=${product.favorite ? "#193db0" : "#555"} stroke-width="1.5px" d="M19.032 7.111c-.278-3.063-2.446-5.285-5.159-5.285a5.128 5.128 0 0 0-4.394 2.532 4.942 4.942 0 0 0-4.288-2.532C2.478 1.826.31 4.048.032 7.111a5.449 5.449 0 0 0 .162 2.008 8.614 8.614 0 0 0 2.639 4.4l6.642 6.031 6.755-6.027a8.615 8.615 0 0 0 2.639-4.4 5.461 5.461 0 0 0 .163-2.012z" transform="translate(.756 -1.076)"></path></svg>
                            </div>
                        </div>
                        <div class="might-like-product-info">
                            <div class="might-like-product-title">
                                <a href=${product.url} target="_blank">
                                    <p class="might-like-product-name">${product.name}</p>
                                </a>
                            </div>
                            <div class="might-like-product-price">
                                <div class="might-like-product-current-price">
                                    ${product.price} TL
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            mightLikeSliderTray.appendChild(productSlide);
        });

        // add event listeners to all heart icons
        mightLikeSliderTray.addEventListener('click', function(event) {
            if (event.target.closest('.might-like-product-button')) {
                toggleFavorite(event.target.closest('.might-like-product-button'));
            }
        });
    };

    const buildHTML = () => {
        const html = `
            <div id="might-like">
                <div class="might-like-carousel">
                    <div class="might-like-carousel-container">
                        <p class="might-like-products-title">You Might Also Like</p>
                        <div class="might-like-carousel-padded">
                            <button type="button" aria-label="previous" class="might-like-carousel-button-left" disabled>
                                <svg xmlns="http://www.w3.org/2000/svg" width="14.242" height="24.242" viewBox="0 0 14.242 24.242"><path fill="none" stroke="#333" stroke-linecap="round" stroke-width="3px" d="M2106.842 2395.467l-10 10 10 10" transform="translate(-2094.721 -2393.346)"></path></svg>
                            </button>
                            <div class="might-like-slider">
                                <div>
                                    <div class="might-like-slider-tray"></div>
                                </div>
                            </div>
                            <button type="button" aria-label="next" class="might-like-carousel-button-right" disabled>
                                <svg xmlns="http://www.w3.org/2000/svg" width="14.242" height="24.242" viewBox="0 0 14.242 24.242"><path fill="none" stroke="#333" stroke-linecap="round" stroke-width="3px" d="M2106.842 2395.467l-10 10 10 10" transform="translate(-2094.721 -2393.346)"></path></svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        $('.product-detail').after(html);
    };

    const buildCSS = () => {
        const css = `
            #might-like {
                background-color: #faf9f7;
                position: relative;
            }

            .might-like-carousel {
                display: flex;
                justify-content: center;
                margin-left: 15px;
            }

            .might-like-products-title {
                font-size: 24px;
                color: #29323b;
                line-height: 33px;
                font-weight: lighter;
                padding: 15px 0;
                margin: 0;
            }

            .might-like-carousel-padded {
                position: relative;
                padding-bottom: 24px;
            }
            
            .might-like-carousel button {
                position: absolute;
                top: 50%;
                background: none;
                border: none;
            }

            .might-like-carousel-button-left {
                left: -35px;
            }

            .might-like-carousel-button-right {
                right: -35px;
                transform: rotate(180deg);
            }

            .might-like-slider {
                position: relative;
                overflow: hidden;
            }

            .might-like-slider-tray {
                display: flex;
                align-items: stretch;
                width: 386.323%;
                flex-direction: row;

                list-style: none;
                padding: 0;
                margin: 0;
            }

            .might-like-product-slide {
                width: 6.66667%;
                padding-bottom: unset;
                height: unset;
                float: left;
                position: relative;
                display: block;
                box-sizing: border-box;
                margin: 0;
                list-style-type: none;
            }

            .might-like-product-inner-slide {
                position: unset;
                width: calc(100% - 10px);
                height: calc(100% - 10px);
            }

            .might-like-product-card {
                color: #555;
                position: relative;
                background-color: #fff;
            }

            .might-like-product-image-wrapper {
                position: relative;
            }

            .might-like-product-image-wrapper a {
                color: #428bca;
                text-decoration: none;
            }

            .might-like-product-image-wrapper img {
                width: 100%;
                height: 100%;
                vertical-align: middle;
                border: 0;
            }

            .might-like-product-button {
                cursor: pointer;
                position: absolute;
                top: 9px;
                right: 15px;
                width: 34px;
                height: 34px;
                background-color: #fff;
                border-radius: 5px;
                box-shadow: 0 3px 6px 0 rgba(0, 0, 0, .16);
                border: solid .5px #b6b7b9;
                display: flex;
                justify-content: center;
                align-items: center;
            }

            .might-like-product-info {
                display: flex;
                flex-direction: column;
                padding: 0 10px;
            }

            .might-like-product-title {
                font-size: 14px;
                height: 40px;
                margin-top: 5px;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
            }

            .might-like-product-title a {
                color: #302e2b !important;
                text-decoration: none !important;
                outline: none !important;
            }

            .might-like-product-price {
                display: flex;
                align-items: flex-start;
                height: 50px;
                flex-direction: column;
            }

            .might-like-product-current-price {
                color: #193db0;
                font-size: 18px;
                display: inline-block;
                line-height: 22px;
                font-weight: bold;
            }

            @media (min-width: 992px) {
                .might-like-carousel {
                    display: flex;
                    justify-content: center;
                }

                .might-like-carousel-container {
                    display: block;
                    width: 80%;
                }

                .might-like-products-title {
                    font-size: 32px;
                    line-height: 43px;
                }

                .might-like-product-card {
                    height: 38rem;
                    width: 21rem;
                }
            }

            @supports (-webkit-line-clamp: 2) {
                .might-like-product-title {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: initial;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                }
            }
        `;

        $('<style>').addClass('might-like-carousel-style').html(css).appendTo('head');
    };

    const setEvents = () => {
        $('').on('click', () => {
            console.log('clicked');
        });
    };

    init();
})();
