const task_list=document.getElementById("task-list");
const delete_box=document.querySelector(".delete-box");
const confirm_btn=document.getElementById('confirm-btn');
const unconfirm_btn=document.getElementById('unconfirm-btn');
const text_update=document.getElementById("text-form-update");
const start_date_update=document.getElementById("start-date-form-update");
const end_date_update=document.getElementById("end-date-form-update");
const level_update=document.getElementById("level-form-update");
const edite_box=document.querySelector('.edite-box');


async function get_data_api(){
    let res = await fetch('https://67e583ab18194932a5865f58.mockapi.io/api/task', {
        method: 'GET',
        headers: {'content-type':'application/json'},
        });
    if (res.ok){
        return res.json();
    }
}

async function get_task_data_api(id){
    let res = await fetch(`https://67e583ab18194932a5865f58.mockapi.io/api/task/${id}`, {
        method: 'GET',
        headers: {'content-type':'application/json'},
        });
    if (res.ok){
        return res.json();
    }
}
async function fetchData() {
    task_list.innerHTML='';

    let data = await get_data_api();
    data.forEach(element => {
        let new_li=document.createElement('li');
        let new_p=document.createElement('p');
        new_p.textContent=element.text;
        let new_div_btn=document.createElement('div');
        new_div_btn.classList.add('task-list-btn');
        let edite_btn=document.createElement("button");
        edite_btn.textContent='ویرایش';
        edite_btn.addEventListener("click",()=>edite_box_manager(element.id));
        edite_btn.classList.add('btn','edit-btn');
        let delete_btn=document.createElement("button");
        delete_btn.textContent='حذف';
        delete_btn.addEventListener("click",()=>delete_box_manager(element.id));
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
        fetchData();
    }
}
async function delete_box_manager(id) {
    delete_box.style.display = 'flex';
    document.getElementById('overlay').style.display = 'block';

    confirm_btn.addEventListener("click", async function () {
        await delete_task(id);
        delete_box.style.display = 'none';
        document.getElementById('overlay').style.display = 'none';
    });

    unconfirm_btn.addEventListener("click", function () {
        delete_box.style.display = 'none';
        document.getElementById('overlay').style.display = 'none';
    });
}
async function edite_box_manager(id){
    let data= await get_task_data_api(id);
    edite_box.style.display='block';
    document.getElementById('overlay').style.display = 'block';

    text_update.value=data.text;
    start_date_update.value=data.start_date;
    end_date_update.value=data.end_date;
    level_update.value=data.level;
    document.getElementById("update-form").addEventListener("submit",()=>update_task(data.id));
}
function cancel_update_box(){
    edite_box.style.display='none';
    document.getElementById('overlay').style.display = 'none';

}
async function apply_update(id,text,start_date,end_date,level){
    let res=await fetch(`https://67e583ab18194932a5865f58.mockapi.io/api/task/${id}`, {
        method: 'PUT', // or PATCH
        headers: {'content-type':'application/json'},
        body: JSON.stringify(
            {text:text,
            start_date:start_date,
            end_date:end_date,
            level:level }
            )
      });
      if (res.ok){
        fetchData();
      }
}
async function update_task(id){
    let text_update_value=text_update.value;
    let start_date_value=start_date_update.value;
    let end_date_value=end_date_update.value;
    let level_value=level_update.value;
    await apply_update(id,text_update_value,start_date_value,end_date_value,level_value);
    edite_box.style.display='none';
    document.getElementById('overlay').style.display = 'none';

}
fetchData();

document.querySelectorAll(".task-lists-btn").forEach(button=>
    button.addEventListener("click",function(){

        home_content.style.display="none";
        task_lists_content.style.display="flex";
        add_task_content.style.display='none';
        document.querySelectorAll('.s-i-1').forEach(item=>item.style.color="");
        document.querySelectorAll('.s-i-3').forEach(item=>item.style.color="");
        document.querySelectorAll('.s-i-2').forEach(item=>item.style.color="white");
        fetchData();
    })
);

