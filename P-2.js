/* 8 Xây dựng node server chỉ sử dụng core, 
sau khi gọi đến đường dẫn: POST /hello truyển vào body tham số “name” in ra được chữ “Hello ${name}“*/
const http = require("http")
const {parse} = require("querystring")

const server = http.createServer((req,res)=>{
    if(req.url=="/hello" && (req.method=="GET" || req.method=="POST")){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain')
        
        collectRequestData(req, reslut => {
            res.end(`hello ${reslut.name}`);
        })
    }else{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain')
        res.end('DEFAULT!\n')
    }
})

server.listen(3000, () => {
    console.log(`Server running at http://localhost:3000/`)
  })

function collectRequestData(request, callback) {
    let body='';
    request.on('data', chunk => {
        body += chunk.toString();
    });

    request.on('end', () => {
        callback(parse(body));
    })
}

/*
9 Xây dựng node server chỉ sử dụng core, kiểm tra tất cả các request đến nếu giá trị header 
“x-access-token” = “next-solutions” thì in ra chữ “Welcome” nếu không in ra chữ “Access Denied”
 */