export default function creatCard() {

    class CreatCard {
        constructor(data, section) {
            this.src = data.src;
            this.alt = data.alt;
            this.state = data.state;
            this.price = data.price;
            this.unit = data.unit;
            this.parentBlock = data.parentBlock;
            this.section = section;
        }

        async render() {
            const section = document.querySelector(this.section)
            const element = document.createElement('li');
            const parent = section.querySelector(this.parentBlock );

            if (!parent) {
                console.error(`element  ${this.parentBlock} not find.`);
                return;
            }

            element.classList.add('slider__item');

            element.innerHTML = `
                <article class="card" draggable="false">
                    <hr />
                    <a href="product-page.html">
                        <div class="card__img-wrap">
                            <picture>
                                <source
                                    type="image/webp"
                                    srcset="
                                        ${this.src}.webp    1x,
                                        ${this.src}@2x.webp 2x,
                                        ${this.src}@3x.webp 3x,
                                        ${this.src}@4x.webp 4x
                                    "
                                />
                                <img
                                    class="@@class-name"
                                    width="@@width"
                                    height="@@height"
                                    src="${this.src}.png"
                                    srcset="
                                        ${this.src}@2x.png 2x,
                                        ${this.src}@3x.png 3x,
                                        ${this.src}@4x.png 4x
                                    "
                                    alt=${this.alt};
                                />
                            </picture>
                        </div>

                        <div class="card__block-text">
                            <h3 class="card__prod-name">@@name</h3>
                            <p class="card__prod-state">${this.state}</p>
                            <div class="">
                                <p class="card__prod-parce">${this.price} $</p>
                                <p class="card__prod-quantity">${this.unit} unit</p>
                            </div>
                        </div>
                    </a>
                    <button class="card__btn-compare button button-round button_round button_theme_dark">
                        <svg class="button-round__img" width="16" height="16">
                            <use xlink:href="#comparison"></use>
                        </svg>
                    </button>

                    <button class="button button-round button_round button_theme_dark card__btn" type="button">
                        <svg class="button-round__img phone" width="16" height="16">
                            <use xlink:href="#basket"></use>
                        </svg>
                    </button>
                </article>
            `;

            parent.append(element);
        }
    }

}
