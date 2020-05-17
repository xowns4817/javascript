const fs = require("fs")
const { promisify } = require('util')

// case 1. 콜백 -> try/catch로 에러 못잡음.. 함수가 언제 호출될지 모름.
const writeAndReadCallBack = (filePath, data) => {
    fs.writeFile(filePath, data, (err) => {
        if (err) console.log(err);
        else {
            console.log("write success !");
            fs.readFile(filePath, "utf-8", (err, data) => {
                if (err) console.log(err);
                else console.log(data);
            });
        }
    });
}

writeAndReadCallBack("test.txt", "Hello !");

// case 2. 프로미스
const writePromise = function (filePath, data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, data, (err) => {
            if (err) reject(err);
            else resolve("file write success!!");
        });
    });
}
const readPromise = function (filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf-8', (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });
};

writePromise("test1.txt", "bye bye!!!!!?").then(data => {
    console.log("success write: " + data);
    readPromise("test1.txt").then(data => {
        console.log("success read : " + data);
    }).catch(e => {
        console.log("error read : " + e);
    });
}).catch(e => {
    console.log("error write : " + e);
});


//callback -> promise
//const read = promisify(fs.readFile)
//const write = promisify(fs.writeFile)

// case 3. async await
const writeAndRead = async (filePath, data) => {
    try {
        await writePromise(filePath, data);
        const content = await readPromise(file, 'utf-8');
        console.log(content);
    } catch (e) {
        console.log(e)
    }
}

writeAndRead("test.txt", "Hello !");