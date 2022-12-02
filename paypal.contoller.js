var paypal = require('paypal-rest-sdk');
var express = require('express');
var app = express();


app.get('/data', (req, res) => {
    res.send('Hello from node.js')
});
paypal.configure({
    'mode': 'sandbox',
    'client_id': 'AUU8IiB0De8c41cDCr5YPhHzc0eydU77wxpjoJSbRPJM6wzwkZ6Fg7UYlMmr5Gm_kgFUlsqomP3pT_P6',
    'client_secret': 'ENo0qIVD6N1NpDG-YZjZ4EvZhtL-MNqmjakJASvsHpA1hTFH0EHQXZiXpfUJ59INuRKn9hMcHpQ3VzeI'
});
app.get('/pay', (req, res) => {
    var create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://return.url",
            "cancel_url": "http://cancel.url"
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": "item",
                    "sku": "item",
                    "price": "100",
                    "currency": "USD",
                    "quantity": 1
                }]
            },
            "amount": {
                "currency": "USD",
                "total": "100"
            },
            "description": "This is the payment description."
        }]
    };
    paypal.payment.create(create_payment_json, (error, payment) => {
        if (error) {
            throw error;
        } else {
            console.log("Create Payment Response");
            console.log(payment);
            for (let i = 0; i < payment.links.length; i++) {
                if (payment.links[i].rel == 'approval_url') {
                    res.redirect(payment.links[i].href);
                    //  console.log(payment.links.paypal.redirect_urls)
                }

            }
        }
    });
});



