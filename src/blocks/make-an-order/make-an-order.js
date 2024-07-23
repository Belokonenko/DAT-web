export default function makeAnOrde() {
    // --- back to hisotory
    const btnBackHistory = document.querySelector('.make-an-order__back-history-btn');

    if (btnBackHistory) {
        btnBackHistory.addEventListener('click', () => {
            window.history.back();
        });
    }
    // ---

    // 1 . input region
    // 	1. выподающий список
    // 	2. поиск по написаному
    // 	3. авто установка если город выбран
    // 	4. заглавная буква если нет
    // 	5. проверка есть такой region
    // 2 . input city
    // 	1. выподающий список (из отобраных если region выбран)
    // 	2. поиск по списку
    // 	4. заглавная буква если нет
    // 	5. проверка есть такой city
    // 3 . input deportament
    // 	1. выподающий список (из отобраных если city выбран)
    // 	2. поиск по списку
    // 	5. проверка есть такой deportament
    // 4 . input index

    // input region
    //

    const blockDelivery = document.querySelector('.make-an-order__delivery');

    if (blockDelivery) {
        blockDelivery.addEventListener('input', e => {
            const target = e.target;

            if (target && target.classList.contains('region')) {
            }
        });
    }

    const ukraineRegions = new Map([
        ['Kyiv', ['Kyiv', 'Bila Tserkva', 'Brovary']],
        ['Kharkiv', ['Kharkiv', 'Chuhuiv', 'Izium']],
        ['Odesa', ['Odesa', 'Illichivsk', 'Yuzhne']],
        ['Lviv', ['Lviv', 'Drohobych', 'Chervonohrad']],
        ['Dnipropetrovsk', ['Dnipro', 'Kryvyi Rih', 'Nikopol']],
    ]);

    // get array regions
    const getRegions = regions => {
        return Array.from(regions.keys());
    };

    console.log(getRegions(ukraineRegions));

    const cities = Array.from(ukraineRegions.values()).flat();

    console.log(cities);

    const getKeyByValue = (map, searchValue) =>  {
        for (let [key, value] of map) {
            if (value.includes(searchValue)) {
                return key;
            }
        }
        return null; // Если значение не найдено
    }
    
    console.log(getKeyByValue(ukraineRegions,"Kharkiv"))

};
