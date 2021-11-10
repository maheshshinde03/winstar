const mysql = require('mysql2');
const express = require('express');
const upload = require('express-fileupload');
var app = express();

app.use(upload());
const cors = require("cors");
const bodyparser = require('body-parser');
const Sequelize = require("sequelize");

app.use(bodyparser.json());

// const db = {};

// db.Sequelize = Sequelize;
// db.sequelize = sequelize;

// db.products = require("./tutorial.model.js")(sequelize, Sequelize);

// module.exports = db;

// var corsOptions = {
//     origin: "http://localhost:3000"
//   };

app.use(cors());

//app.use(Sequelize());

var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'win_star_main',
    multipleStatements: true
});

mysqlConnection.connect((err) => {
    if (!err)
        console.log('DB connection succeded.');
    else
        console.log('DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
});


app.listen(3000, () => console.log('Express server is runnig at port no : 3000'));

//install nodemon to avoid start index.js again and again



app.get('/get_current_game_time', (req, res) => {   
    //var status='F';
    mysqlConnection.query('SELECT date_time FROM game_master ORDER BY game_id DESC LIMIT 1', (err, rows, fields) => {
        if (!err)

            res.send(rows);  
        else
            console.log(err);
    })
});

app.post('/userlogin', (req, res)=>{
    var status = 'T';
    mysqlConnection.query('SELECT * FROM franchises_master WHERE fran_userid=? AND password=? AND is_aprroved=?',[req.body.fran_userid,req.body.password,status],(err, rows, fields) =>{
        if(!err)
         res.send(rows);
        else
        console.log(err);
    })
});

app.post('/registration', (req, res)=>{
    let business_name = req.body.business_name.charAt(0).toUpperCase() + req.body.business_name.slice(1);
    let first_name = req.body.first_name.charAt(0).toUpperCase() + req.body.first_name.slice(1);
    let last_name = req.body.last_name.charAt(0).toUpperCase() + req.body.last_name.slice(1);
    let business_add = req.body.business_add.charAt(0).toUpperCase() + req.body.business_add.slice(1);
    // console.log(b_name);
    mysqlConnection.query('INSERT INTO register_temp(business_name,fran_userid,first_name,last_name,mobile,business_address,email,password) VALUES(?,?,?,?,?,?,?,?)',[business_name,req.body.user_name,first_name,last_name,req.body.mobile,business_add,req.body.email,req.body.password],(err, rows, fields) =>{
        console.log(req.body.user_name)
        if(!err)
        res.status(200).json({status:"ok"})
        else
        console.log(err);
    })
});

app.get('/validate_username/:username', (req, res ,next)=>{
    mysqlConnection.query('SELECT *  FROM franchises_master WHERE `fran_userid`=?',[req.params.username], (err, rows, fields) =>{
        // console.log(req.params.username);
        // console.log(rows);
        if(rows)
        {
            
            res.send(rows);  
            console.log(rows);
        }

        else{
            console.log(err);
        }
    })
});

app.get('/getfranchises_info/:id', (req, res) => {     
    mysqlConnection.query('SELECT * FROM franchises_master WHERE `fran_id`=?',[req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows); 
        else
            console.log(err);
    })
});

app.get('/getbankdetails/:id', (req, res) => {   

    mysqlConnection.query('SELECT * FROM bank_details WHERE `fran_id`=?',[req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);   
        else
            console.log(err);
    })
});


app.get('/company_master', (req, res) => {   

    mysqlConnection.query('SELECT * FROM `company_master`', (err, rows, fields) => {
        if (!err)
            res.send(rows);   
        else
            console.log(err);
    })
});

app.put('/update_franchise/:id', (req, res) => {     
   
    mysqlConnection.query('UPDATE `franchises_master` SET `business_name`=?,`first_name`=?,`last_name`=?, `mobile`=?, `alt_mobile`=?, `email`=?, `business_category`=?,`business_address`=?,`city`=?,`pin_code`=?,`landmark`=? where `fran_id`=?',[req.body.business_name,req.body.first_name, req.body.last_name, req.body.mobile,req.body.alt_mobile,req.body.email,req.body.business_category,req.body.business_address,req.body.city,req.body.pin_code,req.body.landmark, req.params.id], (err, rows, fields) => {
        if (!err)
          res.status(200).json({status:"ok"})
        else
            console.log(err);
    })
});

