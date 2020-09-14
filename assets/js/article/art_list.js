$(function () {
    var q = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: ''
    }

    template.defaults.imports.dataFormat = function (date) {
        const dt = new Date(date)

        var y = padZero(dt.getFullYear())
        var m = padZero(dt.getMonth() + 1)
        var d = padZero(dt.getDate())

        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var ss = padZero(dt.getSeconds())
        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    }
    function padZero(n) {
        return n > 9 ? n : '0' + n
    }
    var form = layui.form
    var layer = layui.layer
    function initTable() {
        $.ajax({
            method: 'get',
            url: '/my/article/list',
            data: q,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取文章列表失败！')
                }
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
                renderPage(res.total)
            }
        })
    }
    initTable()

    function initCate() {
        $.ajax({
            type: 'get',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取分类数据失败！')
                }
                var htmlStr = template('tpl_cate', res)
                $('[name="cate_id"]').html(htmlStr)
                form.render()
            }
        })
    }
    initCate()

    $('#form-search').on('submit', function (e) {
        e.preventDefault()
        var cate_id = $('[name="cate_id"]').val()
        var state = $('[name="state"]').val()
        q.cate_id = cate_id
        q.state = state
        initTable()
    })
    var laypage = layui.laypage

    function renderPage(total) {
        laypage.render({
            elem: 'pageBox',    // 分页容器
            count: total,       //总数据条数
            limit: q.pagesize,  //每页几条数据
            limits: [2, 3, 5, 10],
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            curr: q.pagenum,    //  设置默认被选中的分页
            jump: function (obj, first) {
                q.pagenum = obj.curr            //最新页码值
                q.pagesize = obj.limit
                if (!first) {           // first 页面刷新时first为 true
                    initTable()
                }
            }
        })
    }
    $('tbody').on('click', '.btn-delete', function () {
        var id = $(this).attr('data-id')
        var len = $('.btn-delete').length
        layer.confirm('确认删除吗？', { iocn: 3, title: '提示' }, function (index) {
            $.ajax({
                method: 'get',
                url: '/my/article/delete/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('删除文章失败！')
                    }
                    if (len === 1) {
                        q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1
                    }
                    initTable()
                }
            })
            layer.close(index)
        })
    })
})