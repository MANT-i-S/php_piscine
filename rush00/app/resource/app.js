document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('nav-men').style.display = 'block';
    userCheck();
    nav(1, 0);
});

var check = false;
var cart = [];

function nav(value, type) {
    document.getElementById('nav-men').style.display = 'none';
    document.getElementById('nav-women').style.display = 'none';
    document.getElementById('nav-kid').style.display = 'none';
    document.getElementById('nav-signin').style.display = 'none';
    document.getElementById('nav-signup').style.display = 'none';
    document.getElementById('nav-manager').style.display = 'none';
    document.getElementById('nav-cart').style.display = 'none';
    if(value === 1) {
        document.getElementById('nav-men').style.display = 'block';
        show(value, type);
    }
    if(value === 2) {
        document.getElementById('nav-women').style.display = 'block';
        show(value, type);
    }
    if(value === 3) {
        document.getElementById('nav-kid').style.display = 'block';
        show(value, type);
    }
    if(value === 4) {
        document.getElementById('content-item-container').innerHTML = '';
        document.getElementById('nav-signin').style.display = 'block';
    }
    if(value === 5) {
        document.getElementById('content-item-container').innerHTML = '';
        document.getElementById('nav-signup').style.display = 'block';
    }
    if(value === 6) {
        document.getElementById('content-item-container').innerHTML = '';
        document.getElementById('nav-manager').style.display = 'block';
        itemList();
        saleList();
    }
    if(value === 7) {
        document.getElementById('content-item-container').innerHTML = '';
        document.getElementById('nav-cart').style.display = 'block';
        cartList(cart);
    }
}

function userCheck() {
    document.getElementById('btn-signin').style.display = 'none';
    document.getElementById('btn-signup').style.display = 'none';
    document.getElementById('btn-logout').style.display = 'none';
    document.getElementById('btn-manager').style.display = 'none';
    document.getElementById('btn-deleteAccount').style.display = 'none';
    fetch('http://localhost:8080/api/user/check', {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then((res) => res.json()).then(json => {
        if(json.data === 'Fail') {
            check = false;
            document.getElementById('btn-signin').style.display = 'block';
            document.getElementById('btn-signup').style.display = 'block';
        } else {
            check = true;
            document.getElementById('btn-logout').style.display = 'block';
            if(json.userAuth === 1)
                document.getElementById('btn-manager').style.display = 'block';
            else
                document.getElementById('btn-deleteAccount').style.display = 'block';
        }
    });
}

function signup() {
    var user = {
        userId: document.getElementById('signup-userId').value,
        userPassword: document.getElementById('signup-userPassword').value
    }
    fetch('http://localhost:8080/api/user/signup', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }).then((res) => res.json()).then(json => {
        if(json.data === 'Fail')
            alert('Fail!');
        else {
            alert('Sign Up Success!');
            document.getElementById('signup-userId').value = '';
            document.getElementById('signup-userPassword').value = '';
            nav(4, 0);
        }
    });
}

function signin() {
    var user = {
        userId: document.getElementById('signin-userId').value,
        userPassword: document.getElementById('signin-userPassword').value
    }
    fetch('http://localhost:8080/api/user/signin', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    }).then((res) => res.json()).then(json => {
        if(json.data === 'Fail')
            alert('Fail!');
        else {
            if(json.auth === 1) {
                nav(6, 0);
            } else {
                alert('Sign In Success!');
                document.getElementById('signin-userId').value = '';
                document.getElementById('signin-userPassword').value = '';
                nav(1, 0);
            }
        }
        userCheck();
    });
}

