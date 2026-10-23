/**
 * VENDORS
 */

/**
 *  THEME SCRIPTS
 */

window.onload = function () {
}
/*** End - Init ***/
const notyf = new Notyf({
    position: {
        x: 'right',
        y: 'top',
    },
    dismissible: true,
    ripple: false,
    duration: 10000,
    icon: false,
    types: [
        {
            type: 'info',
            background: 'white',
            icon: false,
            className: 'notyf-info',
        },
        {
            type: 'warning',
            background: 'orange',
            className: 'notyf-warning',
            icon: false,
        },
        {
            type: 'error',
            background: 'red',
            className: 'notyf-error',
            icon: false,
        },
        {
            type: 'success',
            background: 'green',
            className: 'notyf-success',
            icon: false,
        },
    ]
});


function copyLinkLocation(value = window.location.href) {
    var el = document.createElement('textarea');
    el.value = value;
    el.style = {display: 'none'};
    document.body.appendChild(el)
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    notyf.success('Copiado para sua área de transferência');
}

/*** Start - Input Password - hide or show ***/
var btnsPasswordShow = document.querySelectorAll('.form-icon_password__show');
for (var i = 0; i < btnsPasswordShow.length; i++) {
    btnsPasswordShow[i].addEventListener('click', function () {
        this.style.display = 'none';
        var btnsPasswordHide = document.querySelectorAll('.form-icon_password__hide');
        for (var x = 0; x < btnsPasswordHide.length; x++) {
            var btnPasswordHide = btnsPasswordHide [x];
            btnPasswordHide.style.display = 'block';
        }
        Array.prototype.forEach.call(this.parentNode.querySelectorAll('input'), function (elInput) {
            elInput.setAttribute('type', 'password');
        });
    });
}

var btnsPasswordHide = document.querySelectorAll('.form-icon_password__hide');
for (var i = 0; i < btnsPasswordHide.length; i++) {
    btnsPasswordHide[i].addEventListener('click', function () {
        this.style.display = 'none';
        var btnsPasswordShow = document.querySelectorAll('.form-icon_password__show');
        for (var x = 0; x < btnsPasswordShow.length; x++) {
            var btnPasswordShow = btnsPasswordShow [x];
            btnPasswordShow.style.display = 'block';
        }
        Array.prototype.forEach.call(this.parentNode.querySelectorAll('input'), function (elInput) {
            elInput.setAttribute('type', 'text');
        });
    });
}
/*** End - Input Password - hide or show ***/

/*** Start - Search: viewType ***/
var btnsViewLinks = document.querySelectorAll('.search-view_link');
for (var x = 0; x < btnsViewLinks.length; x++) {
    btnsViewLinks[x].addEventListener('click', function () {
        var viewType = this.getAttribute('data-type');

        if (this.classList.contains('search-view_link__mobile')) {
            if (viewType === 'list') {
                viewType = 'grid';
            } else if (viewType === 'grid') {
                viewType = 'list';
            }
            this.setAttribute('data-type', viewType);

            for (var y = 0; y < btnsViewLinks.length; y++) {
                if (btnsViewLinks[y].classList.contains('active')) {
                    btnsViewLinks[y].classList.remove('active');
                }
            }
            document.querySelector('.search-view_link.search-view_link__' + viewType).classList.add('active');
        } else {
            for (var y = 0; y < btnsViewLinks.length; y++) {
                if (btnsViewLinks[y].classList.contains('active')) {
                    btnsViewLinks[y].classList.remove('active');
                }
            }
            this.classList.add('active');

            document.querySelector('.search-view_link.search-view_link__mobile').setAttribute('data-type', viewType);
        }

        var viewType = this.getAttribute('data-type');
        var showcasesSearch = document.querySelectorAll('.showcase-search');
        for (var i = 0; i < showcasesSearch.length; i++) {
            var showcaseSearch = showcasesSearch[i];
            if (viewType === 'grid') {
                if (!showcaseSearch.classList.contains('showcase-search_grid')) {
                    showcaseSearch.classList.add('showcase-search_grid');
                }
                if (showcaseSearch.classList.contains('showcase-search_list')) {
                    showcaseSearch.classList.remove('showcase-search_list');
                }

            } else if (viewType === 'list') {
                if (!showcaseSearch.classList.contains('showcase-search_list')) {
                    showcaseSearch.classList.add('showcase-search_list');
                }
                if (showcaseSearch.classList.contains('showcase-search_grid')) {
                    showcaseSearch.classList.remove('showcase-search_grid');
                }
            }
        }
        setCookie('viewType', viewType, '', '');
    });
}

