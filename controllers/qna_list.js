const asyncHandler = require("express-async-handler")
const db = require('../utils/database');

//get qna_list

exports.read = asyncHandler( async (req,res) => {

    let data1;
    let data2;
    let len1;
    let len2;

    await db.query('select * from metadata_qna_list',(err,result1)=>{
        if(err)  throw err;
        data1 = result1;
        len1 = result1.length;
    });
    await db.query('SELECT * FROM metadata_marks',(err,result2)=>{ 
        if(err) throw err;
        data2 = result2;
        len2 = result2.length;
        res.status(200).json([
            {
                body:data2,
                itemCount:len2
            },
            {
                body:data1,
                itemCount:len1
            }
        ])       
    });

})

