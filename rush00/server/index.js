const express = require('express');
const app = express();

const fs = require('fs');
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');
const hash = require('object-hash');

const PORT = 8080;
const MSG = 'Server is running on port 8080!';

app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

app.use(bodyParser.json());

app.use(session({
    secret: '#@#42RUSHSESSION#@#',
    resave: false,
    saveUninitialized: true
}));

/*******************************************************************************************************************************/

/* app */

app.get('/', (req, res) => {
    res.sendFile(path.join(path.join(__dirname, '../', 'app', 'source'), 'app.html'));
});

/*******************************************************************************************************************************/

/* resources */

app.get('/resource/app.css', (req, res) => {
    res.sendFile(path.join(path.join(__dirname, '../', 'app', 'resource'), 'app.css'));
});

app.get('/resource/app.js', (req, res) => {
    res.sendFile(path.join(path.join(__dirname, '../', 'app', 'resource'), 'app.js'));
});

app.get('/resource/fav.ico', (req, res) => {
    res.sendFile(path.join(path.join(__dirname, '../', 'app', 'resource'), 'fav.ico'));
});

/*******************************************************************************************************************************/

/* Restful API */

const userFile = path.join(__dirname, 'db', 'user');

app.get('/api/user/check', (req, res) => {
    var sess = req.session;
    if(sess.userId !== undefined) {
        try {
            var users = JSON.parse(fs.readFileSync(userFile));
        } catch {
            users = [];
        }
        for (var key in users) {
            if (users[key]['userId'] === sess.userId) {
                res.set('Content-Type', 'application/json');
                res.json({ userAuth : users[key]['userAuth'] });
                return;
            }
		}
    } else {
        res.set('Content-Type', 'application/json');
        res.json({ data : 'Fail' });
    }
});

app.post('/api/user/signup', (req, res) => {
    var userId = req.body.userId;
    var userPassword = req.body.userPassword;

    try {
        var users = JSON.parse(fs.readFileSync(userFile));
    } catch {
        users = [];
    }

    if (userId !== '' && userPassword !== '') {
		for (var key in users) {
            if (users[key]['userId'] === userId) {
                res.json({ data : 'Fail' });
                return;
            }
		}
	} else {
        res.set('Content-Type', 'application/json');
        res.json({ data : 'Fail' });
        return;
    }

    if (users === []) {
        users = [{ userId: userId, userPassword: hash(userPassword), userAuth: 0 }];
    } else {
        users.unshift({ userId: userId, userPassword: hash(userPassword), userAuth: 0 });
    }

    fs.writeFileSync(userFile, JSON.stringify(users));
    res.set('Content-Type', 'application/json');
    res.json({ data : 'Success' });
});

app.post('/api/user/signin', (req, res) => {
    var sess = req.session;
    var userId = req.body.userId;
    var userPassword = req.body.userPassword;

    try {
        var users = JSON.parse(fs.readFileSync(userFile));
    } catch {
        users = [];
    }

    if (userId !== '' && userPassword !== '') {
        var check = 0;
        var auth = 0;
		for (var key in users) {
            if (users[key]['userId'] === userId && users[key]['userPassword'] === hash(userPassword)) {
                if(users[key]['userAuth'] === 1)
                    auth++;
                check++;
            }
        }
        if(check === 0) {
            res.set('Content-Type', 'application/json');
            res.json({ data : 'Fail' });
            return;
        }
	} else {
        res.set('Content-Type', 'application/json');
        res.json({ data : 'Fail' });
        return;
    }
    
    sess.userId = userId;
    sess.userPassword = userPassword;

    res.set('Content-Type', 'application/json');
    res.json({ data : 'Success', auth :  auth});
});

app.get('/api/user/logout', (req, res) => {
    req.session.destroy();
    res.set('Content-Type', 'application/json');
	res.json({ data : 'Success' });
});

app.get('/api/user/delete', (req, res) => {
    var sess = req.session;
    try {
        var users = JSON.parse(fs.readFileSync(userFile));
    } catch {
        users = [];
    }

    var i = 0;
    for (var key in users) {
        if (users[key]['userId'] === sess.userId) {
            users.splice(i, 1);
        }
        i++;
    }
    fs.writeFileSync(userFile, JSON.stringify(users));
    sess.destroy();
    res.set('Content-Type', 'application/json');
    res.json({ data : 'Success' });
});

/*******************************************************************************************************************************/

const productFile = path.join(__dirname, 'db', 'product');