app.put('/update_franchise_bank/:id', (req, res) => {     
   
    mysqlConnection.query('UPDATE `bank_details` SET `account_name`=?,`account_no`=?,`bank_name`=?, `ifsc_code`=?, `branch_name`=?,`bank_city`=?,`account_type`=? where `fran_id`=?',[req.body.account_name,req.body.account_no, req.body.bank_name, req.body.ifsc_code,req.body.branch_name,req.body.bank_city,req.body.account_type, req.params.id], (err, rows, fields) => {
        if (!err)
        res.status(200).json({status:"ok"})
        else
            console.log(err);
    })
});

app.put('/changepass/:id', (req, res) => {     
 
    mysqlConnection.query('UPDATE `franchises_master` SET `password`=? WHERE `fran_id`=?',[ req.body.change_pass, req.params.id], (err, rows, fields) => {
        if (!err)
        res.status(200).json({status:"ok"})
        else
            console.log(err);
    })
});

app.get('/get_notifications/:id', (req, res) => { 
    mysqlConnection.query('SELECT fran_userid FROM franchises_master WHERE `fran_id`=?',[req.params.id], (err, rows, fields) => {   
        if (!err)
        var to = rows[0].fran_userid;

    mysqlConnection.query('SELECT * FROM notifications WHERE `to`=? OR `to_all`=? ORDER BY date_time DESC',[to, 'T'], (err, rows, fields) => {
        if (!err)
            res.send(rows);   
        else
            console.log(err);
    })
})
});

app.get('/notification_detail/:id', (req, res) => {     

    mysqlConnection.query('SELECT * FROM notifications WHERE `id`=?',[req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);   
        else
            console.log(err);
    })
});

app.get('/update_notification_flag/:id', (req, res) => {     
    var status  = 'T';
    mysqlConnection.query('UPDATE `notifications` SET `is_read`=? WHERE `id`=?',[status, req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows); 
        else
            console.log(err);
    })
});



app.post('/img',(req,res)=>{
    // console.log(req.params.id);
    // console.log(req.body.imageB64);
    // console.log('its working');
    // console.log(req.files);
    console.log(req.files);

if(req.files){
    console.log(req.files);
    var file = req.files.file
    var fname = req.params.id
        var filename = file.name
        console.log(filename)

        file.mv('./uploads/'+ filename,function(err){
                    if(err){
                        res.send(err)
                    }else{
                        res.send("File Uploaded")
                    }
                })
}
    // if (req.body.imageB64){
    //     console.log(req.params.id);
    //     console.log(req.body.user_id);
    //     var file = req.body.imageB64
    //     var filename = file.name
    //     console.log(filename)

    //     file.mv('./uploads/'+ filename,function(err){
    //         if(err){
    //             res.send(err)
    //         }else{
    //             res.send("File Uploaded")
    //         }
    //     })
    // }
})


// app.post('/submit_game_details/:id', (req, res)=>{

//     mysqlConnection.query('SELECT * FROM game_details WHERE fran_id=? AND game_id',[req.params.id, req.body.gameid],(err, rows, fields) =>{
//         if(!rows.length){
//             mysqlConnection.query('INSERT INTO game_details(game_id,date_time,fran_id,img_1_amount,img_2_amount,img_3_amount,img_4_amount,img_5_amount,img_6_amount,img_7_amount,img_8_amount,img_9_amount,img_10_amount,img_11_amount) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[req.body.gameid,req.body.date_time,req.body.f_id,req.body.img_1,req.body.img_2,req.body.img_3,req.body.img_4,req.body.img_5,req.body.img_6,req.body.img_7,req.body.img_8,req.body.img_9,req.body.img_10,req.body.img_11],(err, rows, fields) =>{
//             if(!err)
//             res.status(200).json({status:"ok"})
//             else
//             console.log(err);
//             })
//         }         
//         else{
//             console.log('rows Found');
//             mysqlConnection.query('UPDATE `game_details` SET  `game_id`=?, `date_time`=?, `fran_id`=?, `img_1_amount`= img_1_amount + ?, `img_2_amount`= img_2_amount + ? , `img_3_amount`= img_3_amount + ? , `img_4_amount`= img_4_amount + ? , `img_5_amount`= img_5_amount + ? , `img_6_amount`= img_6_amount + ? , `img_7_amount`= img_7_amount + ? , `img_8_amount`= img_8_amount + ? , `img_9_amount`= img_9_amount + ? , `img_10_amount`= img_10_amount + ?, `img_11_amount`= img_11_amount + ? WHERE `token`=? AND `fran_id`=?',[req.body.gameid,req.body.date_time, req.body.f_id,req.body.img_1,req.body.img_2,req.body.img_3,req.body.img_4,req.body.img_5,req.body.img_6,req.body.img_7,req.body.img_8,req.body.img_9,req.body.img_10,req.body.img_11, req.params.id, req.body.f_id], (err, rows, fields) => {
//             if (!err)
//             res.status(200).json({status:"ok"})
//             else
//             console.log(err);
//             })
//         }
        
