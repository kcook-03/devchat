
function opendiv(value, d){
    var div = document.getElementById(value);
    if(div.style.display == "block"){
        div.style.display = " none"
        if(d){
            d.parentElement.style.right = "0vw";
            d.parentElement.style.backgroundColor = "transparent";
            d.parentElement.style.color = "#474747";
            d.parentElement.innerHTML = `<i class="material-icons" onclick="opendiv('vertical', this)">menu</i>`
        }
    }else{
        div.style.display = "block";
        if(d){
            d.parentElement.style.right = "16vw";
            d.parentElement.style.backgroundColor = "darkslategrey";
            d.parentElement.style.color = "white";
            d.parentElement.innerHTML = `<i class="material-icons" onclick="opendiv('vertical', this)">close</i>`
        }
    }
}
function closediv(value){
    var div = document.getElementById(value);
    div.style.display = "none"
}
function openMany(div1, div2){
    opendiv(div1);
    closediv(div2)
}
var jobName = {
    elemType: "input",
    type: "text",
    placeholder: "Job name",
    class: "titleUpd jobName", 
} 
var numName = {
    elemType: "input",
    type: "number",
    placeholder: "Payment (USD)",
    class: "titleUpd numName"
}
var taskName = {
    elemType: "input",
    type: "text",
    placeholder: "Task name",
    class: "titleUpd taskName", 
} 
var taskDesc = {
    elemType: "input",
    type: "text",
    placeholder: "Description",
    class: "titleUpd taskDesc"
}
function createDiv(atts, prnt){
    var elem = document.createElement(atts.elemType);
    for(key in atts){
        if(key !== "elemType"){
            var att = document.createAttribute(key);
            att.value = atts[key];
            elem.setAttributeNode(att);
        }
    }
    document.getElementById(prnt).appendChild(elem)
}
function multiExec(function1, function2, function3){
    function1;
    function2;
    function3
}
function amalg(cls, cls2, id){
    var array = document.getElementsByClassName(cls);
    var array2 = document.getElementsByClassName(cls2);
    var input = document.getElementById(id);
    var jobs = [];
    for(var i = 0; i < array.length; i++){
        jobs.push({name:array[i].value, payment:array2[i].value})
    }
    input.value = JSON.stringify(jobs)
}
function amalg2(cls, cls2, id){
    var array = document.getElementsByClassName(cls);
    var array2 = document.getElementsByClassName(cls2);
    var input = document.getElementById(id);
    var jobs = [];
    for(var i = 0; i < array.length; i++){
        jobs.push({name:array[i].value, description:array2[i].value})
    }
    input.value = JSON.stringify(jobs)
}
function styleAtt(attribute, value){
    this.style[attribute] = value
}

