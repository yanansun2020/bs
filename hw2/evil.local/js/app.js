// PLEASE NOTE: IT IS TRIVIAL TO REVERSE THIS ENCRYPTION TO GET THE FLAG
// IT MAY BE TEMPTING TO REVERSE THIS AND JUST SUBMIT THE FLAG
// HOWEVER, DOING SO WILL NOT NET YOU ANY POINTS
// YOU STILL NEED TO DO THE XSS AND SHOW US THE PAYLOAD IN THE WRITEUP!

f = [36, 33, 45, 39, 45, 110, 116, 121, 121, 74, 108, 37, 96, 103, 74, 119, 84, 102, 38, 74, 96, 103, 124, 74, 116, 103, 38, 74, 119, 112, 89, 37, 123, 114, 74, 97, 37, 74, 96, 32, 104]
p = "";

f.forEach((c) => {
    p += (String.fromCharCode(c ^ 0x15));
});

o = window.alert;

window.alert = function(a){
    document.getElementById('flag').innerText = p;
    o(a);
}