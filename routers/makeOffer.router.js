module.exports = app => {

    const express = require('express');
    const router = express.Router();
    const makeOfferController = require('../controllers/makeOffer.controller');


    router.post('/bargain', makeOfferController.makePriceCreate);
    router.get('/', makeOfferController.findAll);
    router.post('/alloffers/all/bargain/:seller_id', makeOfferController.getAllOffer);
    router.get('/pending/offer/:buyer_id', makeOfferController.findAll_pending_offers);
    router.get('/accept/list/offer/:buyer_id', makeOfferController.findAll_accept_offers);
    router.get('/bargain/reject/list/offer/:buyer_id', makeOfferController.findAll_reject_offers);
    router.post('/bargain/update_Offer/', makeOfferController.update_Offer);
    router.post('/bargain/Delete/Offers/:id', makeOfferController.delete_offer);
    router.post('/make_offer/summary', makeOfferController.find_makeprice_summary);
    app.use('/api/make-price', router)
}