
const checkPwd = async ()=>{

    let pwd = document.getElementById('passwd').value;
    //omzetten naar sha1 van wachtwoord
    let hash =  new Hashes.SHA1().hex(pwd); 
    //https get request uitvoeren
    const response = await fetch('https://api.pwnedpasswords.com/range/'+hash.substring(0,5))
    const data = await response.text();
    var array = data.split("\r\n");
    var suffix = hash.substring(5,40).toUpperCase();
    var count=0;
    for (var i = 0; i < array.length; i++) {
      let f = array[i].split(":");
      if (f[0]===suffix) {
        var b = parseInt(f[1]);
          count = count + b;
      }
    }
    let text="Amount of password breaches "+count+"\n";
    if (count<300) {
      alert(text+"It's safe enough");
    } else if (count>=300) {
      alert(text+"change your password, password is unsafe");
    }
   
  }

document.getElementById("submitbutton")
.addEventListener("click", checkPwd);