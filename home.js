const calendor=document.querySelector(".calendor-container");
const home_content=document.querySelector(".home-content");
const task_lists_content=document.querySelector('.task-lists-content');
const add_task_content=document.querySelector(".add-task-content");
let now_month=new Date().getMonth();
let now_year=new Date().getFullYear();

let monthNames = [
    "ژانویه", "فوریه", "مارس", "آوریل", "مه", "ژوئن",
    "ژوئیه", "اوت", "سپتامبر", "اکتبر", "نوامبر", "دسامبر"
];
function get_frist_day_month(){
    let firstDayIndex = new Date(now_year, now_month, 1).getDay(); // روز هفته (0 = یکشنبه, 6 = شنبه)
    return firstDayIndex;
}
function display_calendor(){
    document.getElementById('month-title-text').textContent=monthNames[now_month];
    document.getElementById('year-title-text').textContent=now_year;

    let frist_day=get_frist_day_month();
    let end_day= new Date(now_year,now_month+1,0).getDate();
    for(let i=1;i<=end_day;i++){
        while(frist_day>0){
            let calendor_item=document.createElement("div");
            calendor_item.classList.add('calendor-item');
            calendor_item.textContent=" ";
            calendor.appendChild(calendor_item);
            frist_day--;
        }
        let calendor_item=document.createElement("div");
        calendor_item.classList.add('calendor-item');
        calendor_item.textContent=i;
        calendor.appendChild(calendor_item);
        let calendor_events=document.createElement("div");
        calendor_events.classList.add("calendor-item-event");
        calendor_events.textContent=i;
        calendor_item.appendChild(calendor_events);
    }
    const calendor_items = document.querySelectorAll(".calendor-item"); // گرفتن همه آیتم‌ها

    calendor_items.forEach(item => {
        const child = item.querySelector(".calendor-item-event"); // پیدا کردن فرزند داخل آیتم

        if (child) { // اطمینان از اینکه فرزند وجود دارد
            item.addEventListener("mouseover", () => {
                child.style.display = 'block'; // نمایش فرزند
            });

            item.addEventListener("mouseout", () => {
                child.style.display = 'none'; // مخفی کردن فرزند
            });
        }
    });
}

function change_calendor(m){
    if(m==1){
        now_month++;
        if (now_month>11){
            now_month=0;
            now_year++;

        }
    }
    else if(m==0){
        now_month--;
        if(now_month<0){
            now_month=11;
            now_year--;
        }
    }else if(m==3){
        now_year++;
    }
    else if(m==2){
        now_year--;
    }
    const remove_item=document.querySelectorAll(".calendor-item");
    remove_item.forEach(el=>el.remove());

    display_calendor();

}
display_calendor();
const icon_home_btn=document.querySelector('.s-i-1');
const icon_list_btn=document.getElementById('.s-i-2');

const icon_add_btn=document.querySelector('.s-i-3');
document.querySelectorAll(".home-btn").forEach(button=>
    button.addEventListener('click',function(){
        home_content.style.display="grid";
        task_lists_content.style.display="none";
        add_task_content.style.display="none";
        icon_home_btn.style.color="white";

        icon_add_btn.style.color="#234346";
    })
);

document.querySelectorAll(".add-task-btn").forEach(button=>
    button.addEventListener("click",function(){
        home_content.style.display='none';
        task_lists_content.style.display="none";
        add_task_content.style.display='flex';
        icon_home_btn.style.color="#234346";
        icon_add_btn.style.color="white";
    })
);



