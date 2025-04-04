function add_new_task(text,start_date,end_date,level){
    const newTask = {
        text: text,
        start_date: start_date,
        end_date: end_date,
        status : "انجام نشده",
        level: level
    };
      
    fetch('https://67e583ab18194932a5865f58.mockapi.io/api/task', {
        method: 'POST',
        headers: {'content-type':'application/json'},
        body: JSON.stringify(newTask)
    }).then(res => {
    if (res.ok) {
        return res.json();
    }
    }).then(task => {
    }).catch(error => {
    })
}



document.getElementById("add-task-form").addEventListener('submit',function(event){
    event.preventDefault();
    let text_new=document.getElementById('text-form').value;
    let start_date_new=document.getElementById("start-date-form").value;
    let end_date_new=document.getElementById("end-date-form").value;
    let level_new=document.getElementById('level-form').value;
    add_new_task(text_new,start_date_new,end_date_new,level_new);
    alert("ok");
    document.getElementById("add-task-form").reset();

});