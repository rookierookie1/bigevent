$(function () {
    getUserInfo()
    var layer = layui.layer
    $('#btnLogout').on('click', function () {
        layer.confirm('确认退出登录？', { icon: 3, title: '提示' }, function (index) {
            localStorage.removeItem('token')
            location.href = '/login.html'
            layer.close(index);
            getUserInfo()
        })
    })

})
function getUserInfo() {
    $.ajax({
        url: '/my/userinfo',
        method: 'get',
        success: function (res) {
            if (res.status !== 0) return layui.layer.msg('获取用户信息失败');
            renderAvatar(res.data)
        }
    })
}
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