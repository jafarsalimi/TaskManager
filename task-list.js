const task_list=document.getElementById("task-list");
const delete_box=document.querySelector(".delete-box");

async function get_data_api(){

    let res = await fetch('https://67e583ab18194932a5865f58.mockapi.io/api/task', {
        method: 'GET',
        headers: {'content-type':'application/json'},
        });
    if (res.ok){
        return res.json();
    }
        
}
async function fetchData() {
    let data = await get_data_api();

    data.forEach(element => {
        let new_li=document.createElement('li');
        let new_p=document.createElement('p');
        new_p.textContent=element.text;
        let new_div_btn=document.createElement('div');
        new_div_btn.classList.add('task-list-btn');
        let edite_btn=document.createElement("button");
        edite_btn.textContent='ویرایش';
        edite_btn.classList.add('btn','edit-btn');
        let delete_btn=document.createElement("button");
        delete_btn.textContent='حذف';
        delete_btn.addEventListener("click",()=>delete_task(element.id));
        delete_btn.classList.add('btn','delete-btn');
        new_li.appendChild(new_p);
        new_div_btn.appendChild(edite_btn);
        new_div_btn.appendChild(delete_btn);
        new_li.appendChild(new_div_btn);
        task_list.appendChild(new_li);


    });
}
async function delete_task(id){
    let res= await fetch(`https://67e583ab18194932a5865f58.mockapi.io/api/task/${id}`,{
        method:'DELETE',
    })
    if (res.ok){
        alert("تسک با موفقیت حذف گردید");
        task_list.innerHTML='';
        fetchData();
    }
}
// function delete_box_manager(id){
// }
fetchData();