app.post('/api/product/add', (req, res) => {
    var name = req.body.name;
    var price = req.body.price;
    var gender = req.body.gender;
    var type = req.body.type;
    var picture = req.body.picture;

    try {
        var products = JSON.parse(fs.readFileSync(productFile));
    } catch {
        products = [];
    }

    if (name !== 'null' && price !== 'null' && gender !== 'null' && type !== 'null' && picture !== 'null' &&
        name !== null && price !== null && gender !== null && type !== null && picture !== null) {
		for (var key in products) {
            if (products[key]['name'] === name) {
                if (products[key]['name'] === name) {
                    res.json({ data : 'Fail' });
                    return;
                }
            }
        }
	} else {
        res.set('Content-Type', 'application/json');
        res.json({ data : 'Fail' });
        return;
    }
    
    if (products === []) {
        products = [{ name: name, price: price, gender: gender, type: type, picture: picture }];
    } else {
        products.unshift({ name: name, price: price, gender: gender, type: type, picture: picture });
    }

    fs.writeFileSync(productFile, JSON.stringify(products));
    res.set('Content-Type', 'application/json');
    res.json({ data : 'Success' });
});

app.get('/api/product/list', (req, res) => {
    try {
        var products = JSON.parse(fs.readFileSync(productFile));
        res.set('Content-Type', 'application/json');
        res.json({ data : products });
    } catch {
        res.set('Content-Type', 'application/json');
        res.json({ data : 'Fail' });
    }
});

app.post('/api/product/update', (req, res) => {
    var name = req.body.name;
    var price = req.body.price;
    var gender = req.body.gender;
    var type = req.body.type;
    var picture = req.body.picture;

    try {
        var products = JSON.parse(fs.readFileSync(productFile));
    } catch {
        products = [];
    }

    if (name !== '' && price !== '' && gender !== '' && type !== '' && picture !== '') {
		for (var key in products) {
            if (products[key]['name'] === name) {
                products[key]['price'] = price;
                products[key]['gender'] = gender;
                products[key]['type'] = type;
                products[key]['picture'] = picture;
            }
        }
        fs.writeFileSync(productFile, JSON.stringify(products));
        res.set('Content-Type', 'application/json');
        res.json({ data : 'Success' });
        return;
	} else {
        res.set('Content-Type', 'application/json');
        res.json({ data : 'Fail' });
        return;
    }
});

app.post('/api/product/delete', (req, res) => {
    var name = req.body.name;

    try {
        var products = JSON.parse(fs.readFileSync(productFile));
    } catch {
        products = [];
    }

    if (name !== '') {
        var i = 0;
		for (var key in products) {
            if (products[key]['name'] === name) {
                products.splice(i, 1);
            }
            i++;
        }
        fs.writeFileSync(productFile, JSON.stringify(products));
        res.set('Content-Type', 'application/json');
        res.json({ data : 'Success' });
        return;
	} else {
        res.set('Content-Type', 'application/json');
        res.json({ data : 'Fail' });
        return;
    }
});

app.post('/api/product/show', (req, res) => {
    var gender = req.body.gender;
    var type = req.body.type;

    try {
        var products = JSON.parse(fs.readFileSync(productFile));
        var results = [];
        for (var key in products) {
            if (products[key]['gender'] == gender && (type === 0 || products[key]['type'] == type)) {
                results.push(products[key]);
            }
        }
        res.set('Content-Type', 'application/json');
        res.json({ data : results });
    } catch {
        res.set('Content-Type', 'application/json');
        res.json({ data : 'Fail' });
    }
});

app.post('/api/product/cartInfo', (req, res) => {
    var cart = req.body;
    var result = [];

    try {
        var products = JSON.parse(fs.readFileSync(productFile));
        for (var i = 0; i < cart.length; i++) {
            for (var key in products) {
                if (products[key]['name'] === cart[i].name) {
                    result.push(products[key]);
                    break;
                }
            }
        }
        res.set('Content-Type', 'application/json');
        res.json({ data : result });
    } catch {
        res.set('Content-Type', 'application/json');
        res.json({ data : 'Fail' });
    }
});

/*******************************************************************************************************************************/

const saleFile = path.join(__dirname, 'db', 'sale');

app.post('/api/sale/add', (req, res) => {
    var userId = req.session.userId;
    var name = req.body.name;
    var price = req.body.price;
    var amount = req.body.amount;

    try {
        var sales = JSON.parse(fs.readFileSync(saleFile));
    } catch {
        sales = [];
    }

    if (userId !== 'null' && name !== 'null' && price !== 'null' && amount &&
        userId !== null && name !== null && price !== null && amount != null) {
        if (sales === []) {
            sales = [{ userId: userId, name: name, price: price, amount: amount }];
        } else {
            sales.unshift({ userId: userId, name: name, price: price, amount: amount });
        }
        fs.writeFileSync(saleFile, JSON.stringify(sales));
        res.set('Content-Type', 'application/json');
        res.json({ data : 'Success' });
	} else {
        res.set('Content-Type', 'application/json');
        res.json({ data : 'Fail' });
        return;
    }
});

app.get('/api/sale/list', (req, res) => {
    try {
        var sales = JSON.parse(fs.readFileSync(saleFile));
        res.set('Content-Type', 'application/json');
        res.json({ data : sales });
    } catch {
        res.set('Content-Type', 'application/json');
        res.json({ data : 'Fail' });
    }
});

/*******************************************************************************************************************************/

/* listener */

app.listen(PORT, () => console.log(MSG));

/*******************************************************************************************************************************/