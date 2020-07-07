String.prototype.encore=function(){
    return ($text.base64Decode(this).split("").reverse().join(""))
    //return $text.base64Decode(this).split("").reverse().join("");
}