var fs = require("fs");
var file = "data/kbidAppDb";
var exists = fs.existsSync(file);

if(!exists) {
    console.log("Creating DB file.");
    fs.openSync(file, "w");
    db.serialize(function() {
        db.run("CREATE TABLE IF NOT EXISTS counts (id TEXT, name TEXT, imageSrc TEXT, quantity INTEGER, minBid INTEGER, isActiveBid BOOLEAN, sellerBid INTEGER, bidOver BOOLEAN)");
        db.run("INSERT INTO counts (id, name, imageSrc, quantity ) VALUES (?, ?)", "counter", 0);
    });
}

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('data/kbidAppDb');

var express = require('express');
var restapi = express();
//CORS on ExpressJS
restapi.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Origin");
  next();
});
var maxPlayerId = 'select max(id) as mid from players';
var maxAuctionQuery = 'select max(id) as amid from auctions';
var playersQuery = "SELECT * from players";

restapi.get('/getAllProducts', function(req, res){
    var allProducts = "SELECT * from products";
    var availableProducts = [];
    db.all(allProducts, function(err, rows) {  
        rows.forEach(function (row) {
            availableProducts.push(row);
        })
        res.json(availableProducts);
    }); 
});
restapi.get('/getProduct/:pid', function(req, res){
    var getProductQuery = "SELECT * FROM products WHERE id='"+req.params.pid+"'";
    db.all(getProductQuery, function(err, row) {
        console.log(row);
        res.json(row);
    }); 
});
restapi.get('/getAllPlayers', function(req, res){
    var players = [];
    db.all(playersQuery, function(err, rows) {  
        rows.forEach(function (row) {
            players.push(row);
        })
        res.json(players);
    }); 
});
restapi.post('/updatePlayerCoins/:coins/:plid', function(req, res){
    console.log(req.params.id);
    db.run("UPDATE players SET coins="+req.params.coins+" WHERE id = "+req.params.plid, function(err, row){
        if (err){
            console.log(err);
            res.status(500);
        }else {
            res.status(202);
        }
        res.end();
    });
});
restapi.get('/getPlayer/:pname', function(req, res){
    var playerQuery = "SELECT * FROM players WHERE name='"+req.params.pname+"'";
    db.all(playerQuery, function(err, row) {
        console.log(row);
        res.json(row);
    }); 
});
restapi.get('/getMaxPlayerId', function(req, res){
    var maxPid = 1;
    db.all(maxPlayerId, function(err, rows){
        rows.forEach(function (row) {
            maxPid = row.mid;
            console.log('maxid:' + maxPid);
            res.json(row);
        })
    });
});
restapi.post('/bidover/:bo/:id/:qty', function(req, res){
    console.log(req.params.id);
    db.run("UPDATE products SET bidOver='"+req.params.bo+"', isActiveBid='false', quantity="+req.params.qty+" WHERE id = "+req.params.id, function(err, row){
        if (err){
            console.log(err);
            res.status(500);
        }else {
            res.status(202);
        }
        res.end();
    });
});

restapi.post('/updateActiveBid/:isab/:id/:pvpid', function(req, res){
    console.log(req.params.id);
    db.run("UPDATE products SET isActiveBid = 'false' WHERE id = "+req.params.pvpid, function(err, row){
        if (err){
            console.log(err);
            res.status(500);
        }else {
            res.status(202);
        }
        res.end();
    });
    db.run("UPDATE products SET isActiveBid = '"+req.params.isab+"' WHERE id = "+req.params.id, function(err, row){
        if (err){
            console.log(err);
            res.status(500);
        }else {
            res.status(202);
        }
        res.end();
    });
});

restapi.post('/insertUser/:name/:coins/:ia', function(req, res){
    console.log(req.params.id);
    var maxPid = 1;
    db.all(maxPlayerId, function(err, rows){
        rows.forEach(function (row) {
            maxPid = row.mid;
            console.log('maxid:' + maxPid);
            res.json(row);
        })
        db.run("INSERT into players values ("+(maxPid+1)+",'"+req.params.name+"',"+req.params.coins+",'"+req.params.ia+"')", function(err, row){
            if (err){
                console.log(err);
                res.status(500);
            }else {
                res.status(202);
            }
            res.end();
        });
    });
});
restapi.post('/insertAuction/:sbid/:ia', function(req, res){
    console.log(req.params.id);
    var date = new Date();
    var maxAuctionId = 1;
    db.all(maxAuctionQuery, function(err, rows){
        console.log(rows);
        rows.forEach(function (row) {
            maxAuctionId = row.amid;
            console.log('maxAuctionId:' + maxAuctionId);
            res.json({'curauid': row.amid+1});
        })
        db.run("INSERT into auctions values ("+(maxAuctionId+1)+","+req.params.sbid+",'"+req.params.ia+"')", function(err, row){
            if (err){
                console.log(err);
                res.status(500);
            }else {
                res.status(202);
            }
            res.end();
        });
    });

});
restapi.get('/getAllAuctions', function(req, res){
    var auctionsQuery = "SELECT * FROM auctions";
    var auctions = [];
    db.all(auctionsQuery, function(err, rows) {  
        rows.forEach(function (row) {
            auctions.push(row);
        })
        res.json(auctions);
    }); 
});
restapi.get('/getAllBids', function(req, res){
    var bidQuery = "SELECT * FROM bids";
    var bids = [];
    db.all(bidQuery, function(err, rows) {
        rows.forEach(function (row) {
            bids.push(row);
        })
        res.json(bids);
    });
});

restapi.delete('/deleteBids', function(req, res){
    var bidDelQuery = "DELETE FROM bids";
    db.run(bidDelQuery);
});
restapi.get('/getMaxBid', function(req, res){
    var playerQuery = "SELECT * FROM bids order by bidTime desc"
    db.all(playerQuery, function(err, rows) {
        console.log(Date.parse(new Date())-rows[0].bidtime);
        console.log(rows[0].bidtime);
        console.log(rows[0]);
        res.json(rows[0]);
    }); 
});

restapi.get('/getAcitiveBid', function(req, res){
    var playerQuery = "SELECT * FROM bids order by bidTime desc"
    var actBidTime = 0;
    var actBidData = {};
    db.all(playerQuery, function(err, rows) {
        console.log(Date.parse(new Date())-rows[0].bidtime);
        actBidTime = (Date.parse(new Date())-rows[0].bidtime)/1000;
        console.log(actBidTime);
        console.log(rows[0]);
        actBidData = rows[0];
        actBidData.actBidtime = 90 - actBidTime;
        res.json(actBidData);
    }); 
});
restapi.get('/getWiningBid/:auid/:prdid/:lbid', function(req, res){
    var playerQuery = "SELECT p.name wName, b.bidValue wVal FROM bids b, players p WHERE b.bidValue>"+req.params.lbid+" and b.productId="+req.params.prdid+" and bids.auctionId="+req.params.auid;
    db.all(playerQuery, function(err, row) {
        console.log(row);
        res.json(row);
    }); 
});
restapi.post('/insertBid/:bidval/:pid/:userid/:auid', function(req, res){
    console.log(req.params.id);
    var date = Date.parse(new Date());
    db.run("INSERT into bids values ("+req.params.pid+","+req.params.bidval+","+req.params.userid+",'"+date+"',"+req.params.userid+")", function(err, row){
        if (err){
            console.log(err);
            res.status(500);
        }else {
            res.status(202);
        }
        res.end();
    });
})
restapi.listen(3000);

console.log("Submit GET or POST to http://localhost:3000/getAllProducts");