window.addEventListener("load", add)


// adding event on load of window


function add() {
    var name = document.getElementById("display_name")
    name.textContent = "Current User : " + localStorage.getItem("user")

    var addNewItem = document.getElementById("add_new_item")
    addNewItem.addEventListener("click", addForm)

    var updateExistingItem = document.getElementById("update_existing_item")
    updateExistingItem.addEventListener("click", addForm)

    var select = document.getElementById("search_type")
    select.addEventListener("change", addInput)
}

//adding manipulation form with respect to which button clicked in manipulation_div

function addForm(elem) {

    var target = document.getElementById("manipulation_div")

    // checking for previous added manipulation form

    var remove = document.querySelector(".manipulation_form")
    if (remove != null) {
        remove.remove()
    }

    var form = document.createElement("form")
    form.setAttribute("class", "manipulation_form")

    var productName = document.createElement("input")
    productName.setAttribute("placeholder", "Product Name")
    productName.setAttribute("id", "productName")
    productName.setAttribute("type", "text")

    var productType = document.createElement("input")
    productType.setAttribute("placeholder", "Product Type")
    productType.setAttribute("id", "productType")
    productType.setAttribute("type", "text")

    var quantity = document.createElement("input")
    quantity.setAttribute("placeholder", "Quantity")
    quantity.setAttribute("id", "quantity")
    quantity.setAttribute("type", "number")

    var submit = document.createElement("input")
    submit.setAttribute("type", "submit")

    if (elem.target.id == "add_new_item") {
        form.addEventListener("submit", addItem)
        submit.setAttribute("value", "Add Product")
    }
    else if (elem.target.id == "update_existing_item") {
        form.addEventListener("submit", updateRecord)
        submit.setAttribute("value", "Update Product")
    }

    form.append(productName, productType, quantity, submit)
    target.append(form)

}

// this is for keeping id refrence to add to new item added in the record
var ids = localStorage.getItem("idRef")
idNo = JSON.parse(ids) || 1001


// function for adding new product in the record

function addItem(elem) {
    elem.preventDefault()
    var productName = document.getElementById("productName").value
    var productType = document.getElementById("productType").value
    var quantity = document.getElementById("quantity").value
    if (productName == "") {
        alert("Give Atleast Product Name")
        return
    }
    var data = localStorage.getItem("record")

    arr = JSON.parse(data) || []


    /*if (arr != []){
        var idNo = arr[arr.length-1].id + 1
    }
    else {var idNo = 1001}*/

    var flag = false
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].productName == productName && arr[i].productType == productType) {
            flag = true
        }
    }
    if (flag == true) {
        alert("Product already exist")
    }
    else {
        var item = {
            id: idNo,
            productName: productName,
            productType: productType,
            quantity: quantity
        }
        idNo++
        arr.push(item)
        alert("Product Added Sucessfully")
    }


    var str = JSON.stringify(arr)

    var x = JSON.stringify(idNo)
    localStorage.setItem("record", str)
    localStorage.setItem("idRef", x)
    var remove = document.querySelector(".manipulation_form")
    remove.remove()
}

// function for updating product in the record

function updateRecord(elem) {
    elem.preventDefault()
    var productName = document.getElementById("productName").value
    var productType = document.getElementById("productType").value
    var quantity = document.getElementById("quantity").value
    var data = localStorage.getItem("record")

    arr = JSON.parse(data) || []
    var flag = false
    var item = ""
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].productName == productName && arr[i].productType == productType) {
            flag = true
            item = arr[i]
        }
    }
    if (flag == true) {
        item.quantity = quantity
        alert("Product updated Sucessfully")
    }
    else { alert("Product Not Found") }

    var str = JSON.stringify(arr)

    localStorage.setItem("record", str)
    var remove = document.querySelector(".manipulation_form")
    remove.remove()
}


//function for adding input tag with respect to option selected to search 

function addInput(elem) {

    var remove = document.getElementById("box")

    var target = document.getElementById("search")

    var ref = document.getElementById("search_submit")

    if(remove != null){
        if(remove.firstElementChild.id == "productId"){
            target.removeEventListener("submit", searchByID)
        }
        else{target.removeEventListener("submit", searchByName)}
        remove.remove()
    }

    var box = document.createElement("div")
    box.setAttribute("id" , "box")

    if (elem.target.value == "by_id") {
        var input = document.createElement("input")
        input.setAttribute("type", "text")
        input.setAttribute("placeholder", "Product ID")
        input.setAttribute("id", "productId")
        box.append(input)
        target.insertBefore(box, ref)
        target.addEventListener("submit", searchByID)
    }
    else if (elem.target.value == "by_name") {
        var input = document.createElement("input")
        input.setAttribute("type", "text")
        input.setAttribute("placeholder", "Product Name")
        input.setAttribute("id", "searchProductName")
        var input2 = document.createElement("input")
        input2.setAttribute("type", "text")
        input2.setAttribute("placeholder", "Product Type")
        input2.setAttribute("id", "searchproductType")
        box.append(input,input2)
        target.insertBefore(box, ref)
        target.addEventListener("submit", searchByName)
    }
}
//function for search product by id

function searchByID(elem) {
    elem.preventDefault()
    var target = document.getElementById("cont")
    target.innerHTML = ""
    var productId = document.getElementById("productId").value
    var data = localStorage.getItem("record")
    arr = JSON.parse(data) || []
    var flag = false
    var find = ""
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].id == productId) {
            flag = true
            find = arr[i]
        }
    }
    if (flag == true) {
        var h3 = document.createElement("h3")
        var p = document.createElement("p")
        h3.textContent = "Product Id is " + find.id
        p.textContent = "Product Name: " + find.productName + " || Product Type: " + find.productType + " || Product Quantity: " + find.quantity
        target.append(h3, p)
    }
    else {
        alert("Product Not Found")
    }

}


//function for search product by product name and type

function searchByName(elem) {
    elem.preventDefault()
    var target = document.getElementById("cont")
    target.innerHTML = ""
    var productName = document.getElementById("searchProductName").value
    var productType = document.getElementById("searchproductType").value
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
        var p = document.createElement("p")
        h3.textContent = "Product Id is " + find.id
        p.textContent = "Product Name: " + find.productName + " || Product Type: " + find.productType + " || Product Quantity: " + find.quantity
        target.append(h3, p)
    }
    else { alert("Product Not Found") }
}