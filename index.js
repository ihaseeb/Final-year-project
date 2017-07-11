var Xray = require('x-ray');
var request = require('request');
var fs = require('fs');
var i = 0;
var x = new Xray();
var khaadi = [];
var amira= [];
var mongoose = require('mongoose');




//mongo connection
mongoose.connect('mongodb://localhost/kappas', {
  useMongoClient: true,
});
mongoose.Promise = global.Promise;
var db = mongoose.connection;

db.on('connect', () => {
	console.log('mongodb connected');
});

db.on('error', e => console.log('error', e));


//mongoose schema defined here
var kappasSchema = mongoose.Schema({
  id: Number,
	name: String,
	sale_price: String,
  original_price: String,
  sale: String,
  image: String

});

////////////////////////// Khaadi starts here....///////////////////////////////

// mongoose model for khaadi defined here
var khaadi = mongoose.model('khaadi', kappasSchema);

//xray scrapping for khaadi starts here
x('https://www.khaadionline.com/pk/sale.html', '.products_grid .product-grid',[{

  name:'.product-name a',
  sale_price:'.special-price .price',
  original_price:'.old-price .price',
  sale:'.imgContainer .badge',
  image:('.imgContainer .test img@src')

}])(function(error, khd){

if ( !error ) {

for(var i=0; i< khd.length; i++){

  var khaadidb = new khaadi({
    id:i+1,
    name: khd[i].name,
  	sale_price: khd[i].sale_price,
    original_price: khd[i].original_price,
    sale: khd[i].sale,
    image: khd[i].image
  });

  khaadidb.save((err, doc) => {
  	if (err) { console.log('err', err)}
  		else {
      }
});

}  //for loop end here
console.log('khaadi data saved to databse');

//drop database - following code is added to avoid duplicate data from scrapping
db.collection("khaadis").drop(function(err, delOK) {
    if (err) throw err;
    if (delOK) console.log("khaadi duplicate data deleted");
  });//drop database ends here

}//if(!error) ends here

else{
  console.log('Error found : ', error);
}
  }); // x inner ends


///////////////////////// Amir adnan starts here.../////////////////////////////


//mongoose model for amir-adnan defind here
var amir_adnan = mongoose.model('amir_adnan', kappasSchema);

x('http://www.amiradnan.com/shalwar-kameez-kurta-sale', '.products .col-md-3',[{
  name:'.product-name h4 a',
  sale_price:'.product-price .new_price',
  original_price:'.product-price .old_price',
  sale:'.product-img .percent',
  image:('.product-img img@src')
}])(function(error, result){
  if ( !error ) {

  for(var i=0; i< result.length; i++){

    var amir_adnandb = new amir_adnan({
      id:i+1,
      name: result[i].name,
    	sale_price: result[i].sale_price,
      original_price: result[i].original_price,
      sale: result[i].sale,
      image: result[i].image
    });

    amir_adnandb.save((err, doc) => {
    	if (err) { console.log('err', err)}
    		else {
        }
  });
  var j=i+1;
  if(j==result.length){
    console.log('i:'+ i + ' and result: '+ result.length );
  
  }

  }  //for loop end here
  console.log('Amir adnan data saved to database');

  //drop database - following code is added to avoid duplicate data from scrapping
  // if(db.collection('amir_adnans').find()=true){
  db.collection("amir_adnans").drop(function(err, delOK) {
      if (err) throw err;
      if (delOK) console.log("amir adnan duplicate data deleted");
    });//drop database ends here
  // }
  // else{
  //   console.log("no database exit atm");
  // }
  }//if(!error) ends here

  else{
    console.log('Error found : ', error);
  }
});



///////////////////////// Chinyere starts here...///////////////////////////////


// //mongoose model for chinyere defind here
// var chinyere = mongoose.model('chinyere', kappasSchema);
// x('http://chinyere.pk/collections/women-sale?page=1&take=48', '.container .row .hidden-xs h2.strong-header')(console.log);
// x.timeout(1)('http://chinyere.pk/collections/women-sale?page=1&take=48', 'section div.row div.col-xs-6',[{
//   name:'.shop-item .item-info-name-price a.ng-binding'
//   // sale_price:'.shop-item .item-info-name-price span .price',
//   // original_price:'.shop-item .item-info-name-price span .ng-binding',
//   // sale:'.shop-item span .sale-tag',
//   // image:('.shop-item .overlay-wrapper a .pro-img img@src')
// }])(function(error, chen){
//   if ( !error ) {
// console.log(chen.length);
//   for(var i=0; i< chen.length; i++){
//
//     var chinyeredb = new chinyere({
//       id:i+1,
//       name: chen[i].name,
//     	sale_price: chen[i].sale_price,
//       original_price: chen[i].original_price,
//       sale: chen[i].sale,
//       image: chen[i].image
//     });
//
//     chinyeredb.save((err, doc) => {
//     	if (err) { console.log('err', err)}
//     		else {
//         }
//   });
//
//   }  //for loop end here
//   console.log('chinyere data saved to database');
//
//   //drop database - following code is added to avoid duplicate data from scrapping
//   // db.collection("chinyeres").drop(function(err, delOK) {
//   //     if (err) throw err;
//   //     if (delOK) console.log("chinyere duplicate data deleted");
//   //   });//drop database ends here
//
//   }//if(!error) ends here
//
//   else{
//     console.log('Error found : ', error);
//   }
// });
