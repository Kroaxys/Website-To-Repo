document.querySelector('form').addEventListener('submit',async function(e){
    //prevents submit button from restarting page
    e.preventDefault();
    const title = document.getElementById('title').value
    const body = document.getElementById('description').value

    const response = await fetch('/submit-issue',{
        method: 'POST',
        headers: { 'Content-Type': `application/json` },
        body: JSON.stringify({ title, body })
    })
    if(response.ok){
        document.getElementById('response').textContent = 'Success!';
    }
    else{document.getElementById('response').textContent = 'Error';}
})