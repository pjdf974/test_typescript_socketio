///<reference path="../../defroot/socket.io.d.ts"/>
///<reference path="../../defroot/global.d.ts"/>
var tMsg = document.querySelector("#tMsg"), tLog = document.querySelector("#tLog"), bMsg = document.querySelector("#bMsg"), bLog = document.querySelector("#bLog"), msgs = document.querySelector("[class=messages]"), usrs = document.querySelector("[class=users]"), label = document.querySelector("[class=name] label");
onload = function () {
    var socket = io();
    socket.on("srv", function (data) {
        if (data.msg) {
            ajouter(data.msg);
        }
        ;
        if ("LOG" === data.cod) {
            tLog.disabled = false;
            bLog.disabled = false;
        }
        ;
        if ("OK" === data.cod) {
            label.style.color = "black";
            label.innerHTML = "Votre pseudo =";
            tLog.disabled = true;
            bLog.disabled = true;
            tMsg.disabled = false;
            bMsg.disabled = false;
        }
        ;
        if (data.users) {
            // vider la div users
            while (usrs.firstChild) {
                usrs.removeChild(usrs.firstChild);
            }
            ;
            // la remplir
            for (var user in data.users) {
                ajouter(user, "user", usrs);
            }
            ;
        }
        ;
    });
    bLog.onclick = function () {
        if (tLog.value) {
            socket.emit("clt", { msg: tLog.value.toUpperCase(), cod: "LOG" });
        }
        else {
            tLog.placeholder = "Pseudo ?";
        }
        ;
    };
    bMsg.onclick = function () {
        if (tMsg.value) {
            socket.emit("clt", { msg: tMsg.value });
            tMsg.value = "";
        }
        else {
            tMsg.placeholder = "Il n'y a aucun message à envoyer";
        }
        ;
    };
};
function ajouter(arg, classname, container) {
    if (classname === void 0) { classname = "message"; }
    if (container === void 0) { container = msgs; }
    var elm = document.createElement("div");
    elm.className = classname;
    elm.innerHTML = arg;
    container.appendChild(elm);
    //container.scrollHeight = document.getElementsByClassName(classname).length;
    container.scrollTop = container.scrollHeight;
}
;
