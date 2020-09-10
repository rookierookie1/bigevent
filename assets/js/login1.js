window.onload = function () {
    var links_reg = document.querySelector('.links_reg')
    var links_login = document.querySelector('.links_login')
    var login_box = document.querySelector('.login-box')
    var reg_box = document.querySelector('.reg-box')
    console.log(links_reg);
    console.log(links_login);
    console.log(login_box);
    console.log(reg_box);
    links_reg.onclick = function () {
        login_box.style.display = 'none'
        reg_box.style.display = 'block'
    }
    links_login.onclick = function () {
        login_box.style.display = 'block'
        reg_box.style.display = 'none'
    }



}