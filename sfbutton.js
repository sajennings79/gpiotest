var GPIO = require('onoff').Gpio,
    http = require('http'),
    led = new GPIO(16,'out'),
    button = new GPIO(17,'in','both');

http.createServer(function (req, res) {
  res.setHeader('Content-Type', 'text/html');
  res.write('<pre>hey push the button:\n');
}).listen(8080);


function light(err,state){
  console.log('.. light()');
  console.log('.. state = ' +state);

  if(state == 1){
    led.writeSync(1);
    var jsforce = require('jsforce');
    var conn = new jsforce.Connection();
    conn.login('witripi@wiredtriangle.com', '3diamondpcSEtgxcxOTspddHYwPJ0iei', function(err, res) {
    if (err) { return console.error(err); }
    // conn.query('SELECT Id, Name FROM Account', function(err, res) {
    // if (err) { return console.error(err); }
    // console.log(res);
    conn.sobject("Button__c").create({ Source__c : 'witripi' }, function(err, ret) {
    if (err || !ret.success) { return console.error(err, ret); }
    console.log("Created record id : " + ret.id);

  });
});
	
  } else {
    led.writeSync(0);
  }
}

console.log('onoff running');

button.watch(light);
