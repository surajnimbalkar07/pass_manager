function maskPassword(pass){
    let data=localStorage.getItem("passwords")
    let arr=JSON.parse(data);
  //show password in * pattern in table
    let str=""
    for(let index=0;index<arr.length;index++){
        str+="*"
    }
    return str
}

//program to copy data from table
async function copyText(txt) {
    try {
        await navigator.clipboard.writeText(txt);
        document.getElementById("alert").style.display = "inline";
        setTimeout(() => {
            document.getElementById("alert").style.display = "none";
        }, 2000);
    } catch (error) {
        alert("Clipboard copying failed");
    }
}
// deleting password
const deletePassword = (website, username) => {
    let data = localStorage.getItem("passwords");
    let arr = JSON.parse(data);

    let arrUpdated = arr.filter((e) => {
        return !(e.website === website && e.username === username);
    });

    localStorage.setItem("passwords", JSON.stringify(arrUpdated));
    alert(`Successfully deleted ${username}'s password for ${website}`);
    showPasswords(); // Update the displayed passwords after deletion
};


const showPasswords=()=>{
    let website = document.getElementById("website");
    let username = document.getElementById("username");
    let password = document.getElementById("password");

    let tb=document.querySelector("table")
    let nData=document.querySelector("#nData")
    let data=localStorage.getItem("passwords")
    
    if(data==null||JSON.parse(data).length==0){
        nData.innerHTML ="No data to show"
        nData.style.color="red"
        tb.innerHTML=""

    }
    else{
        nData.innerHTML =""
        tb.innerHTML=`<tr>
        <th>Website</th>
        <th>Username</th>
        <th>Password</th>
        <th>Delete</th>
    </tr> 
  `
  let arr=JSON.parse(data);
  let str=""
  for(let index=0;index<arr.length;index++){
    const element=arr[index]

   
    str += `
    <tr>
        <td>${element.website} <img onclick="copyText('${element.website}')" src="copy.svg" width="10" height="10"></td>
        <td>${element.username}  <img onclick="copyText('${element.username}')" src="copy.svg" width="10" height="10"></td>
        <td>${maskPassword(element.password)}  <img onclick="copyText('${element.password}')" src="copy.svg" width="10" height="10"></td>
        <td><button class="btnsm" onclick="deletePassword('${element.website}', '${element.username}')">Delete</button></td>
    </tr>`;

}
tb.innerHTML=tb.innerHTML+str
  }
  website.value=""
  username.value=""
  password.value=""
 
    //it reset inputs of website username and password
}

showPasswords()

document.querySelector(".btn").addEventListener("click", (e) => {
    e.preventDefault();

    // Assuming you have an input field with the id "username" and "password"
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let website = document.getElementById("website").value;

    let storedPasswords = localStorage.getItem("passwords");
let msg=document.getElementById("msg")
    if (storedPasswords == null) {
        let json = [];
        json.push({website:website, username: username, password: password });
        msg.innerHTML="Password saved!!"
        setTimeout(() => {
            msg.innerHTML=""
        }, 2000);
        localStorage.setItem("passwords", JSON.stringify(json));
    } else {
        let json = JSON.parse(storedPasswords);
        json.push({website:website, username: username, password: password });
        msg.innerHTML="Password saved!!"
        setTimeout(() => {
            msg.innerHTML=""
        }, 2000);
        localStorage.setItem("passwords", JSON.stringify(json));
    }
    showPasswords()
});
document.querySelector('.burger').addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('active');
});
window.addEventListener('scroll', () => {
    document.querySelector('.nav-links').classList.remove('active');
});