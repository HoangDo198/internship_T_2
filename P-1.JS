//1 Viết code để tạo ra một mảng bao gồm 1000 phần tử là các số từ 0 đến 999(Coi đây là các giao dịch đang phát sinh trong hệ thống);
    var giaodich = [];
    var time=0;
    function insert()
    {
        for(var i =0; i<=10; i++)
        {
            giaodich[i]="id: "+i;
        }
    }

    function getgiaodich()
    {
        giaodich.forEach(function(item, index, array) {
            console.log(item,index);
        });
    }

    insert();
    // getgiaodich();
/*2 Viết hàm giả lập việc xử lý một giao dịch sẽ mất một khoảng thời gian 
random từ 100ms đến 1000ms sử dụng callback;*/
function xuly1(callback) {
    setTimeout(() => {
        giaodich.forEach(function(item,index,array){
            let gd_name=item;
            time= Math.floor(Math.random() * 900 ) + 100;
            callback(gd_name,time);
        })
    },time);
}


/* 3 Viết hàm giả lập việc xử lý một giao dịch sẽ mất một khoảng thời gian random 
từ 100ms đến 1000ms sử dụng promise;*/
function xuly2(){
   setTimeout(() => {
       giaodich.forEach((item,index,array)=>{
           let gd_name=item;
           time= Math.floor(Math.random() * 900 ) + 100;
            return new Promise((resolve, reject)=>{
               resolve("C3:Đã sử lý giao dịch: "+ gd_name + " thời gian xử lý:"+ time + "ms");
           }).then(str => {
               console.log(str);
           })
       })
   }, time);
}
/* 4 Viết hàm giả lập việc xử lý một giao dịch sẽ mất một khoảng thời gian random 
từ 100ms đến 1000ms sử dụng async function;*/
function xuly3(id){
   return new Promise((resolve, reject)=>{
        setTimeout(() => {
            giaodich.forEach((item,index,array)=>{
                if(index==id)
                {
                    let gd_name=item;
                    time= Math.floor(Math.random() * 900 ) + 100;
                    resolve("C4:Đã sử lý giao dịch: "+ gd_name + " thời gian xử lý:"+ time + "ms");
                }
            })
        }, time);
   })
}
async function xuly4 (){
        let xuly =  await xuly3(10);
        console.log(xuly);
    
};

/* 5 Viết hàm xử lý toàn bộ giro dịch trong mảng giao dịch trên với yêu cầu xử lý xong giao dịch thứ nhất mới đến giao dịch thứ 2… 
In ra “Đã xử lý giao dịch n” sau khi xử lý xong mỗi giao dịch và “DONE” khi xử lý xong toàn bộ.*/
function xuly5(){
    return new Promise((resolve, reject)=>{
        setTimeout(() => {
            let process= giaodich.shift();
            resolve("Đã xử Lý giao dịch: "+process);
        }, 1000);
    })
}

async function handling(){
    let result = await xuly5();
    console.log(result);
    if(giaodich.length!=0){
        return await handling();
    }else{
        return console.log("Done...")
    }
}
// handling();
/*6 Viết hàm xử lý toàn bộ giao dịch trong mảng giao dịch trên với yêu cầu 
trong một thời điểm chỉ xử lý tối đa 2 giao dịch.
In ra “Đã xử lý giao dịch n” sau khi xử lý xong mỗi giao dịch và “DONE” khi xử lý xong toàn bộ.
*/
const pipeline = 2;

const listOfargument = [];


for(let i = 0; i < pipeline; i++) {

    listOfargument.push(i);
}

console.log(listOfargument);

const asyncOperation = index => {
    
    return new Promise(resolve => {

        setTimeout(() => {
           
            console.log(`Promise ${index} đã sử lý giao dịch: ${giaodich.shift()}`);
            resolve(index);


        }, time);

    })

}

async function result () {

    const listOfPromise = listOfargument.map(asyncOperation);
    let kq = await Promise.all(listOfPromise);
    if(giaodich.length!=0) {

        time=Math.ceil(Math.random() * 9) * 1000;
        return await result();
    
    } else {
    
        console.log("Done...")
    }
}

result();
function main() {
    // xuly1((gd_name, time) => {
    //     console.log("C2:Đã sử lý giao dịch: "+ gd_name + " thời gian xử lý:"+ time + "ms");
    // });
    // xuly2();
    // xuly5((gd_name,time)=>{
    //     console.log("C5:Đã sử lý giao dịch: "+ gd_name + " thời gian xử lý:"+ time + "ms");
    // });
}


