const allForms = document.getElementById('allForms');
const oForms = document.forms;
const REGEX = /^[A-Za-z]*\s{1}[A-Za-z]*$/
const now = new Date();
const nowDate = JSON.stringify(now)
// const formHTML = `
//     <div class="aForm">
//         <span id="error${oForms.length}" style="color:#e91e63"></span>
//         <form>
//             <span>${oForms.length+1}.</span>
//             <div class="aFormInputs">
//                 <div class="aFormName">
//                     <label for="name">Name:</label>
//                     <input type="text" name="name">
//                 </div>
//                 <div class="aFormAddress">
//                     <label for="address">Address:</label>
//                     <input type="text" name="address">
//                 </div>
//             </div>
//         </form>
//         <button type="button" onclick="deleteForm(${oForms.length})">delete</button>
//     </div>
// `

function collectData(){
    const people = []
    for(let i = 0; i<oForms.length; i++){
        const person = {
            "name": oForms[i].elements["name"].value,
            "address": oForms[i].elements["address"].value
        }
        console.log("Person:", person)
        people.push(person)
    }
    console.log("People:", people)
    return people
}

function openFile() {
    const [file] = document.querySelector('input[type=file]').files;
    const reader = new FileReader();
    let data = [{}]
    reader.addEventListener("load", () => {
        data = JSON.parse(reader.result)
        console.log("data from text:", data)
        populateForm(data);
    }, false);
  
    if (file) {
      reader.readAsText(file);
    }
}

function populateForm(data){
    if(oForms.length>0){
        const people = collectData()
        for(let i=0;i<people.length;i++){
            let person = {
                "name": people[i].name,
                "address": people[i].address
            }
            data.push(person)
        }
    }
    console.log("From popf:", data.length)

    for(let i=oForms.length; i<=data.length-1; i++){
        allForms.innerHTML += `
            <div class="aForm">
                <span id="error${oForms.length}" style="color:#e91e63"></span>
                <form>
                    <span>${oForms.length+1}.</span>
                    <div class="aFormInputs">
                        <div class="aFormName">
                            <label for="name">Name:</label>
                            <input type="text" name="name" value="${data[i].name}">
                        </div>
                        <div class="aFormAddress">
                            <label for="address">Address:</label>
                            <input type="text" name="address" value="${data[i].address}">
                        </div>
                    </div>
                </form>
                <button type="button" onclick="deleteForm(${oForms.length})">delete</button>
            </div>
        `
    }
    for(let i = 0; i<oForms.length-1; i++){
        oForms[i].elements["name"].value = data[i].name;
        oForms[i].elements["address"].value = data[i].address;
    }
}

function addForm(){
    console.log(document.forms)
    const people = [];
    for(let i = 0; i<oForms.length; i++){
        const person = {
            "name": oForms[i].elements["name"].value,
            "address": oForms[i].elements["address"].value
        }
        console.log("Person:", person)
        people.push(person)
        console.log(people[0].name[0])
    }
    console.log("People:", people)
    allForms.innerHTML += `
        <div class="aForm">
            <span id="error${oForms.length}" style="color:#e91e63"></span>
            <form>
                <span>${oForms.length+1}.</span>
                <div class="aFormInputs">
                    <div class="aFormName">
                        <label for="name">Name:</label>
                        <input type="text" name="name">
                    </div>
                    <div class="aFormAddress">
                        <label for="address">Address:</label>
                        <input type="text" name="address">
                    </div>
                </div>
            </form>
            <button type="button" onclick="deleteForm(${oForms.length})">delete</button>
        </div>
    `
    for(let i = 0; i<oForms.length-1; i++){
        oForms[i].elements["name"].value = people[i].name;
        oForms[i].elements["address"].value = people[i].address;
    }
}

function deleteForm(index){
    const people = collectData();
    const arr = [];
    console.log("Delete Form: ",people)
    console.log(people[index])
    for(let i = 0; i < people.length; i++){
        if(i!=index){
            arr.push(people[i])
        }
    }
    allForms.innerHTML = ``
    for(let i =0; i<arr.length; i++){
        allForms.innerHTML += `
            <div class="aForm">
                <span id="error${oForms.length}" style="color:#e91e63"></span>
                <form>
                    <span>${oForms.length+1}.</span>
                    <div class="aFormInputs">
                        <div class="aFormName">
                            <label for="name">Name:</label>
                            <input type="text" name="name" value="${arr[i].name}">
                        </div>
                        <div class="aFormAddress">
                            <label for="address">Address:</label>
                            <input type="text" name="address" value="${arr[i].address}">
                        </div>
                    </div>
                </form>
                <button type="button" onclick="deleteForm(${oForms.length})">delete</button>
            </div>
        `
    }
    console.log(arr)
    // location.reload()
}

function validations(){
    // Collects form data
    const people = collectData()

    // Validations
    let validForm = true
    for(let i=0; i<people.length; i++){
        const errorName = document.getElementById(`error${i}`);
        errorName.innerHTML = "" 

        // removing empty spaces from back and front of input string
        if(people[i].name[0]==" "){
            let str = people[i].name.split("")
            str[0] = ""
            people[i].name = str.join("")
        }
        const nameLength = people[i].name.length
        if(people[i].name[nameLength-1]==" "){
            let str = people[i].name.split("")
            str[nameLength-1] = ""
            people[i].name = str.join("")
        } 

        // checking minimum characters
        if(people[i].name.length<=1){
            // const errorName = document.getElementById(`error${i}`);
            errorName.innerHTML += `Name must be at least 2 characters. `;
            validForm = false
        }
        // checking correct format
        if(!people[i].name.match(REGEX)){
            // const errorName = document.getElementById(`error${i}`);
            errorName.innerHTML += `Please type full name.</br> No special characters in name allowed. `;
            validForm = false
        }
        if(validForm == false){
            validForm = false
        }
        else{
            validForm = true
        }
    }
    return validForm
}
function submit(){
    const people = collectData()
    console.log(people)
    if(validations() == false){
        return
    }
    if(validations() == true){
        const data = JSON.stringify(people);
        var a = document.createElement("a");
        a.href = window.URL.createObjectURL(new Blob([data], {type: "text/plain"}));
        a.download = `demo${nowDate}.txt`
        a.click();
        location.reload()
    }      
}