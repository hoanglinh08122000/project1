var socket = io("http://localhost:3000");

socket.on("server-send-fail",function () {
  alert("Sai roi nhap lai");
});
socket.on("server-send-thanhcong",function (data) {
  $("#UserLogin").html(data);
  $("#Loginfrom").hide(2000);
  $("#Chatfrom").show(1000);
})
socket.on("server-send-full-data",function (data) {
  $("#boxUserLogin").html("");
  data.forEach(function(i) {
    $("#boxUserLogin").append("<div class='user'>" + i + "</div>");
  });

})
socket.on("sever-send-all-meg",function (data) {
  $("#Boxchat").append("<div class='ms'>"+ data.name +":"+ data.meg+"</div>");
});

socket.on("dang-go-chu", function (data) {
  $("#thongbao").html(data);
});
socket.on("ngung-go-chu", function (data) {
  $("#thongbao").html("");
});

$(document).ready(function () {
  $("#Loginfrom").show();
  $("#Chatfrom").hide();

  $("#btnRegister").click(function () {
    socket.emit("user-send-data",$("#txtUser").val());
  });

  $("#logout").click(function () {
    socket.emit("logout");
      $("#Chatfrom").hide(2000);
    $("#Loginfrom").show(1000);

  });

  $("#inputwrite").click(function () {
    socket.emit("user-send-meg",$("#writechat").val());
  });

  $("#writechat").focusin(function () {
    socket.emit("dang-go");
  });
  $("#writechat").focusout(function () {
    socket.emit("ngung-go");
  });

})
