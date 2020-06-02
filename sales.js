window.addEventListener("load", add)

// adding EventListener to forms and display of current user

function add() {
    var name = document.getElementById("display_name")
    name.textContent = "Current User : " + localStorage.getItem("user")

    var addNewItem = document.getElementById("id_search_form")
    addNewItem.addEventListener("submit", search)

    var updateExistingItem = document.getElementById("sales_form")
    updateExistingItem.addEventListener("submit", updateSales)
}

// function for product id search

function search(elem) {
    elem.preventDefault()
    var target = document.querySelector(".id_search_div")
    var remove = document.getElementById("searchedId")
    if (remove != null){
        remove.remove()
    }
    var productName = document.getElementById("product_Name").value
    var productType = document.getElementById("product_type").value
    var data = localStorage.getItem("record")
    arr = JSON.parse(data) || []
    var flag = false
    var find = ""
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].productName == productName && arr[i].productType == productType) {
            flag = true
            find = arr[i]
        }
    }
    if (flag == true) {
        var h3 = document.createElement("h3")
        h3.setAttribute("id", "searchedId")
        h3.textContent = "Product Id is " + find.id
        target.append(h3)
    }
    else { alert("Product Not Found") }
}



// function for updating sales

function updateSales(elem) {
    elem.preventDefault()
    var productId = document.getElementById("product_id").value
    var quantity = document.getElementById("quantity").value
    var data = localStorage.getItem("record")

    arr = JSON.parse(data) || []
    var flag = false
    var item = ""
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].id == productId) {
            flag = true
            item = arr[i]
        }
    }
    if (flag == true) {
        if (item.quantity - quantity < 0) {
            alert("Not Enough Stock!")
        }
        else {
            item.quantity = item.quantity - quantity
            alert("Sales update sucessFully")
        }
    }
    else { alert("Product Not Found or Wrong Product Id") }

    var str = JSON.stringify(arr)

    localStorage.setItem("record", str)
}