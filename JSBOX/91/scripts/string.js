String.prototype.encore=function(){
    return $text.base64Decode([...this].reverse().join(""));
}