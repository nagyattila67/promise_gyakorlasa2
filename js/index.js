
document.addEventListener('DOMContentLoaded', () => {
    document.querySelector("#newTextPostButton").addEventListener('click',
        myRoutin)
})

const myRoutin = function () {
    let myId = document.querySelector("#newTextIdInput").value;
    if (myId == "") { myId = "noId" }
    else {
        myId = parseInt(myId);
    }
    console.log(myId);
    checkId(myId);

}

const checkId = function (myId) {
    console.log(myId)
    const fetchInit = { method: "GET" }
    fetch(`https://jsonplaceholder.typicode.com/posts/${myId}`, fetchInit)
        .then(data => { console.log(data); data = data.json(); return data })
        .catch(err => console.log("error"))
        .then(data => {
            console.log(data), console.log(Object.keys(data).length);
            if (Object.keys(data).length == 0) {
                postOrPutNewText("POST", myId);
            }
            else {
                postOrPutNewText("PATCH", myId);
            }
        })
}


const postOrPutNewText = function (myMethod, myId) {
    console.log(myMethod);
    let content = document.querySelector("#newTextPostInput").value;
    let data = {
        body: content,
    }

    console.log(data)

    const fetchInit = {
        method: `${myMethod}`,
        mode: "cors",
        cache: "no-cache",
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
        body: JSON.stringify(data)
    }

    if (myMethod == "POST") {
        myURL = `https://jsonplaceholder.typicode.com/posts`
    }
    else {
        myURL = `https://jsonplaceholder.typicode.com/posts/${myId}`
    }

    const myFetch = fetch(myURL, fetchInit)
        .then(data => data.json())
        .catch(err => console.log("error1"))
        .then((data) => {
            console.log(data);
            document.querySelector("#sentNewTextId").innerHTML = data.id
            document.querySelector("#postedData").innerHTML = data.body
        })
        .catch(err => console.log("error2"));
}

let allPosts = Array();
let myTeen = Array();
let teenContent = "";
const getAllPosts = function (min, max, refresh) {

    if (refresh == true) {
        const myFetch = fetch('https://jsonplaceholder.typicode.com/posts')
            .then((response) => response.json())
            .then((data) => {
                allPosts = data; console.table(data);
                allPosts = allPosts.map(item => item.title);
                myTeen = allPosts.filter((value, index) => { if (index >= min - 1 && index <= max - 1) { return true } })
                console.table(myTeen)
                teenContent = "";
                myTeen.forEach((value, index) => {
                    teenContent += `
                    <tr><td>${min + index}</td><td>${value}</td></tr>
                    `
                })

                document.querySelector("#onlyTeen").innerHTML = teenContent;
            });
    }
    else {
        myTeen = allPosts.filter((value, index) => { if (index >= min - 1 && index <= max - 1) { return true } })
        console.table(myTeen)
        teenContent = "";
        myTeen.forEach((value, index) => {
            teenContent += `
        <tr><td>${min + index}</td><td>${value}</td></tr>
        `
        })

        document.querySelector("#onlyTeen").innerHTML = teenContent;
    }




}
let min = 1;
let max = 10;
refresh = true;
getAllPosts(min, max, refresh);

const refreshTeenFunction = function () {
    min = 1;
    max = 10;
    refresh = true;
    getAllPosts(min, max, refresh);
}

const nextTeenFunction = function () {
    if (max < allPosts.length - 10) {
        min = min + 10; max = max + 10; refresh = false;
        getAllPosts(min, max, refresh);
    }
}

const previousTeenFunction = function () {
    if (min > 10) {
        min = min - 10; max = max - 10; refresh = false;
        getAllPosts(min, max, refresh);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector("#refreshTeenButton").addEventListener('click',
        refreshTeenFunction)
})

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector("#previousTeenButton").addEventListener('click',
        previousTeenFunction)
})

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector("#nextTeenButton").addEventListener('click',
        nextTeenFunction)
})



document.addEventListener('DOMContentLoaded', () => {
    const myList = document.querySelectorAll(".extra")
    myList.forEach(() => { addEventListener('click', extraFunction) })
})

let myExtras = Array();
const extraFunction = function () {
    myExtras = Array();
    for (let i = 0; i < document.querySelectorAll(".extra").length; i++) {
        if (document.querySelectorAll(".extra")[i].checked == true) {
            myExtras.push(document.querySelectorAll(".extra")[i].value)
        }
    }
    myExtras.sort();
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector("#titleModifyButton").addEventListener('click',
        titleModifyFunction)
})


