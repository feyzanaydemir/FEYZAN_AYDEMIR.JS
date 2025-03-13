(() => {
    const init = () => {
        if (!localStorage.getItem('might-like-products')) {
            async function getProducts() {
                const response = await fetch('https://gist.githubusercontent.com/sevindi/5765c5812bbc8238a38b3cf52f233651/raw/56261d81af8561bf0a7cf692fe572f9e1e91f372/products.json');
                const mightLikeProducts = await response.json();
                localStorage.setItem('might-like-products', JSON.stringify(mightLikeProducts));
            } 

            getProducts();
        }

        buildHTML();
        buildCSS();
        setEvents();
    };

    const buildHTML = () => {
        const html = `
            <div id="might-like">
                <div class="might-like-carousel">
                    <div class="might-like-carousel-container">
                        <p class="might-like-products-title">You Might Also Like</p>
                        <div class="might-like-carousel-padded">
                            <button type="button" aria-label="previous" class="might-like-carousel-button" disabled></button>
                            <div class="might-like-slider">
                                <div>
                                    <div class="might-like-slider-tray">
                                        <div style="width: 10px; height:30px; background:red;">
                                        </div>

                                        <div style="width: 10px; height:30px; background:blue;">
                                        </div>

                                        <div style="width: 10px; height:30px; background:green;">
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <button type="button" aria-label="next" class="might-like-carousel-button" disabled></button>
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
            
            .might-like-carousel-button {
                position: absolute;
                top: 50%;
                background: none;
                border: none;
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


/* 
EXAMPLE CODE

(() => {
    const init = () => {
        buildHTML();
        buildCSS();
        setEvents();
    };

    const buildHTML = () => {
        const html = `
            <div class="container">
                <h1></h1>
            </div>
        `;

        $('.product-detail').append(html);
    };

    const buildCSS = () => {
        const css = `
            .container {
                background-color: red;
                height: 100px;
                width: 100px;
            }
        `;

        $('<style>').addClass('carousel-style').html(css).appendTo('head');
    };

    const setEvents = () => {
        $('').on('click', () => {
            console.log('clicked');
        });
    };

    init();
})(); 
*/