//     })
// });

app.post('/submit_game_details/:id', (req, res)=>{
var status = 'F' ;
    mysqlConnection.query('SELECT * FROM game_master as gm INNER JOIN game_details as gd ON gd.game_id=gm.game_id WHERE gm.is_game_calculated=? AND gd.fran_id=? AND gd.game_id=?',[status, req.params.id, req.body.game_id],(err, rows, fields) =>{
       // console.log(rows.length);
        if(!rows.length){
                            var count = req.body.img_1 + req.body.img_2 +req.body.img_3 +req.body.img_4+req.body.img_5+req.body.img_6+req.body.img_7+req.body.img_8+req.body.img_9+req.body.img_10+req.body.img_11;
                            mysqlConnection.query('SELECT * FROM franchises_master WHERE fran_id=?',[req.params.id],(err, rows, fields)=>{
                            if(!err){
                                var cal =  parseInt( (rows[0].fran_game_deposit) * (10/100));
                                
                                console.log(cal);

                                var dep =  parseInt(rows[0].fran_game_deposit) + (cal);
                                //console.log(cal);
                                console.log(dep);
                                //console.log(count);
                                var substract_dep = rows[0].fran_game_deposit - count;
                                //console.log(substract_dep);

                                if(dep > count){
                                    mysqlConnection.query('INSERT INTO game_details(game_id,date_time,fran_id,img_1_amount,img_2_amount,img_3_amount,img_4_amount,img_5_amount,img_6_amount,img_7_amount,img_8_amount,img_9_amount,img_10_amount,img_11_amount) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[req.body.game_id,req.body.date_time,req.body.fran_id,req.body.img_1,req.body.img_2,req.body.img_3,req.body.img_4,req.body.img_5,req.body.img_6,req.body.img_7,req.body.img_8,req.body.img_9,req.body.img_10,req.body.img_11],(err, rows, fields) =>{
                                        if(!err){
                                            // mysqlConnection.query('UPDATE `franchises_master` SET `fran_game_deposit`=? WHERE  `fran_id`=?',[substract_dep,req.body.fran_id], (err, rows, fields) => {
                                            //     if (!err)
                                            //     res.status(200).json({status:"ok"})
                                            //     else
                                            //     console.log(err);
                                            //     })
                                            res.status(200).json({status:"ok"})
                                        }
                                        else{
                                            console.log(err);
                                        }
                                        })
                                        
                                }
                                else{
                                    console.log('your deposit insufficient')
                                    return res.status(500).send({ message : 'Your Deposit Balance is Insufficient' });
                                }

                            }
                            else{
                                console.log(err);
                            }  
                            })
        }  
        else{
            console.log(err);
            return res.status(500).send({ message : 'Game id already exists' });

        }   
    })
});


// app.post('/submit_game_details/:id', (req, res)=>{
//     var status = 'F' ;
//         mysqlConnection.query('SELECT * FROM game_master as gm INNER JOIN game_details as gd ON gd.game_id=gm.game_id WHERE gm.is_game_calculated=? AND gd.fran_id=? AND gd.game_id=?',[status, req.params.id, req.body.game_id],(err, rows, fields) =>{
//             console.log(rows.length);
//             if(!rows.length){
//                                 var count = req.body.img_1 + req.body.img_2 +req.body.img_3 +req.body.img_4+req.body.img_5+req.body.img_6+req.body.img_7+req.body.img_8+req.body.img_9+req.body.img_10+req.body.img_11;
//                                 mysqlConnection.query('SELECT * FROM franchises_master WHERE fran_id=?',[req.params.id],(err, rows, fields)=>{
//                                 if(!err){
//                                     var dep = rows[0].fran_game_deposit;
//                                     console.log(count);
    
