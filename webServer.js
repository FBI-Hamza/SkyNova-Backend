const http = require("http");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://0.0.0.0:27017/cui")
  .then((db) => {
    console.log("Database connected successfully");

    
    http
      .createServer((req, res) => {
        if (req.url === "/" && req.method === "GET") {
          res.writeHead(200, { "Content-Type": "text/html" });
          res.write('<h1>Welcome to Home Screen</h1>')
          res.write("<a href='/show'>Show Record</a><br>")
          res.write("<a href='/add'>Add Record</a><br>")
          res.write("<a href='/edit'>Edit Record</a><br>")
          res.write("<a href='/delete'>Delete Record</a><br>")
          res.end();
        } 
        else if (req.url === "/show" && req.method === "GET") {
            res.writeHead(200, { "Content-Type": "text/html" });
            Student.find().exec().then(data => 
                {
                    res.end(data.toString())
                })
                .catch(err=> {
                    return err
                })
           
        } 
        else if (req.url === "/add" && req.method === "GET") {
            res.writeHead(200, { "Content-Type": "text/html" });

            Student.create({name : "Ali Haider", rollno : "BCS-022"}).then(data => 
                {
                    res.write("<h2>User has been created with following information : </h2>")
                    res.end(data.toString())
                })
                .catch((err)=> {
                    return err
                })
        } 
        else if (req.url === "/edit" && req.method === "GET") {
            res.writeHead(200, { "Content-Type": "text/html" });

            Student.findOneAndUpdate({name : "Ali Haider"},{rollno: "SP21-BCS-006"}).then(data => 
                {
                    res.write("<h2>User has been updateed successfully : </h2>")
                    res.end(data.toString())
                })
                .catch((err)=> {
                    return err
                })
        } 
        else if (req.url === "/delete" && req.method === "GET") {
            res.writeHead(200, { "Content-Type": "text/html" });

            Student.deleteMany({name : "Ali Haider"}).then(data => 
                {
                    res.write("<h2>User has been Deleted successfully : </h2>")
                    res.end(data.toString())
                })
                .catch((err)=> {
                    return err
                })
        } 
        else {
          res.writeHead(404);

          res.end("Page not found");
        }
      })
      .listen(8080);

    console.log("Server listening on port 8080");
  })
  .catch((err) => console.log(err));