/*** Start - handleChangeFilterSearch ***/
var filtersSearch = document.querySelectorAll('.search-filters form');
for (var x = 0; x < filtersSearch.length; x++) {
    filtersSearch[x].addEventListener('change', function (event) {
        if ((event.target.type !== "number") && (event.target.type !== "text")) {
            this.submit();
        }
    });
}
var filtersSearchBtn = document.querySelectorAll('.search-filters form');
for (var x = 0; x < filtersSearchBtn.length; x++) {
    filtersSearchBtn[x].addEventListener('submit', function (event) {
        event.preventDefault();
        if (document.querySelector('.form-input-max-potency-hidden')) {
            var inputsMaxPotencyHiddenForm = document.querySelectorAll('.form-input-max-potency-hidden');
            for (var x = 0; x < inputsMaxPotencyHiddenForm.length; x++) {
                if (inputsMaxPotencyHiddenForm[x].value > 0) {
                    var inputsMinPotencyHiddenForm = document.querySelectorAll('.form-input-min-potency-hidden');
                    for (var x = 0; x < inputsMinPotencyHiddenForm.length; x++) {
                        if (inputsMinPotencyHiddenForm[x].value) {
                            this.submit();
                        } else {
                            inputsMinPotencyHiddenForm[x].value = inputsMinPotencyHiddenForm[x].getAttribute('data-min');
                            inputsMinPotencyHiddenForm[x].name = 'minPotencia';
                            this.submit();
                        }
                    }
                } else {
                    this.submit();
                }
            }
        } else {
            this.submit();
        }
    });
}

var inputsMinPotency = document.querySelectorAll('.form-input-min-potency');
for (var x = 0; x < inputsMinPotency.length; x++) {
    inputsMinPotency[x].addEventListener('change', function () {
        var inputsMinPotencyHidden = document.querySelectorAll('.form-input-min-potency-hidden');
        for (var x = 0; x < inputsMinPotencyHidden.length; x++) {
            if (this.value > 0) {
                inputsMinPotencyHidden[x].value = this.value;
                inputsMinPotencyHidden[x].name = 'minPotencia';
            } else {
                inputsMinPotencyHidden[x].value = '';
                inputsMinPotencyHidden[x].name = '';
            }
        }
        var inputsMaxPotency1 = document.querySelectorAll('.form-input-max-potency');
        for (var x = 0; x < inputsMaxPotency1.length; x++) {
            if (this.value > 0) {
                inputsMaxPotency1[x].setAttribute('min', this.value);
            } else {
                inputsMaxPotency1[x].setAttribute('min', this.getAttribute('min'));
            }
        }
    });
}

var inputsMaxPotency = document.querySelectorAll('.form-input-max-potency');
for (var x = 0; x < inputsMaxPotency.length; x++) {
    inputsMaxPotency[x].addEventListener('change', function () {
        var inputsMaxPotencyHidden = document.querySelectorAll('.form-input-max-potency-hidden');
        for (var x = 0; x < inputsMaxPotencyHidden.length; x++) {
            if (this.value > 0) {
                inputsMaxPotencyHidden[x].value = this.value;
                inputsMaxPotencyHidden[x].name = 'maxPotencia';
            } else {
                inputsMaxPotencyHidden[x].value = '';
                inputsMaxPotencyHidden[x].name = '';
            }
        }
    });
}
/*** End - handleChangeFilterSearch ***/

function handleProductVariation(state, idProduct) {
    StoreSDK.request.get(`/ajax/product/variation/${idProduct}`)
        .then((response) => {
            const stateTemp = productJSONTransform(state, response);
            window.dispatchEvent(
                new CustomEvent(
                    "update-ajax-product",
                    {
                        detail: stateTemp
                    }
                )
            );
        }).catch((error) => {
        notyf.open({type: 'warning', message: 'Não foi possivel carregar produto selecionado.'});
    });
}

function productJSONTransform(state, data){
    const stateTemp = state;

    const mainPrice = data.product.price.promotionPrice? data.product.price.promotionPrice : data.product.price.price;

    stateTemp.quantity = 1;
    stateTemp.productId = data.product.id;
    stateTemp.price = data.product.price.basePrice ? data.product.price.basePrice : mainPrice;

    stateTemp.product.categories = data.product.categories;
    stateTemp.product.grids = data.product.grids;
    stateTemp.product.price = data.product.price;
    stateTemp.product.sku = data.product.sku;
    stateTemp.product.title = data.product.title;
    stateTemp.product.url = data.product.url;
    stateTemp.product.id = data.product.id;

    return stateTemp;
}

function handleProductPriceGroup(state, idProduct) {
    StoreSDK.request.get(`/ajax/product/json/${idProduct}`)
        .then((response) => {
            const stateTemp = productJSONTransform(state, response);
            const stateKitTemp = productJsonKitTransform(response);
            const stateGroupPurchaseItem = productJsonGroupPurchaseTransform(response);
            window.dispatchEvent(
                new CustomEvent(
                    "update-ajax-product",
                    {
                        detail: stateTemp
                    }
                )
            );
            if (response?.kitOptions?.length > 0) {
                window.dispatchEvent(
                    new CustomEvent(
                        "update-ajax-product-kit",
                        {
                            detail: stateKitTemp
                        }
                    )
                );
            }
            if (response?.groupPurchase?.length > 0) {
                window.dispatchEvent(
                    new CustomEvent(
                        "change-product-group-purchase",
                        {
                            detail: stateGroupPurchaseItem
                        }
                    )
                );
            }
        }).catch((error) => {
        notyf.open({type: 'warning', message: 'Não foi possivel carregar produto selecionado.'});
    });
}