//                                     if(dep > count){
//                                         mysqlConnection.query('INSERT INTO game_details(game_id,date_time,fran_id,img_1_amount,img_2_amount,img_3_amount,img_4_amount,img_5_amount,img_6_amount,img_7_amount,img_8_amount,img_9_amount,img_10_amount,img_11_amount) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[req.body.game_id,req.body.date_time,req.body.fran_id,req.body.img_1,req.body.img_2,req.body.img_3,req.body.img_4,req.body.img_5,req.body.img_6,req.body.img_7,req.body.img_8,req.body.img_9,req.body.img_10,req.body.img_11],(err, rows, fields) =>{
//                                             if(!err)
//                                             res.status(200).json({status:"ok"})
//                                             else
//                                             console.log(err);
//                                             })
//                                     }
//                                     else{
//                                         console.log('your deposit insufficient')
//                                         return res.status(500).send({ message : 'Your Deposit Balance is Insufficient' });
//                                     }
    
//                                 }
//                                 else{
//                                     console.log(err);
//                                 }  
//                                 })
//             }     
//             else{
//                 var status = 'F' ;
//                     mysqlConnection.query('SELECT * FROM game_master as gm INNER JOIN game_details as gd ON gd.game_id=gm.game_id WHERE gm.is_game_calculated=? AND gd.fran_id=? AND gd.game_id=?',[status, req.params.id, req.body.game_id],(err, rows, fields)=>{
//                     if(!err){
//                         data = rows[0]
//                         var count_from_user = Number(req.body.img_1) + Number(req.body.img_2) + Number(req.body.img_3) + Number(req.body.img_4) + Number(req.body.img_5) + Number(req.body.img_6) + Number(req.body.img_7) + Number(req.body.img_8) + Number(req.body.img_9) + Number(req.body.img_10)+ Number(req.body.img_11);
//                         var count_from_database = Number(data.img_1_amount) + Number(data.img_2_amount)  + Number(data.img_3_amount) + Number(data.img_4_amount) + Number(data.img_5_amount)+ Number(data.img_6_amount) + Number(data.img_7_amount) + Number(data.img_8_amount) + Number(data.img_9_amount) + Number(data.img_10_amount) + Number(data.img_11_amount);
    
//                         mysqlConnection.query('SELECT * FROM franchises_master WHERE fran_id=?',[req.params.id],(err, rows, fields)=>{
//                             if(!err){
//                                 var dep = rows[0].fran_game_deposit;
//                                 console.log(dep);
//                                 // console.log(count);
    
//                                 console.log(count_from_user);
//                                 console.log(count_from_database);
//                                  console.log(Number(count_from_database) + Number(count_from_user));
//                                 // console.log(dep);
//                                 var count = Number(count_from_database) + Number(count_from_user)
//                                 console.log(dep > count);
    
//                                 if(dep > count){
//                                     console.log('Your ponts submitted')
//                                      console.log('rows Found');
//                                         mysqlConnection.query('UPDATE `game_details` SET `date_time`=?, `fran_id`=?, `img_1_amount`= img_1_amount + ?, `img_2_amount`= img_2_amount + ? , `img_3_amount`= img_3_amount + ? , `img_4_amount`= img_4_amount + ? , `img_5_amount`= img_5_amount + ? , `img_6_amount`= img_6_amount + ? , `img_7_amount`= img_7_amount + ? , `img_8_amount`= img_8_amount + ? , `img_9_amount`= img_9_amount + ? , `img_10_amount`= img_10_amount + ?, `img_11_amount`= img_11_amount + ? WHERE `game_id`=? AND `fran_id`=?',[req.body.date_time, req.body.fran_id,req.body.img_1,req.body.img_2,req.body.img_3,req.body.img_4,req.body.img_5,req.body.img_6,req.body.img_7,req.body.img_8,req.body.img_9,req.body.img_10,req.body.img_11, req.body.game_id, req.body.fran_id], (err, rows, fields) => {
//                                         if (!err)
//                                         res.status(200).json({status:"ok"})
//                                         else
//                                         console.log(err);
//                                         })
//                                 }
//                                 else{
//                                     console.log('your deposit insufficient')
//                                     return res.status(500).send({ message : 'Your Deposit Balance is Insufficient' });
//                                 }
    
