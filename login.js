// npm install express
// npm install express-session
// npm install mysql
// npm install body-parser
//mpn install jquery
//npm i jsdom
var PORT=3000;

var mySql=require('mysql');
var express=require('express');
var session=require('express-session');
var bodyParser=require('body-parser');
var path=require('path');
const router=express.Router();
const { JSDOM } = require( "jsdom" );
const { window } = new JSDOM( "" );
const $ = require( "jquery" )( window );


//połaczenie z bazą danych
var db=mySql.createConnection({
    host:'localhost',
    user:'root',
    password:'haselko',
    database:'users'
});
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Połączono z bazą danych');
});
global.db=db;

const app=express();

// informujemy express, że używamy jego pakietów
app.use(session({ //do sprawdzenia czy użytkownik jest zalogowany
    secret:'secret', //kod sesji do zarządzania w express
    resave:true,
    saveUninitialized:true
}));

//bodyParser wyodrębni dane z naszego fomularza z login.html
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

//żeby wczytało mi cssa
app.use(express.static(__dirname + '/'));

//wyświetlamy plik login.html klientowi(serwer mu ją wyśle)
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname+'/login.html'));
});

//obsługujemy POST dla formularza logowania, czyli dane wpisane przez użytkownijka do formularza
app.post('/auth',(req,res)=>{
    //hazwa i hasło z formularza
    let username=req.body.username;
    let password=req.body.password;

    //szukamy czy w bazie jset taki użytkownik
    if(username && password){
        db.query('SELECT * FROM Accounts WHERE username = ? AND password = ? ',[username,password],function(err,result,field){
                if(result.length>0){
                    //dwie zmienne sesyjne
                    req.session.loggedin=true; //czy klient zalogowany
                    req.session.username=username;
                    //jeśli wszystko pójdzie dobrze to przekierowujemy go do strony serwisu
                    res.redirect('./zadania.html');
    
                }else{
                    // if(err){
                    //     throw err;
                    // }
                    res.type('html');
                    res.send('Niepoprawna nazwa użytkownika lub hasło <br> <a href="../" style="text-decoration:none; background-color:lightgreen; color:red;">Powrót do logowania</a>');
                }
                res.end();
        });
    }
    else{
        res.type('html');
        res.send('Wpisz nazwę użytkownika i hasło!!! <br> <a href="../" style="text-decoration:none; background-color:lightgreen; color:red;">Powrót do logowania</a>');
        res.end();
    }

});


//obsługujemy POST dla formularza rejestracji, czyli dane wpisane przez użytkownika do formularza
app.post('/authRegistration',(req,res)=>{
    //hazwa i hasło z formularza
    let username=req.body.username;
    let password=req.body.password;
    let email=req.body.email;
    let passwordRepeat=req.body.passwordRepeat;

    if(passwordRepeat !== password){
        res.send(' Hasła muszą być jednakowe!!!');
        res.end();
        // setTimeout(() => {
        //     window.location = "/login.html";
        //  }, 5000)
        res.redirect('./login.html');
    }
    

    //szukamy czy w bazie jset taki użytkownik
    if(username && password && email &&  passwordRepeat){
        db.query(`INSERT INTO Accounts(username,password,email) VALUES (?,?,?)`,[username,password,email],function(err,result,field){
                if(!err){
                    res.type('html');
                    res.send('Udalo sie poprawnie zarejstrować!!! <br> <a href="../" style="text-decoration:none; background-color:lightgreen; color:red;">Powrót do logowania</a>');
                    res.end();
                }else{
                    console.log(result,username,password,email,passwordRepeat);
                    res.type('html');
                    res.send('Niepoprawnie wpisane dane <br> <a href="../rejestracja.html" style="text-decoration:none; background-color:lightgreen; color:red;">Powrót do rejestracji</a>');
                    throw err;
                }
                res.end();
        });
    }
    else{
        res.type('html');
        res.send('Wpisz dane we wszystkich wymaganych polach!!! <br> <a href="../rejestracja.html" style="text-decoration:none; background-color:lightgreen; color:red;">Powrót do rejestracji</a>');
        res.end();
    }

});

let nameOfTask='';

app.post('/addTaskAuth',(req,res)=>{
    
        let titleName=req.body.inputTitle;
        let dateAdded=req.body.inputDate;
        let client=req.body.inputClientName;
        let technicNR=req.body.inputState;
        let description=req.body.inputDescription;

        // console.log(titleName,dateAdded,client,technicNR,description);

        db.query(`INSERT INTO tasks(task,dataDodania,opis,klient,id_technika) VALUES(?,?,?,?,?)`,[titleName,dateAdded,description,client,technicNR],(err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            console.log('jest git');
            res.end()
            //  res.redirect('/zadania.html')
        });
        
        
        
        // res.type('html')
        // res.send($('.tasksWrap').find('tbody').append("<td>"+nameOfTask+ "</td>").toString());
        // res.end(); 

        // res.render('email',()=>{ title: 'Express' })
        // for(item in name){
            
        // }
        
    

    // //szukamy czy w bazie jset taki użytkownik
    // if(username && password && email &&  passwordRepeat){
    //     db.query(`INSERT INTO Accounts(username,password,email) VALUES (?,?,?)`,[username,password,email],function(err,result,field){
    //             if(!err){
    //                 res.type('html');
    //                 res.send('Udalo sie poprawnie zarejstrować!!! <br> <a href="../" style="text-decoration:none; background-color:lightgreen; color:red;">Powrót do logowania</a>');
    //                 res.end();
    //             }else{
    //                 console.log(result,username,password,email,passwordRepeat);
    //                 res.type('html');
    //                 res.send('Niepoprawnie wpisane dane <br> <a href="../rejestracja.html" style="text-decoration:none; background-color:lightgreen; color:red;">Powrót do rejestracji</a>');
    //                 throw err;
    //             }
    //             res.end();
    //     });
    // }
    // else{
    //     res.type('html');
    //     res.send('Wpisz dane we wszystkich wymaganych polach!!! <br> <a href="../rejestracja.html" style="text-decoration:none; background-color:lightgreen; color:red;">Powrót do rejestracji</a>');
    //     res.end();
    // }

});
app.get('/zadania.html',(req,res)=>{
    console.log('jestem t');
    let name=db.query('SELECT task from tasks limit 1',(err,result)=>{
        // console.log(result[0].task);
        nameOfTask=result[0].task;
        console.log("\nNazwa zadania1"+nameOfTask);
        // var pendingHtml = elements.map(function (elem) {
        //     return elem.getInnerHtml();
        // });
        res.sendFile(__dirname + "/zadania.html", {h1:nameOfTask});

    });
    

    console.log("\nNazwa zadania2"+nameOfTask);

})

// exports.nameOfTask=nameOfTask
// app.get('/zadania.html', function(req, res) {
//     console.log("\nnazwa zadania3"+nameOfTask);
    
  
//   });
// const button=document.querySelector('#eventEditSubmit');
// button.addEventListener('click',()=>{
    
// });

// console.log(nameOfTask);
// $('.tasksWrap').find('tbody').append("<td>"+nameOfTask+ "</td>");

app.get('/rejestracja.html',(req,res)=>{
    res.sendFile(path.join(__dirname+'/rejestracja.html'));
});

app.get('/zadania.html',(req,res)=>{
    res.sendFile(path.join(__dirname+'/zadania.html'));
});

//nasłuchujemy na porcie 3000
app.listen(PORT, ()=>{console.log(`Nasłuchuje na porcie ${PORT}....`);});