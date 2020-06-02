window.addEventListener("load", add)

function add() {
    var submit = document.getElementById("form")
    submit.addEventListener("submit", auth)
}

var auth_customer_arr = [
    {
        user: "ritesh@gmail.com",
        pass: "12345"
    },
    {
        user: "ram@gmail.com",
        pass: "5500"
    }
]


var current_user = ""

function auth(elem) {
    elem.preventDefault()
    var user = document.getElementById("log").value
    var pass = document.getElementById("pass").value
    var flag = false
    for (var i = 0; i < auth_customer_arr.length; i++) {
        var x = auth_customer_arr[i]
        if (user == x.user && pass == x.pass) {
            current_user = x.user
            localStorage.setItem("user", x.user)
            window.location.replace("index.html")
            flag = true
        }
    }
    if (flag == false){
        alert("Wrong Credential")
    }
}