
var socket = io();
// const socket = io('http://0.0.0.0:80')

socket.on('init', data =>{
    console.log(data);
})




fetch('https://13.214.167.91:80/api/products/get')
.then(response => response.json())
.then(data => makeTable(data.response))
.catch(error => console.log(`Oh no! ${error}`))


const makeTable = (results) => {
  console.log(results);
  const body = document.querySelector('tbody');
  results.forEach ((person, index) => {
    const htmlTemplate = `
    <tr class="person" id="person-${person._id}">
      <td>${person.name}</td>
      <td>${person.price}</td>
      <td >${person.category}</td>
      <td id="order-${person._id}">${person.status}</td>
      <td><button id="${person._id}" onclick="myFunction6(this.id)">Update Status (Socket)</button></td>
    </tr>
    `;
    body.innerHTML += htmlTemplate;
  })
  
}

function myFunction1() {
    document.getElementById("smallPrice").classList.toggle('hide');
    document.getElementById("smallPrice2").classList.add('hide');
    document.getElementById("smallPrice3").classList.add('hide');
    document.getElementById("smallPrice4").classList.add('hide');

  }

  function myFunction2() {
    document.getElementById("smallPrice2").classList.toggle('hide');
    document.getElementById("smallPrice").classList.add('hide');
    document.getElementById("smallPrice3").classList.add('hide');
    document.getElementById("smallPrice4").classList.add('hide');

  }

  function myFunction3() {
    document.getElementById("smallPrice3").classList.toggle('hide');
    document.getElementById("smallPrice2").classList.add('hide');
    document.getElementById("smallPrice").classList.add('hide');
    document.getElementById("smallPrice4").classList.add('hide');
  }

  function myFunction1API() {
    var status=document.getElementById("small1").value;
    const body = document.querySelector('tbody');
    body.innerHTML='';
    fetch('https://13.214.167.91:80/api/products/get?status='+status)
    .then(response => response.json())
    .then(data => makeTable(data.response))
    .catch(error => console.log(`Oh no! ${error}`))
  }

  function myFunction2API() {
    var category=document.getElementById("small2").value;
    const body = document.querySelector('tbody');
    body.innerHTML='';
    fetch('https://13.214.167.91:80/api/products/get?category='+category)
    .then(response => response.json())
    .then(data => makeTable(data.response))
    .catch(error => console.log(`Oh no! ${error}`))
  }

  function myFunction3API() {
    var category=document.getElementById("small3").value;
    var price=document.getElementById("small4").value;

    const body = document.querySelector('tbody');
    body.innerHTML='';
    fetch('https://13.214.167.91:80/api/products/get?category='+category+'&price='+price)
    .then(response => response.json())
    .then(data => makeTable(data.response))
    .catch(error => console.log(`Oh no! ${error}`))
  }
  
  function myFunction4() {


    document.getElementById("smallPrice4").classList.toggle('hide');
    document.getElementById("smallPrice2").classList.add('hide');
    document.getElementById("smallPrice3").classList.add('hide');
    document.getElementById("smallPrice").classList.add('hide');
  }

  

  function myFunction4API() {
    var name=document.getElementById("name").value;
    var price=document.getElementById("price").value;
    var category=document.getElementById("category").value;
    var status=document.getElementById("status").value;

    var data={
        name: name,
        price: price,
        category: category,
        status: status
    }
   
    fetch('https://13.214.167.91:80/api/products/store', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(response => {
      const body = document.querySelector('tbody');

      const htmlTemplate = `
      <tr class="person" id="person-${response.response._id}">
        <td>${response.response.name}</td>
        <td>${response.response.price}</td>
        <td >${response.response.category}</td>
        <td id="order-${response.response._id}">${response.response.status}</td>
        <td><button id="${response.response._id}" onclick="myFunction6(this.id)">Update Status (Socket)</button></td>
      </tr>
      `;
      body.innerHTML+=htmlTemplate;
      alert("Inserted successfully")
    } 
    )
    .catch(error => alert(`Oh no! ${error}`))
  }
  

  function myFunction5() {
    console.log("i am hitting");
    socket.emit('refresh','in refresh');
  }

  function update(id) {
    var status=document.getElementById("status_text-"+id); 
    console.log("i am update "+id+" and name is: "+status.value);
     socket.emit('update',{id: id, name: status.value});
  }

  function cancel(id,val) {
    // socket.emit('refresh','in refresh');
    console.log("i am cancel "+id+" and name is: "+val);
    var status=document.getElementById("order-"+id);  
    status.innerHTML=val;
  }

  function myFunction6(id) {

    var status=document.getElementById("order-"+id);  
    var status_data=status.innerHTML;
    if(status_data=="ordered"){
      status.innerHTML=`<input type='text' id='status_text-${id}' value='${status_data}'><button id="${id}" onclick="update(this.id)">Update</button><button id="${id}" onclick="cancel(this.id,'ordered')">Cancel</button>`
    }
    else if(status_data=="delivered"){
      status.innerHTML=`<input type='text' id='status_text-${id}' value='${status_data}'><button id="${id}" onclick="update(this.id)">Update</button><button id="${id}" onclick="cancel(this.id,'delivered')">Cancel</button>`
    }
    else{
      status.innerHTML=`<input type='text' id='status_text-${id}' value='${status_data}'><button id="${id}" onclick="update(this.id)">Update</button><button id="${id}" onclick="cancel(this.id,'canceled')">Cancel</button>`
    }
    // socket.emit('update',id);
    
  }

 


  socket.on('refresh2', data =>{
    const body = document.querySelector('tbody');
    body.innerHTML=''
    console.log(data);
    fetch('https://13.214.167.91:80/api/products/get')
    .then(response => response.json())
    .then(data => makeTable(data.response))
    .catch(error => console.log(`Oh no! ${error}`))
})

socket.on('update2', data2 =>{
  
  
  console.log("in update2 "+data2);
  var data={
    status: data2.name
  }

  fetch(`https://13.214.167.91:80/api/products/update/${data2.id}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(response => {
      var status=document.getElementById("order-"+data2.id);  
      status.innerHTML=data2.name;
      alert("Updated successfully")
    } 
    )
    .catch(error => alert(`Oh no! ${error}`))
})