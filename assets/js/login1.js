$(function () {
    $('.links_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('.links_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    var form = layui.form
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        //注册界面 校验再次确认密码
        repwd: function (value) {
            var pwd = $('.reg-box [name="password"]').val();
            if (pwd !== value) {
                return '两次密码不一致！';
            }
        }
    })
    var layer = layui.layer;
    $('#form_reg').on('submit', function (e) {
        e.preventDefault()
        var data = $('#form_reg').serialize()
        $.post('/api/reguser', data
            , function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg("注册成功！")
                $('.links_login').click()
            })
    })

    $('#from_login').on('submit', function (e) {
        e.preventDefault()
        var data = $('#from_login').serialize()
        console.log(data);
        $.ajax({
            url: '/api/login',
            method: 'post',
            data: data,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败')
                }
                layer.msg('登录成功')
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }
        })
    })
})