const titleModifyFunction = function () {
    let myMethod = "";
    if (document.querySelector("#myPut").checked == true) { myMethod = "PUT" }
    if (document.querySelector("#myPatch").checked == true) { myMethod = "PATCH" }

    let myId = document.querySelector("#postIdForModify").value;
    myId = parseInt(myId);
    let newTitle = document.querySelector("#titleForModify").value;
    console.log(myId);
    console.log(newTitle)
    let data = {
        id: myId,
        title: `${newTitle}`
    }
    let fetchInit = {
        method: `${myMethod}`,
        mode: "cors",
        cache: "no-cache",
        headers: { 'Content-Type': 'application/json;charset=UTF-8' },
        body: JSON.stringify(data)
    }
    const myFetch = fetch(`https://jsonplaceholder.typicode.com/posts/${myId}`, fetchInit)
        .then(data => {
            console.log(data);
            document.querySelector("#statusOfSending").innerHTML = "";
            if (data.status >= 300) {
                document.querySelector("#statusOfSending").innerHTML = `hibakód: ${data.status}`;
            }
            if (data.status < 300) {
                document.querySelector("#statusOfSending").innerHTML = "a művelet sikeres volt"
            }; return data.json();
        }

        )
        .catch(err => console.log(err))
        .then(data => {
            console.log(data);
            data2 = data;
            let content = "";
            document.querySelector("#modifiedTitle").innerHTML = "";
            document.querySelector("#modifiedTitle").innerHTML = data.title;
            for (let i = 0; i < Object.keys(data).length; i++) {
                content += `
                <span><i>${Object.keys(data)[i]}: ${Object.values(data)[i]}</i>
                ${i == Object.keys(data).length - 1 ? "}" : ", "}</span>
                `
            }
            content = '{' + content;
            document.querySelector("#modifiedPost").innerHTML = content;
        })
        .catch(err => console.log(err))
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector("#deletePostButton").addEventListener('click',
        deletePostFunction)
})

const deletePostFunction = function () {
    let myId = document.querySelector("#postIdForModify").value;
    myId = parseInt(myId);
    const myFetch = fetch(`https://jsonplaceholder.typicode.com/posts/${myId}`, {
        method: 'DELETE',
    })
        .then(data => { console.log(data); return data.json() })
        .catch(err => console.log(err))
        .then(data => {
            console.log(data);
            if (Object.keys(data).length == 0) {
                document.querySelector("#deletePostSpan").innerHTML = "post törölve"
            };
        })
        .catch(err => console.log(err))
}

