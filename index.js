var express = require("express");
var app=express();
app.use(express.static("./public"));
// var bodyParser = require('body-parser');
// var multer  = require('multer');
var server = require('http').Server(app);
const io = require('socket.io')(server);
// var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.set("view engine","ejs"); // set tên template
app.set("views" , "./views");// link đường dẫn đến thư mục

server.listen(3000);


var arrayUser=[];

io.on("connection", function (socket) {
  console.log("co connect ma id = " + socket.id);

  socket.on("user-send-data",function (data) {
    if (arrayUser.indexOf(data)>=0) {
      socket.emit("server-send-fail");
    }else {
      arrayUser.push(data);// chen them user vao mang
      socket.emit("server-send-thanhcong", data);
      socket.Username=data;
      io.sockets.emit("server-send-full-data", arrayUser);
    }
  });
  socket.on("logout",function () {
    arrayUser.splice(
      arrayUser.indexOf(socket.Username),1
    );
    socket.broadcast.emit("server-send-full-data", arrayUser);
  });
  socket.on("user-send-meg",function (data) {
    io.sockets.emit("sever-send-all-meg",{name:socket.Username, meg:data})
  });
  socket.on("dang-go",function () {
  var writing = socket.Username + "dang go";
  io.sockets.emit("dang-go-chu", writing);
  });
  socket.on("ngung-go",function () {
      io.sockets.emit("ngung-go-chu");
  });
});

app.get('/trangchu',function (req,res) {
  res.render("trangchu");
})


// socket.on("disconnect",function () {
//   console.log(socket.id+ "da ngat ket noi");
// });
//
// socket.on("Client-send-data", function(data){
//   console.log(socket.id + " vua gui " + data);
//   // io.sockets.emit("Sever-send-data", data + "888"); gui cho nhieu nguoi ca minh
//   // socket.emit("Sever-send-data", data + "888");
//   socket.broadcast.emit("Sever-send-data", data + "888");
// });

//


// app.get("/hello", function (req, res){
//     res.send("<h1> heloo word </h1>");
// });
//
// app.get("/html", function (req, res){
//     res.sendFile(__dirname, "/test1.html");
// });
//
// app.get("/laybien/:id", function (req, res){
//  var id = req.params.id; // Lấy biết trên request
//  res.send("bien id " + id);
//
// });
//
// app.post("/laybienpost", urlencodedParser, function (req, res){
//     var u = req.body.username; // Lấy biết trên request
//     res.send("bien id " + u);
//
// });
// // cau hinh ejs
//
// app.set("view engine","ejs"); // set tên template
// app.set("views" , "./views");// link đường dẫn đến thư mục
//
// app.get("/testhtml",function (req  , res){
//     res.render("viewtest");
// })
//
// app.get("/thamso",function (req  , res){
//     res.render("thamso",{thamso:[1,2,3]});
// });
//
//
// // chon thư mục lưu trứ file
//  var storage = multer.diskStorage({
//      description : function (req, file, cb){
//          cb(null,'./upload')
//      },
//      filedname: function (req, file, cb){
//          cb(null,file.originalname)
//      }
//  })
//     var upload=multer({storage:storage})
//     app.post('/upload', upload.single("file"), function (req, res, next)
//     {
//     console.log(req.file)
//     res.send("thanh cong")
// })
//
//
// app.get("/upload",function (req  , res){
//     res.render("from");
// });
