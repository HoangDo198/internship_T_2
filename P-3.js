/*
9 Xây dựng node server chỉ sử dụng core, kiểm tra tất cả các request đến nếu giá trị header 
“x-access-token” = “next-solutions” thì in ra chữ “Welcome” nếu không in ra chữ “Access Denied”
 */
const http = require("http");

const app = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/plain')
    if((req.method=="POST" || req.method=="GET") && req.headers["x-access-token"]=="next-solutions") {
        res.statusCode=200;
        res.end("Welcome");
        console.log(req.headers);
    } else {
        res.statusCode=404;
        res.end("Access Denied");
        console.log(req.headers);
    }
   

})

app.listen(8080,() => {
    console.log("server running port 8080!");
})