var express = require('express');
var geo = require('../routes/geo');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	var userName = "";
	var userId = 1;
	var isNOTAuthenticated = true;
	if (req.isAuthenticated()){
		userName = req.user.username;
		userId = req.user.id;
	}
	else {
		userName = "Example User";
	}
	
	if (req.isAuthenticated()) {
		isNOTAuthenticated = false;
	}

  res.render('index', { title: 'Climb Mapper', username: userName, isAuthenticated: req.isAuthenticated(), isNOTAuthenticated:isNOTAuthenticated, authenticatedUserId: userId });
});

router.get('/todoareas', geo.loadTodoAreas);
router.get('/tickareas', geo.loadTickAreas);
router.get('/crags', geo.loadCrags);
router.get('/areas', geo.loadAreas);
router.get('/todos', geo.loadToDos);
router.get('/ticks', geo.loadTicks);
router.get('/missingareas', geo.loadMissingAreas);

router.post('/submitarea', function(req, res) {	
	var parentArea;
	if(req.body.parentarea){
	 	parentArea = req.body.parentarea;
	}
	geo.persistarea(req.body.areaname, req.body.lat, req.body.lng, req.body.areatype, req.body.userid, parentArea, res)
});

router.post('/updatearea', function(req, res) {	
	var parentArea;
	if(req.body.parentarea){
	 	parentArea = req.body.parentarea;
	}
	geo.updatearea(req.body.areaid, req.body.areaname, req.body.lat, req.body.lng, req.body.areatype, req.body.userid, parentArea, res)
});


exports.users = require('./users');


module.exports = router;
