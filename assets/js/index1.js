$(function () {
    function getUserInfo() {
        $.ajax({
            url: '/my/userinfo',
            method: 'get',
            headers: { Authorization: localStorage.getItem('token') },
            success: function (res) {
                console.log(res);
                if (res.status !== 0) return layui.layer.msg('获取用户信息失败');
                renderAvatar(res.data)
            }
        })
    }
    getUserInfo()
})
function renderAvatar(user) {
    //
    var nickname = user.nickname
    var username = user.username
    var name = 0
    if (nickname) {
        $('#welcome').html('欢迎  ' + nickname)
        name = nickname
    } else {
        $('#welcome').html('欢迎  ' + username)
        name = username
    }
    var user_pic = user.user_pic
    if (user_pic) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        var frist = name[0].toUpperCase()
        $('.text-avatar').html(frist).show()
    }
}