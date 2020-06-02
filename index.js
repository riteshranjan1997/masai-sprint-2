window.addEventListener("load", display)

// display the user which is logged in and all notification of stock less than 8 unit


function display() {
    startTime()
    var name = document.getElementById("display_name")
    name.textContent = "Current User : " + localStorage.getItem("user")


    var target = document.getElementById("note")
    var div = document.createElement("div")
    div.style.display = "flex"
    div.style.flexDirection = "column"
    var data = localStorage.getItem("record")

    arr = JSON.parse(data) || []
    var flag = false
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].quantity < 8) {
            var item = document.createElement("div")
            var h3 = document.createElement("h3")
            h3.textContent = arr[i].productName
            var p = document.createElement("p")
            p.style.color = "red"
            p.textContent = "only " + arr[i].quantity + " unit are left"
            item.append(h3, p)
            div.append(item)
            flag = true
        }
    }

    if (flag == false){
        var h3 = document.createElement("h3")
        h3.textContent = "All Stocks Are Updated"
        h3.style.color = "green"
        h3.style.textAlign = "center"
        div.append(h3)
        }
    target.append(div)
}

function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.querySelector('.clock').innerHTML = "Time : "+h + ":" + m + ":" + s;
    var t = setTimeout(startTime, 500);
  }
  function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
  }