function productJsonGroupPurchaseTransform(data) {
    if (data.groupPurchase < 0) {
        return {}
    }
    return data.groupPurchase.map((groupPurchaseItem) => {
        const result = {
            id: groupPurchaseItem.id,
            title: groupPurchaseItem.title,
            stockTotal: groupPurchaseItem.stockTotal,
            manageStock: groupPurchaseItem.manageStock,
            status: false,
            finalPrice: (groupPurchaseItem.price.promotionPrice && groupPurchaseItem.price.promotionPrice > 0) ? groupPurchaseItem.price.promotionPrice : groupPurchaseItem.price.price,
        }
        if (groupPurchaseItem.price) {
            result.price = {
                price: groupPurchaseItem.price.price ? groupPurchaseItem.price.price : 0,
                promotionPrice: groupPurchaseItem.price.promotionPrice ? groupPurchaseItem.price.promotionPrice : 0,
                status: groupPurchaseItem.price.status ? groupPurchaseItem.price.status : false,
            }
        }
        if (groupPurchaseItem.primaryPrice) {
            result.finalPrimaryPrice = groupPurchaseItem.primaryPrice.promotionPrice && groupPurchaseItem.primaryPrice.promotionPrice > 0 ? groupPurchaseItem.primaryPrice.promotionPrice : groupPurchaseItem.primaryPrice.price;
            result.primaryPrice = {
                price: groupPurchaseItem.primaryPrice.price ? groupPurchaseItem.primaryPrice.price : 0,
                promotionPrice: groupPurchaseItem.primaryPrice.promotionPrice ? groupPurchaseItem.primaryPrice.promotionPrice : 0,
            }
        }
        if (groupPurchaseItem.secondaryPrice) {
            result.secondaryPrice = {
                price: groupPurchaseItem.secondaryPrice.price ? groupPurchaseItem.secondaryPrice.price : 0,
                promotionPrice: groupPurchaseItem.secondaryPrice.promotionPrice ? groupPurchaseItem.secondaryPrice.promotionPrice : 0,
            }
        }
        return result
    });
}

function productJsonKitTransform(data){
    if (data.kitOptions.length < 0) {
        return {}
    }
    return {
        price: data.product.price.basePrice,
        kitOptions: data.kitOptions,
        kitOptionsSelected: [],
        totalSelected: {
            price: 0,
            quantity: 0
        },
        product: data.product,
    }
}

function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str);
}

function getAllUrlParams(url) {
    // get query string from url (optional) or window
    var queryString = url ? url.split('?')[1] : window.location.search.slice(1);

    // we'll store the parameters here
    var obj = {};

    // if query string exists
    if (queryString) {

        // stuff after # is not part of query string, so get rid of it
        queryString = queryString.split('#')[0];

        // split our query string into its component parts
        var arr = queryString.split('&');

        for (var i = 0; i < arr.length; i++) {
            // separate the keys and the values
            var a = arr[i].split('=');

            // set parameter name and value (use 'true' if empty)
            var paramName = a[0];
            var paramValue = typeof (a[1]) === 'undefined' ? true : a[1];

            // (optional) keep case consistent
            // paramName = paramName.toLowerCase();
            // if (typeof paramValue === 'string') paramValue = paramValue.toLowerCase();

            // if the paramName ends with square brackets, e.g. colors[] or colors[2]
            if (paramName.match(/\[(\d+)?\]$/)) {

                // create key if it doesn't exist
                var key = paramName.replace(/\[(\d+)?\]/, '');
                if (!obj[key]) obj[key] = [];

                // if it's an indexed array e.g. colors[2]
                if (paramName.match(/\[\d+\]$/)) {
                    // get the index value and add the entry at the appropriate position
                    var index = /\[(\d+)\]/.exec(paramName)[1];
                    obj[key][index] = paramValue;
                } else {
                    // otherwise add the value to the end of the array
                    obj[key].push(paramValue);
                }
            } else {
                // we're dealing with a string
                if (!obj[paramName]) {
                    // if it doesn't exist, create property
                    obj[paramName] = paramValue;
                } else if (obj[paramName] && typeof obj[paramName] === 'string') {
                    // if property does exist and it's a string, convert it to an array
                    obj[paramName] = [obj[paramName]];
                    obj[paramName].push(paramValue);
                } else {
                    // otherwise add the property
                    obj[paramName].push(paramValue);
                }
            }
        }
    }
    return obj;
}