function logout() {
    fetch('http://localhost:8080/api/user/logout', {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then((res) => res.json()).then(json => {
        alert('Bye bye! See you!');
        userCheck();
        nav(1, 0);
    });
}

function deleteAccount() {
    if(confirm('Are you sure?')) {
        fetch('http://localhost:8080/api/user/delete', {
            method: "GET",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((res) => res.json()).then(json => {
            alert('Bye...!');
            userCheck();
            nav(1, 0);
        });
    }
}

function itemAdd() {
    var product = {
        name: '',
        price: '',
        gender: '',
        type: '',
        picture: ''
    }

    product.name = prompt('Product name');
    product.price = prompt('Product price');
    product.gender = prompt('Product gender');
    product.type = prompt('Product type');
    product.picture = prompt('Product picture');

    if(product.name !== '' && product.price !== '' && product.gender !== '' && product.type !== '' && product.picture !== '' &&
    product.name !== null && product.price !== null && product.gender !== null && product.type !== null && product.picture !== null ) {
        fetch('http://localhost:8080/api/product/add', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        }).then((res) => res.json()).then(json => {
            if(json.data === 'Fail') {
                alert('Fail!');
            } else {
                alert('Success!');
            }
            itemList();
        });
    }
}

function itemList() {
    fetch('http://localhost:8080/api/product/list', {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then((res) => res.json()).then(json => {
        if(json.data === 'Fail') {
            alert('Item list is empty!');
        } else {
            document.getElementById('manager-item-list-container').innerHTML = '';
            var res = '';
            for(var i = 0; i < json.data.length; i++) {
                res += `<div class="manager-item-list">
                            <div class="manager-item-picture"><img src=\"${json.data[i].picture}\" width=\"100%\" height=\"100%\"></div>
                            <div class="manager-item-list-container">
                                <div class="manager-item-data"><b>Name : </b>${json.data[i].name}</div>
                                <div class="manager-item-data"><b>Price : </b>${json.data[i].price}</div>
                                <div class="manager-item-data"><b>Gender : </b>${json.data[i].gender}</div>
                                <div class="manager-item-data"><b>Type : </b>${json.data[i].type}</div>
                            </div>
                            <div class="manager-item-util-container">
                                <button class="manager-item-btn" onclick=\"itemModify('${json.data[i].name}')\">Modify</button>
                                <button class="manager-item-btn" onclick=\"itemDelete('${json.data[i].name}')\">Delete</button>
                            </div>
                        </div>`;
            }
            document.getElementById('manager-item-list-container').innerHTML = res;
        }
    });
}

function itemModify(name) {
    var product = {
        name: '',
        price: '',
        gender: '',
        type: '',
        picture: ''
    }
    product.name = name;
    product.price = prompt('Product price');
    product.gender = prompt('Product gender');
    product.type = prompt('Product type');
    product.picture = prompt('Product picture');

    if(product.price !== '' && product.gender !== '' && product.type !== '' && product.picture !== '' &&
    product.price !== null && product.gender !== null && product.type !== null && product.picture !== null) {
        fetch('http://localhost:8080/api/product/update', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        }).then((res) => res.json()).then(json => {
            if(json.data === 'Fail') {
                alert('Fail!');
            } else {
                alert('Success!');
            }
            itemList();
        });
    }
}

function itemDelete(name) {
    var product = {
        name: '',
    }
    product.name = name;
    fetch('http://localhost:8080/api/product/delete', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    }).then((res) => res.json()).then(json => {
        if(json.data === 'Fail') {
            alert('Fail!');
        } else {
            alert('Success!');
        }
        itemList();
    });
}

function show(gender, type) {
    var product = {
        gender: 0,
        type: 0,
    }
    product.gender = gender;
    product.type = type;
    fetch('http://localhost:8080/api/product/show', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    }).then((res) => res.json()).then(json => {
        if(json.data !== 'Fail') {
            document.getElementById('content-item-container').innerHTML = '';
            var res = '';
            for(var i = 0; i < json.data.length; i++) {
                res += `<div class="content-item">
                            <img class="content-item-img" src="${json.data[i].picture}">
                            <div class="content-item-detail">
                                <p class="content-item-detail-name">${json.data[i].name}</p>
                                <p class="content-item-detail-price">${json.data[i].price}</p>
                                <button class="content-item-detail-add" onclick="addToCart('${json.data[i].name}')">Add to Cart</button>
                            </div>
                        </div>`;
            }
            document.getElementById('content-item-container').innerHTML = res;
        }
    });
}

function addToCart(name) {
    if(check) {
        cart.push({name: name, count: 1});
        document.getElementById('cart-icon').style.display = 'block';
        document.getElementById('cart-icon').innerHTML = cart.length;
    } else {
        alert('Please sign in first :)');
        nav(4, 0);
    }
}

function cartList(cart) {
    fetch('http://localhost:8080/api/product/cartInfo', {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cart)
    }).then((res) => res.json()).then(json => {
        if(json.data === 'Fail') {
            alert('Fail!');
        } else {
            document.getElementById('cart-item-list-container').innerHTML = '';
            var res = '';
            var price = 0;
            for(var i = 0; i < json.data.length; i++) {
                res += `<div class="cart-item-list">
                        <div class="cart-item-picture"><img src=\"${json.data[i].picture}\" width=\"100%\" height=\"100%\"></div>
                        <div class="cart-item-list-container">
                            <div class="cart-item-data"><b>Name : </b>${json.data[i].name}</div>
                            <div class="cart-item-data"><b>Price : </b>${json.data[i].price}</div>
                            <button class="cart-item-btn" onclick=\"cartDelete(${i})\">Delete</button>
                        </div>
                    </div>`;
                price += parseInt(json.data[i].price.slice(1, json.data[i].price.length));
            }
            res += `<div class="cart-item-price">Total : $${price}</div><button class="cart-item-checkout" onclick="checkout(${price}, ${json.data.length})">Check Out</button>`;
            document.getElementById('cart-item-list-container').innerHTML = res;
        }
    });
}

function cartDelete(num) {
    cart.splice(num, 1);
    document.getElementById('cart-icon').innerHTML = cart.length;
    if(cart.length === 0)
        document.getElementById('cart-icon').style.display = 'none';
    cartList(cart);
}

function checkout(price, amount) {
    if(cart.length !== 0) {
        fetch('http://localhost:8080/api/sale/add', {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: amount === 1 ? cart[0].name : cart[0].name + '++',
                price: price,
                amount: amount
            })
        }).then((res) => res.json()).then(json => {
            if(json.data === 'Fail') {
                alert('Fail!');
            } else {
                alert('Success!');
                cart = [];
                document.getElementById('cart-icon').style.display = 'none';
                nav(1, 0);
            }
        });
    } else {
        alert('Your cart is empty!');
    }
}

function saleList() {
    fetch('http://localhost:8080/api/sale/list', {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then((res) => res.json()).then(json => {
        if(json.data === 'Fail') {
            alert('Sales list is empty!');
        } else {
            document.getElementById('manager-sale-list-container').innerHTML = '';
            var res = '';
            for(var i = 0; i < json.data.length; i++) {
                res += `<div class="manager-sale-list">
                            <div class="manager-sale-data"><b>User ID : </b>${json.data[i].userId}</div>
                            <div class="manager-sale-data"><b>Item Name : </b>${json.data[i].name}</div>
                            <div class="manager-sale-data"><b>Price : </b>${json.data[i].price}</div>
                            <div class="manager-sale-data"><b>Amount : </b>${json.data[i].amount}</div>
                        </div>`;
            }
            document.getElementById('manager-sale-list-container').innerHTML = res;
        }
    });
}