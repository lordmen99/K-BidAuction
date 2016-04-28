'use strict';

angular
    .module('bidAuctionApp', ['ngMockE2E'])
    .run(function($httpBackend, $resource, configuration) {

        // Common pass through urls
        $httpBackend.whenGET(/assets\/languages\/.*/).passThrough();
        $httpBackend.whenGET(/\.html.*$/).passThrough();
        $httpBackend.whenGET(/^api\/.*/).passThrough();

        // TODO: This should be mocked!
        $httpBackend.whenPOST(/\/ng_logout/).passThrough();

        // Service URLs
        mock(false, $httpBackend.whenGET(/\/product\/.*/)).respond(
            $resource('api/productManagement/product.json').get());

        mock(false, $httpBackend.whenGET(/\/rest\/userManagement\/getPlayerDetails.*/))
            .respond($resource('api/userManagement/playerDetails.json').get());

        mock(false, $httpBackend.whenGET(/\/rest\/userManagement\/getSellerDetails.*/))
            .respond($resource('api/userManagement/sellerDetails.json').get());
    });