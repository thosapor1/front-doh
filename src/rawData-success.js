const express = require("express");
const app = express();

const port = 5010;

const bodyParser = require("body-parser");
const mysql = require("mysql");

var pool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "audit",
    dateStrings: true,
});

//app.use(bodyParser);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const asyncHandler = (fn) => (req, res, next) => {
    return Promise.resolve(fn(req, res, next)).catch(next);
};

app.get("/audit/api/rawdata",
    asyncHandler(async function (req, res,) {
        record = "SELECT transactionId, lane_id, timestamp, vehicleClass, path_images, wheel_description, cameras_plateNo1, province_description, brand_description, colors_description, laserTimestamp, cameras_cameraTimestamp, cameras_platePicture, state, sub_state FROM audit.match_data";
        resultquery = await mysql_query(record)
        
        sql = "SELECT count(*) as count FROM audit.match_data";
        total_query = await mysql_query(sql)
       
        sql = "SELECT count(*) as count FROM audit.match_data where state = 1 AND sub_state = 1";
        normal_query = await mysql_query(sql)
        
        sql = "SELECT count(*) as count FROM audit.match_data where state = 2 AND sub_state = 1";
        unMatch_query = await mysql_query(sql)
        
        sql = "SELECT count(*) as count FROM audit.match_data where state = 2 AND sub_state = 2";
        miss_query = await mysql_query(sql)

        res.status(200).send({
            status: true,
            summary: {
                total: total_query[0].count,
                normal: normal_query[0].count,
                unMatch: unMatch_query[0].count,
                miss: miss_query[0].count
            },
            record: resultquery
        })
    })
);

function url_call(url) {
    return new Promise(function (resolve, reject) {
        request(url, function (err, res, body) {
            if (err) {
                reject(err);
            } else {
                resolve(body);
            }
        });
    });
}

function url_call_post(url, form) {
    var formData = querystring.stringify(form);
    var contentLength = formData.length;

    return new Promise(function (resolve, reject) {
        request(
            {
                headers: {
                    "Contect-Length": contentLength,
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                uri: url,
                body: formData,
                method: "POST",
            },
            function (err, res, body) {
                if (err) {
                    reject(err);
                } else {
                    resolve(body);
                }
            }
        );
    });
}

const mysql_query = (sql) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err);
            } else {
                connection.query(sql, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                    connection.release();
                });
            }
        });
    });
};

// Handle all error from throw and any exception
const errorHandler = (err, req, res, next) => {
    res.send({
        error: true,
        message: err.message,
    });
};

//app.use(errorHandler);
app.listen(port, () => console.log("Server is running on port", port))
