
document.querySelector('form').addEventListener('submit',async function(e){
    //prevents submit button from restarting page
    e.preventDefault();
    const title = document.getElementById('title').value
    const body = document.getElementById('description').value
    const labels = Array.from(document.getElementById('labelPicker').selectedOptions).map(option => option.value)
    console.log(labels)
    const response = await fetch('/submit-issue',{
        method: 'POST',
        headers: { 'Content-Type': `application/json` },
        body: JSON.stringify({ title, body, labels})
    })
    if(response.ok){
        document.getElementById('response').textContent = 'Success!';
    }
    else{document.getElementById('response').textContent = 'Error';}
})

document.addEventListener("DOMContentLoaded", function () {
    getLabels()
})


async function getLabels() {
    
    let labelPicker = document.getElementById('labelPicker');

    let response = await fetch('https://api.github.com/repos/Kroaxys/Website-To-Repo/labels');
    let labels = await response.json();
    labels.forEach(element => {
        let option = document.createElement('option');

        option.value = element.name
        option.textContent = element.name
        
        labelPicker.appendChild(option)
    });
}