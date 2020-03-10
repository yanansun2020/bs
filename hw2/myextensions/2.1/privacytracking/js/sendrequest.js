function send(parameter) {
    $.ajax({
        url:"http://localhost:3000/sync",
        type:"POST",
        data:JSON.stringify(parameter),
        contentType:"application/json; charset=utf-8",
        dataType:"json",
        success: function(){
        }
    });
}