//                             }
//                             else{
//                                 console.log(err);
//                             }  
//                             })
//                     }
//                     else{
//                         console.log(err);
//                     }  
//                     })
//                 }
//         })
//     });
    

app.get('/last_win_game_details/', (req, res) => {  

    var status='T';
    mysqlConnection.query('SELECT * FROM game_master WHERE is_game_calculated=? ORDER BY game_id DESC LIMIT 1',[status], (err, rows, fields) => {
        if (!err)
          res.send(rows); 
        else
            console.log(err);
    })
});

app.get('/current_game_id/', (req, res) => {  
    var status='F';
    mysqlConnection.query('SELECT * FROM game_master WHERE is_game_calculated=? ORDER BY game_id DESC LIMIT 1',[status], (err, rows, fields) => {
        if (!err)
          res.send(rows); 
        else
            console.log(err);
    })
});


app.get('/get_current_gameImg_amount/:id', (req, res) => {
    var status = 'F'
    mysqlConnection.query('SELECT * FROM game_master WHERE is_game_calculated=? ORDER BY game_id DESC LIMIT 1',[status], (err, rows, fields) => {   
        if (rows.length){
            var game_id = rows[0].game_id;

            mysqlConnection.query('SELECT * FROM game_master as gm INNER JOIN game_details as gd ON gd.game_id=gm.game_id WHERE gm.is_game_calculated=? AND gd.fran_id=? AND gd.game_id=?',[status,req.params.id,game_id], (err, rows, fields) => {
                if (!err)
                  res.send(rows); 
                else
                    console.log(err);
            })

        }
        else{
            return res.status(500).send();
        }
    
})
});

app.get('/fran_last_win_game_details/:id', (req, res) => {  

    var status='T';
    mysqlConnection.query('SELECT * FROM game_master WHERE is_game_calculated=? ORDER BY game_id DESC LIMIT 1',[status], (err, rows, fields) => {   
        if (rows.length)
        {
            var last_gameid = rows[0].game_id;

            mysqlConnection.query('SELECT * FROM game_details WHERE fran_id=? AND game_id=?',[req.params.id, last_gameid], (err, rows, fields) => {
            if (!err)
            res.send(rows); 
            else
                console.log(err);
            }) 
        }
        else{
            console.log(err);
        }
               
    })
});

// app.get('/last_win_game_details/:id', (req, res) => { 

//     mysqlConnection.query('SELECT * FROM game_master ORDER BY game_id DESC LIMIT 1', (err, rows, fields) => {   
//         if (!err)
//         var last_gameid = rows[0].game_id;

//     mysqlConnection.query('SELECT * FROM game_master as gm INNER JOIN game_details as gd WHERE gd.game_id=? AND gd.fran_id=?',[last_gameid, req.params.id], (err, rows, fields) => {
//         if (!err)
//             res.send(rows);   
//         else
//             console.log(err);
//     })
// })
// });

app.post('/today_game_history/:id', (req, res) => {  
    var status='T'; 
    mysqlConnection.query('SELECT * FROM game_master as gm INNER JOIN game_details as gd ON gm.game_id=gd.game_id WHERE DATE(gd.date_time)=? AND gd.fran_id=? AND is_game_calculated=?',[req.body.dte, req.params.id, status], (err, rows, fields) => {
        if (!err)
            res.send(rows); 
        else
            console.log(err);
    })
});

app.post('/yesterday_game_history/:id', (req, res) => { 
    var status='T'; 
     mysqlConnection.query('SELECT * FROM game_master as gm INNER JOIN game_details as gd ON gm.game_id=gd.game_id WHERE DATE(gd.date_time)=? AND gd.fran_id=? AND is_game_calculated=?',[req.body.date ,req.params.id, status], (err, rows, fields) => {
         if (!err)
             res.send(rows);
         else
             console.log(err);
     })
 });

 app.post('/date_history/:id', (req, res) => { 
    var status='T';    
     mysqlConnection.query('SELECT * FROM game_master as gm INNER JOIN game_details as gd ON gm.game_id=gd.game_id WHERE DATE(gd.date_time) BETWEEN ? AND ? AND gd.fran_id=? AND is_game_calculated=?',[req.body.start_date1, req.body.end_date1,req.params.id, status], (err, rows, fields) => {
         if (!err)
             res.send(rows); 
         else
             console.log(err);
     })
 });