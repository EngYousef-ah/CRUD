let title=document.getElementById('title');
let price=document.getElementById('price');
let taxes=document.getElementById('taxes');
let ads=document.getElementById('ads');
let discount=document.getElementById('discount');
let total=document.getElementById('total');
let count=document.getElementById('count');
let category=document.getElementById('category');
let submit=document.getElementById('submit');
let btnDeleteAll=document.getElementById('deleteALL');
let mood="Create";
let tmp;
let searchMood="title";

// function to get total.
function getTotal()
{
    if(price.value!=''){
        let result=(+price.value + +taxes.value + +ads.value)
        - +discount.value;
        total.innerHTML=result;
        total.style.background='#040';
    }
    else{
        total.innerHTML='';
        total.style.background='#a00d02';
    }
}

// function to create date and save it.
let dataProduct;
if(localStorage.Product!=null){
    dataProduct=JSON.parse(localStorage.Product);
}
else{
    dataProduct=[];    
}
submit.onclick=function(){
    let newDataProduct={
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase()
    }
    if(title.value!='' 
    &&price.value!=''
    &&category.value!=''
    &&newDataProduct.count<=100)
    {
        if(mood==='Create'){
            if(newDataProduct.count>1){
            for(let i=0;i<newDataProduct.count;i++)
            {
                dataProduct.push(newDataProduct); 
            }
        }
        else{
            dataProduct.push(newDataProduct);
        }
        clearData();
    }
        else
        {
            dataProduct[tmp]=newDataProduct;
            mood='Create';
            submit.innerHTML="Create";
            count.style.display="block";
        }

    }
    
    
    localStorage.setItem("Product" , JSON.stringify(dataProduct));
    showData()
}

//function to clear Data.
function clearData()
{
    title.value='';
    price.value='';
    taxes.value='';
    ads.value='';
    discount.value='';
    total.innerHTML='';
    count.value='';
    category.value='';
}

//function to show and read data to the user.
function showData()
{
    getTotal();
    let table='';
    for(let i=0;i<dataProduct.length;i++)
    {
        table+=
        `
        <tr>
            <td>${i+1}</td>
            <td>${dataProduct[i].title}</td>
            <td>${dataProduct[i].price}</td>
            <td>${dataProduct[i].taxes}</td>
            <td>${dataProduct[i].ads}</td>
            <td>${dataProduct[i].discount}</td>
            <td>${dataProduct[i].total}</td>
            <td>${dataProduct[i].category}</td>
            <td><button onclick="updataData(${i})" id="updata">updata</button></td>
            <td><button onclick="deleteData(${i})" id="delete">delete </button></td>
        </tr>
        `
    }
    document.getElementById('tbody').innerHTML=table;
    if(dataProduct.length>0){

        btnDeleteAll.innerHTML=`<button onclick="deleteAll()">delete All ${dataProduct.length}</button>`;
    }
    else{
        btnDeleteAll.innerHTML='';
    }

}
showData()

//function to deleteData.
function deleteData(i)
{
    dataProduct.splice(i,1);
    localStorage.Product=JSON.stringify(dataProduct);
    showData();
}

//function to deleteAll .
function deleteAll()
{
    localStorage.clear();
    dataProduct.splice(0);
    showData();
}

//function to updataData.
function updataData(i)
{
    title.value=dataProduct[i].title;
    price.value=dataProduct[i].price;
    taxes.value=dataProduct[i].taxes;
    ads.value=dataProduct[i].ads;
    discount.value=dataProduct[i].discount;
    getTotal();
    count.style.display="none";
    submit.innerHTML="updata";
    category.value=dataProduct[i].category;
    mood='updata'; 
    tmp=i;
    scroll({
        top :0,
        behavior:'smooth'
    }) 
}

//function to searchMood.
function getSearchMood(id)
{
    let search=document.getElementById('search');
    if(id=='searchTitle')
    {
        searchMood='Title';
    }
    else
    {
        searchMood='Category'
    }
    search.focus();
    search.placeholder=`Search By ${searchMood}`;
    search.value='';
    showData()
}

//function to searchData.
function searchData(value)
{
    let table='';
    for(let i=0;i<dataProduct.length;i++)
    {
        if(searchMood=='Title')
        {
            if(dataProduct[i].title.includes(value.toLowerCase()))
            {
                table+=
                    `
                    <tr>
                        <td>${i}</td>
                        <td>${dataProduct[i].title}</td>
                        <td>${dataProduct[i].price}</td>
                        <td>${dataProduct[i].taxes}</td>
                        <td>${dataProduct[i].ads}</td>
                        <td>${dataProduct[i].discount}</td>
                        <td>${dataProduct[i].total}</td>
                        <td>${dataProduct[i].category}</td>
                        <td><button onclick="updataData(${i})" id="updata">updata</button></td>
                        <td><button onclick="deleteData(${i})" id="delete">delete </button></td>
                    </tr>
                    `
            }
        }
        else
        {
            if(dataProduct[i].category.includes(value.toLowerCase()))
            {
                table+=
                    `
                    <tr>
                        <td>${i}</td>
                        <td>${dataProduct[i].title}</td>
                        <td>${dataProduct[i].price}</td>
                        <td>${dataProduct[i].taxes}</td>
                        <td>${dataProduct[i].ads}</td>
                        <td>${dataProduct[i].discount}</td>
                        <td>${dataProduct[i].total}</td>
                        <td>${dataProduct[i].category}</td>
                        <td><button onclick="updataData(${i})" id="updata">updata</button></td>
                        <td><button onclick="deleteData(${i})" id="delete">delete </button></td>
                    </tr>
                    `
            }

        }
    document.getElementById('tbody').innerHTML=table;
    }
}