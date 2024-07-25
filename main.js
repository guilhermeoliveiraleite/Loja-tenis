window.addEventListener("load", event => {

    function productHeading() {
        ////////////////
        // variaveis
        ////////////////

        const product = {

            value: 500,
            images: [
              
                   { img: 'https://rafaelalucas.com/dailyui/12/assets/img01.png'
                },
                {
                    img: 'https://rafaelalucas.com/dailyui/12/assets/img02.png'
                },
                {
                    img: 'https://rafaelalucas.com/dailyui/12/assets/img03.png'
                },
                {
                    img: 'https://rafaelalucas.com/dailyui/12/assets/img04.png'
                },
                {
                    img: 'https://rafaelalucas.com/dailyui/12/assets/img05.png'
                },
                {
                    img: 'https://rafaelalucas.com/dailyui/12/assets/img06.png'
                }
            ]
        }

        const btnAdd = document.querySelector('.btn.add'),
            btnContainer = document.querySelector('.btnContainer'),
            wrapper = document.querySelector('.wrapper'),
            itemNumber = document.querySelector('.itemNumber'),
            shoppingQuantity = document.querySelector('.shoppingQuantity'),
            inputQuantity = document.querySelector('.inputQuantity'),
            plus = document.querySelector('.plus'),
            minus = document.querySelector('.minus'),
            arrowDrop = document.querySelector('.arrowDrop'),
            dropdown = document.querySelector('.dropdown'),
            nav = document.querySelector('nav'),
            error = document.querySelector('.error'),
            shoppingIcon = document.querySelector('.shoppingIcon'),
            shoppingMenu = document.querySelector('.shoppingMenu'),
            emptyCart = document.querySelector('.emptyCart');

        let = priceFinal = document.querySelector('.priceFinal'),
            priceOriginal = document.querySelector('.priceOriginal'),
            discount = null,
            sizeNumber = document.querySelector('.sizeNumber'),
            dropItem = document.querySelectorAll('.dropItem'),
            maxQuantity = 5,
            newMaxQuantity = maxQuantity;

        ////////////////
        // Eventos
        ////////////////

        btnAdd.addEventListener('click', addItem);
        plus.addEventListener("click", plusQuantity);
        minus.addEventListener("click", minusQuantity);
        arrowDrop.addEventListener("click", openDrop);
        shoppingIcon.addEventListener("click", openShoppingCart);

        emptyCart.addEventListener("click", cleanCart);

        dropItem.forEach(function (el) {
            el.addEventListener("click", getSize);
        })

        window.addEventListener("resize", resize);


        ////////////////
        // Funções
        //////////////// 

        // Nav fixa 

        window.onscroll = function () {
            if (window.pageYOffset >= 60) {
                nav.classList.add("fixed");
            } else {
                nav.classList.remove("fixed");
            }
        };

        // trocar botão

        function resize() {
            //Botão
            if (window.innerHeight > wrapper.offsetHeight) {
                btnContainer.classList.remove('fixedBtn');
            } else {
                btnContainer.classList.add('fixedBtn');
            }
            parallax();
        }

        // Parallax

        function parallax() {
            if (window.innerWidth > 800) {
                var scene = document.querySelectorAll('.scene');
                scene.forEach(pic => {
                    var parallax = new Parallax(pic);
                })
            }
        }

        // Calcular desconto

        function getDisccount() {
            priceOriginal.innerText = product.value + "R$";
            discount = product.value - (product.value * (30 / 100));
            priceFinal.innerText = "R$" + discount ;
        }

        // Calcular 2

        function getPrice() {

            priceFinal.innerText = discount * inputQuantity.value + "R$";
            priceOriginal.innerText = "R$" + product.value * inputQuantity.value;

            setTimeout(() => {
                priceFinal.classList.remove('anime');
            }, 400);
        }

        // add preço e qnt

        function plusQuantity() {
            if (inputQuantity.value < maxQuantity) {
                inputQuantity.value == inputQuantity.value++;
                priceFinal.classList.add('anime');
            }
            getPrice();
        }

        function minusQuantity() {
            if (inputQuantity.value > 1) {
                inputQuantity.value == inputQuantity.value--;
                priceFinal.classList.add('anime');
            }
            getPrice();
        }

        // Add items ao carrinho

        function addItem() {

            let cenas = parseInt(itemNumber.innerText) + parseInt(inputQuantity.value);

            if (cenas <= newMaxQuantity) {
                itemNumber.style.display = "flex";
                itemNumber.innerText = cenas;
                shoppingQuantity.innerText = "x" + cenas;
                itemNumber.classList.add("addItem");
                error.style.display = "none";
            } else {
                error.style.display = "flex";
            }

            setTimeout(() => {
                itemNumber.classList.remove("addItem");
            }, 700);
        }

        // drop

        function openDrop() {
            if (dropdown.classList.contains('open')) {
                dropdown.classList.remove('open');
            } else {
                dropdown.classList.add('open');
            }
        }

        // diminuir valor

        function getSize(e) {
            sizeNumber.innerText = e.currentTarget.innerText;
            openDrop();
        }

        // abrir card carrinho

        function openShoppingCart() {
            if (itemNumber.innerText != "0") {
                if (shoppingMenu.classList.contains('openShopping')) {
                    shoppingMenu.classList.remove('openShopping');
                } else {
                    shoppingMenu.classList.add('openShopping');
                }
            }
        }

        //limpar carrinho

        function cleanCart() {
            shoppingMenu.classList.remove('openShopping');
            itemNumber.style.display = "none";
            itemNumber.classList.remove('addItem');
            itemNumber.innerText = "0";
        }

       

        product.images.forEach(function (el) {

            let template = `
                <div class="swiper-slide">
                    <div class="scene" data-hover-only="false"> 
                        <img src="${el.img}" data-depth="0.5">
                        <img src="${el.img}" data-depth="1" class="shadow">
                    </div>
                </div>`;

            let template2 = `
                <div class="swiper-slide">
                    <img src="${el.img}">
                </div>`;

            document.querySelector('.galleryMain .swiper-wrapper').insertAdjacentHTML('beforeend', template);
            document.querySelector('.galleryThumbs .swiper-wrapper').insertAdjacentHTML('beforeend', template2);
        });


        // slider 

        var galleryThumbs = new Swiper('.galleryThumbs', {
            spaceBetween: 0,
            slidesPerView: 'auto',
            loop: false,
            allowTouchMove: false,
            allowSlidePrev: false,
            allowSlideNext: false,

        });

        var galleryMain = new Swiper('.galleryMain', {
            spaceBetween: 300,
            speed: 500,
            loop: true,
            loopedSlides: 5, //loop de slider
            effect: "coverflow",
            coverflowEffect: {
                rotate: 50,
                slideShadows: false,
                depth: 200,
                stretch: 50,

            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,

            },
            thumbs: {
                swiper: galleryThumbs,
            },
        });

        // chamar funções
        getDisccount();
        parallax();
        resize();
    }

    productHeading();
});