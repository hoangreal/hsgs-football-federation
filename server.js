var express = require("express");
var app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views","./views");
app.listen(process.env.PORT || 3000);

var pg= require("pg");
var config = {
	user: 'ppdjjgvntwimey',
	database: 'd1m2iuggbpaqtr',
	password: 'ed63124a3c0f0e881e85167b8f97a5e3f15668988dd031190d35287922c9f25b',
	host: 'ec2-107-22-162-82.compute-1.amazonaws.com',
	port: 5432,
	max:10,
	idleTimeoutMillis: 30000,
};

var pool = new pg.Pool(config);

app.get("/",function(req,res){
	res.render("HFF.ejs");
});

app.get("/HFF",function(req,res){
	res.render("HFF.ejs");
});

app.get("/tin-tuc", function(req,res){
	pool.connect(function(err,client,done){
		if(err){
			return console.error('error fetching client from pool', err);
		}
		client.query('SELECT * from news order by id asc', function(err,result){
			done();

			if (err) {
				res.end();
				return console.error('error running program', err);
			}
			res.render("News.ejs", {data:result});
		});
	});
});

app.get("/tin-tuc::id", function(req,res){
	pool.connect(function(err,client,done){
		if(err){
			return console.error('error fetching client from pool', err);
		}
	var i = req.params.id;
		client.query('SELECT * from news where id='+i, function(err,result){
			done();

			if (err) {
				res.end();
				return console.error('error running program', err);
			}
			res.render("new_details.ejs", {data:result});
		});
	});
});

app.get("/information", function(req,res){
	pool.connect(function(err,client,done){
		if(err){
			return console.error('error fetching client from pool', err);
		}
		client.query('SELECT * from information order by id asc', function(err,result){
			done();

			if (err) {
				res.end();
				return console.error('error running program', err);
			}
			res.render("Information.ejs", {data:result});
		});
	});
});

app.get("/video", function(req,res){
	pool.connect(function(err,client,done){
		if(err){
			return console.error('error fetching client from pool', err);
		}
		client.query('SELECT * from video order by id asc', function(err,result){
			done();

			if (err) {
				res.end();
				return console.error('error running program', err);
			}
			res.render("video.ejs", {data:result});
		});
	});
});

app.get("/video::id", function(req,res){
	pool.connect(function(err,client,done){
		if(err){
			return console.error('error fetching client from pool', err);
		}
	var i = req.params.id;
		client.query('SELECT * from video where id='+i, function(err,result){
			done();

			if (err) {
				res.end();
				return console.error('error running program', err);
			}
			res.render("video_details.ejs", {data:result});
		});
	});
});