const makeHamburgerFunction = function () {
    let t = 0;
    myTime = setInterval(() => {
        t = t + 1; document.querySelector("#passed").innerHTML = t
    }, 1000)

    let statusContent = "";
    let place = document.querySelector("#making-status");
    let timeStart = new Date();

    const myPromise1 = new Promise((resolve) => {
        setTimeout(() => {
            let myTime = new Date();
            let expiredTime = Math.floor((myTime - timeStart) / 1000)
            console.log("kész", expiredTime); statusContent += `<br> a steak megsült - ${expiredTime} sec.`;
            statusContent = '&#127828; ' + statusContent;
            document.querySelector("#making-status").innerHTML = statusContent;
            resolve("a steak megsült")
        },
            15000)
    })

    const myPromise2 = new Promise((resolve) => {
        setTimeout(() => {
            let myTime = new Date();
            let expiredTime = Math.floor((myTime - timeStart) / 1000)
            console.log("kész"); statusContent += `<br> a zöldségek feldarabolva - ${expiredTime} sec.`;
            statusContent = '&#127828; ' + statusContent;
            document.querySelector("#making-status").innerHTML = statusContent;
            resolve("a zöldségek feldarabolva");
        },
            5000)
    })

    const myPromise3 = new Promise((resolve) => {
        setTimeout(() => {
            let myTime = new Date();
            let expiredTime = Math.floor((myTime - timeStart) / 1000)
            console.log("kész");
            statusContent += `<br> a zsemlék megsütve - ${expiredTime} sec.`;
            statusContent = '&#127828; ' + statusContent;
            document.querySelector("#making-status").innerHTML = statusContent;
            resolve("a zsemlék megsütve");
        },
            7000)
    })

    const finalPromiseFunction = function () {
        const finalPromise = new Promise((resolve) => {
            console.log("elindult")
            let myTime = new Date();
            let expiredTime = Math.floor((myTime - timeStart) / 1000)
            statusContent += `<br><span style="color:#404040">előkészítés megtörtént, hamburger összerakása megkezdődött - ${expiredTime} sec.</span>`;
            statusContent = '&#127828; ' + statusContent;
            document.querySelector("#making-status").innerHTML = statusContent;
            setTimeout(() => {
                resolve("a hamburger elkészült");
                let myTime = new Date();
                let expiredTime = Math.floor((myTime - timeStart) / 1000)
                statusContent += `<br> a hamburger elkészült - ${expiredTime} sec.`
                statusContent = '&#127828;' + statusContent;
                console.log("kész", expiredTime);
                document.querySelector("#making-status").innerHTML = statusContent;
            }, 10000)
        })
        finalPromise.then(data => {
            bonappetit(); console.log("Jó étvágyat!");
            clearInterval(myTime);
        })

    }

    const bonappetit = function () {
        if (myExtras.includes("cián")) {
            statusContent += `<br><br>
            <span class="myWish"><i>Jó étvágyat kívánunk és nyugodjék békében!</i></span>`
        }
        else {
            statusContent += `<br><br>
            <span class="myWish"><i>Jó étvágyat kívánunk!</i></span>`
        }
        document.querySelector("#making-status").innerHTML = statusContent;
    }

    Promise.all([myPromise1, myPromise2, myPromise3]).then(data => {
        console.table(data);
        if (myExtras.length != 0) {
            const myPromise4 = new Promise((resolve) => {
                setTimeout(() => {
                    let myTime = new Date();
                    let expiredTime = Math.floor((myTime - timeStart) / 1000)
                    console.log("kész");
                    statusContent += `<br> extrák (${myExtras}) hozzáadva - ${expiredTime} sec.`;
                    statusContent = '&#127828; ' + statusContent;
                    document.querySelector("#making-status").innerHTML = statusContent;
                    resolve("extrák hozzáadva");
                },
                    2000)
            })
            myPromise4.then(data => {

                finalPromiseFunction();
                /*const finalPromise = new Promise((resolve) => {
                    console.log("elindult")
                    let myTime = new Date();
                    let expiredTime = Math.floor((myTime - timeStart) / 1000)
                    statusContent += `<br><span style="color:grey">előkészítés megtörtént, hamburger összerakása megkezdődött - ${expiredTime} sec.</span>`;
                    statusContent = '&#127828; ' + statusContent;
                    document.querySelector("#making-status").innerHTML = statusContent;
                    setTimeout(() => {
                        resolve("a hamburger elkészült");
                        let myTime = new Date();
                        let expiredTime = Math.floor((myTime - timeStart) / 1000)
                        statusContent += `<br> a hamburger elkészült - ${expiredTime} sec.`
                        console.log("kész", expiredTime);
                        document.querySelector("#making-status").innerHTML = statusContent;
                    }, 10000)
                })
                finalPromise.then(data => {
                    bonappetit(); console.log("Jó étvágyat!");
                })*/
            })
        }
        else {
            finalPromiseFunction();
            /*const finalPromise = new Promise((resolve) => {
                console.log("elindult")
                let myTime = new Date();
                let expiredTime = Math.floor((myTime - timeStart) / 1000)
                statusContent += `<br><span style="color:grey">előkészítés megtörtént, hamburger összerakása megkezdődött - ${expiredTime} sec.</span>`;
                statusContent = '&#127828; ' + statusContent;
                document.querySelector("#making-status").innerHTML = statusContent;
                setTimeout(() => {
                    resolve("a hamburger elkészült");
                    let myTime = new Date();
                    let expiredTime = Math.floor((myTime - timeStart) / 1000)
                    statusContent += `<br> a hamburger elkészült - ${expiredTime} sec.`
                    console.log("kész", expiredTime);
                    document.querySelector("#making-status").innerHTML = statusContent;
                }, 10000)
            })
            finalPromise.then(data => {
                bonappetit(); console.log("Jó étvágyat!");
            })*/
        }



    })

    statusContent += '<span style="color:#404040"><br> a hamburger készítése elkezdődött</span>'
    place.innerHTML = statusContent;
}
