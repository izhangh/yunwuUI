/**
 * Created by zhangh on 2016/8/9.
 */
//保留ajax返回值
var ajaxReturnData = '';
$(function() {
    //初始化当前页面地址
    //左右两侧高度一致
    var height = ($('#leftNav').height() > $('#rightContent').height())?$('#leftNav').height():$('#rightContent').height();
    $('#leftNav').css("minHeight", height);
    $('#rightContent').css("minHeight", height);
    //手机屏幕点击显示隐藏左侧菜单栏
    $('#toggleLeftNav').click(function(e) {
        e.preventDefault();
        $('#leftNav').css({
            'minHeight':'auto',
            'borderBottom':"2px solid #e6e5e5"
        });
        $('#leftNav').toggle();
        $('#leftNav').removeClass('hidden-xs');
    })
    $(".tablesorter").tablesorter();
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
        $('.selectpicker').selectpicker('mobile');
    }
    confirmModalClose();    //页面加载后初始化提示信息弹出框
    //监听删除按钮点击事件
    $('.DelBtn').click(function(even) {
        even.preventDefault();
        var delBtn = $(this);
        $('.DelBtn').attr('disabled', true);     // 禁用所有删除按钮
        confirmModalOpen($(this).data('info'));     // 提示信息
        $('#ConfirmModal').find('#btnConfirm').click(function() {
            var modal = $('#ConfirmModal');  // 获取modal对象
            modal.find('button').attr('disabled', true);    // 禁用modal按钮
            confirmModalInfo('正在处理，请稍后...', ' fa-spinner fa-spin ');     // 操作正在进行提示信息
            //进行ajax处理
            ajaxDo($(delBtn).data('objurl'), '', 'GET'); // 提交至ajax处理
            if(ajaxReturnData['status'] == '200') {
                confirmModalInfo(ajaxReturnData['info'], ' fa-check ');
            } else {
                confirmModalInfo(ajaxReturnData['info'], '');
            }
            setTimeout(function() {
                window.location.replace(CURRENTURL);
            }, 1000);
            $('.DelBtn').removeAttr('disabled').show();
        })
        $('#ConfirmModal').on('hidden.bs.modal', function(e) {
            $('.DelBtn').removeAttr('disabled').show();
            confirmModalClose();
        })
    })
})

/**
 * 提示信息弹出框打开
 * @param info      提示信息
 * @param showBtn   是否显示确认取消按钮
 * @param icon      提示信息图标
 */
function confirmModalOpen(info, showBtn, icon) {
    if(!showBtn) showBtn = '1';
    if(!icon) icon = 'fa-exclamation-triangle';
    $('#ConfirmModal').on('show.bs.modal', function (event) {
        var modal = $(this);
        confirmModalInfo(info, icon);
        if(showBtn !== '1') {
            modal.find('button').hide();
        }
    })
    $('#ConfirmModal').modal({
        backdrop: 'static',
        keyboard: false,
        show: true
    })
    return ;
}

function confirmModalInfo(info, icon) {
    if(!icon) icon = 'fa-exclamation-triangle';
    $('#ConfirmModal').find('.modal-body').html("<i class='fa " + icon + " font30 colorf00'></i>" + info);
}

/**
 * 提示信息弹出框关闭
 */
function confirmModalClose() {
    modal = $('#ConfirmModal');
    modal.find('.modal-body').html('');
    modal.find('button').removeAttr('disabled').show();
    modal.modal('hide');
}

/**
 * 同步ajax
 * @param url
 * @param data
 * @param method
 */
function ajaxDo(url, data, method) {
    if(!method) {
        method = 'POST';
    }
    ajaxReturnData = '';
    $.ajax({
        async: false,
        type: method,
        url: url,
        data: data,
        dataType:"json",
        timeout: 5000,
        context: $('body'),
        success:function(data) {
            ajaxReturnData = data;
            return ;
        },
        error:function(xhr) {
            alert("ajax错误提示： " + xhr.status + " " + xhr.statusText);
        }
    });
}