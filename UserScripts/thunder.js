
var obj = $response.body;
var nor = {
        "status" : "STATUS_OK",
        "message" : "正常资源",
        "title" : ""
      }
// console.log(body.files)
obj.files.map((x) => x.audit = Object.create(nor))
body = JSON.stringify(obj);
$done({body});