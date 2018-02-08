/**
 * Created by zhangh on 2017/02/12.
 */
$(function () {
    //平衡左右侧高度
    $('#rightContent').css("minHeight", $('#leftNav').height() > $('#rightContent').height() ? $('#leftNav').height() : $('#rightContent').height());
    //展开左侧导航
    $(".selected").parents("ul").addClass("open");
    $(".selected").parents(".menu_item").children('a').find(".angle-icon").addClass('fa-angle-up').removeClass("fa-angle-down");
    //左侧导航伸缩
    $('.menu_box a[data-toggle="menuParent"]').on('click', function () {
        if ($(this).next().hasClass("open")) {
            $(this).parent().find('ul').removeClass("open")
            $(this).parent().find('.angle-icon').addClass('fa-angle-down').removeClass("fa-angle-up");
        } else {
            $(this).next().addClass("open")
            $(this).parent().find('.angle-icon').addClass('fa-angle-up').removeClass("fa-angle-down");
        }
        $('#rightContent').css("minHeight", $('#leftNav').height() > $('#rightContent').height() ? $('#leftNav').height() : $('#rightContent').height())
    })
    //手机屏幕点击显示隐藏左侧菜单栏
    $('#toggleLeftNav').click(function (e) {
        e.preventDefault();
        if ($("#leftNav").is(":hidden")) {
            $("#leftNav").css('cssText', 'display:block !important');    //如果元素为隐藏,则将它显现
        } else {
            $("#leftNav").css('cssText', 'display:none !important');     //如果元素为显现,则将其隐藏
        }
        $('#leftNav').css({'minHeight': 'auto'});
    })
    if($(".tablesorter").length > 0) {
        $(".tablesorter").tablesorter();
    }
    // if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
    //     $('.selectpicker').selectpicker('mobile');
    // }
    confirmModalClose();    //页面加载后初始化提示信息弹出框
    //监听删除按钮点击事件
    $('[data-toggle="doAjax"]').each(function () {
        $(this).click(function (e) {
            e.preventDefault();
            var DelBtn = $(this);
            confirmModalOpen($(DelBtn).data('info'));     // 提示信息
            $('#ConfirmModal').find('#btnConfirm').click(function () {
                var modal = $('#ConfirmModal');  // 获取modal对象
                modal.find('button').attr('disabled', true);    // 禁用modal按钮
                confirmModalInfo('正在处理，请稍后...', ' fa-spinner fa-spin ');
                //进行ajax处理
                CommonAjax($(DelBtn).data('objurl'), 'GET', '', function (data) {
                    if (data['status'] == '200') {
                        confirmModalInfo(data['info'], ' fa-check ');
                    } else if (data['status'] == '300') {
                        confirmModalInfo(data['info'], '');
                    }
                    setTimeout(function () {
                        window.location.replace(window.location.href);
                    }, 2000);
                })
            })
            $('#ConfirmModal').on('hidden.bs.modal', function (e) {
                e.preventDefault();
                confirmModalClose();
            })
        });
    });

    //初始化插件
    initPlugin();

    //从远端的数据源加载完数据之后触发该事件
    $('#HandleModal').on('loaded.bs.modal', function () {
        //load模态框后再次初始化插件
        initPlugin();
        //selectpicker
        $(this).find('.selectpicker').each(function () {
            $(this).selectpicker('refresh');
        })
    });

    //此事件在模态框被隐藏（并且同时在 CSS 过渡效果完成）之后被触发
    $('#HandleModal').on('hidden.bs.modal', function () {
        $(this).removeData('bs.modal');
        $(this).find(".modal-content").html('<div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-label="Close" id="btnClose{:MCA}"><span aria-hidden="true"><i class="fa fa-times-circle"></i></span></button><h4 class="modal-title" id="{:MCA}HandleModalLabel">提示</h4></div><div class="modal-body text-center fontsize20" style="padding:20px 0;"><i class="fa fa-spinner fa-spin"></i>加载中......</div>');
    });

    //BEGIN BACK TO TOP
    $(window).scroll(function () {
        if ($(this).scrollTop() < 200) {
            $('#totop').fadeOut();
        } else {
            $('#totop').fadeIn();
        }
    });
    $('#totop').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({scrollTop: 0}, 'fast');
        return false;
    });
    //END BACK TO TOP
})

/**
 * 页面加载和异步页面加载时，初始化插件
 */
function initPlugin() {
    //radio默认选中第一个
    $('input:radio').each(function () {
        var $name = $(this).attr('name');
        if (!$('input:radio[name=' + $name + ']').is(':checked')) {
            $('input:radio[name=' + $name + ']').eq(0).attr("checked", true);
        }
    });

    //selectpicker JiLian
    $('.selectpicker[data-action="jiLian"]').each(function () {
        $(this).change(function () {
            var thisSelect = $(this);
            CommonAjax(thisSelect.data('link'), 'POST', {param: thisSelect.val()}, function (jiLianResult) {
                if (jiLianResult.status == '300') {
                    if (!$('#alertBox').length) {
                        $('<div class="alert alert-info alert-dismissible" role="alert" id="alertBox"><button type="button" class="close" style="top:3px;right:-5px;" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><span id="alertBoxMsg" style="text-align: center;"><i class="fa fa-spinner fa-spin"></i>数据正在处理，请稍等...</span></div>').appendTo('body');
                    }
                    $('#alertBox').removeClass('alert-info').addClass('alert-danger');
                    $('#alertBoxMsg').html('<i class="fa fa-exclamation-circle"></i> ' + jiLianResult.info).show();
                    setTimeout(function () {
                        $('#alertBox').remove();
                    }, 4000);
                } else if (jiLianResult.status == '200') {
                    var str = '';
                    var deptData = jiLianResult.data;
                    for (var i = 0, len = deptData.length; i < len; i++) {
                        str += '<option value="' + deptData[i].id + '">' + deptData[i].name + '</option>';
                    }
                    $('#' + thisSelect.data('subject')).html(str).selectpicker('refresh').change();
                }
            });
        })
    });

    //kindeditor
    $('textarea[data-toggle="kindeditor"]').each(function () {
        createKindeditor($(this).attr('id'), $(this).data());
    });

    //kindeditorImageUpload
    $('span[data-toggle="kindeditorImage"]').each(function () {
        var $obj = $(this);
        var $editor = KindEditor.editor({
            uploadJson: UploadJson,
            fileManagerJson: FileManagerJson,
            allowFileManager: true,
            imageSizeLimit: '2MB',
            imageFileTypes: '*.jpg;*.jpeg;*.bmp;*.gif;*.png'
        });
        $obj.click(function () {
            var $this = $(this);
            $editor.pluginsPath = LibPath + 'kindeditor/plugins/';
            $editor.loadPlugin('image', function () {
                $editor.plugin.imageDialog({
                    imageUrl: $($this.data('target')).val(),
                    clickFn: function (url, title, width, height, border, align) {
                        console.log($this.data('preview'));
                        $($this.data('target')).val(url);
                        $($this.data('preview')).prop('src', url).show(500);
                        $editor.hideDialog();
                    }
                });
            });
        })
    });

    //kindeditorFileUpload
    $('span[data-toggle="kindeditorFile"]').each(function () {
        var $obj = $(this);
        var $editor = KindEditor.editor({
            uploadJson: UploadJson,
            fileManagerJson: FileManagerJson,
            allowFileManager: true
        });
        $obj.click(function () {
            var $this = $(this);
            $editor.pluginsPath = LibPath + 'kindeditor/plugins/';
            $editor.loadPlugin('insertfile', function () {
                $editor.plugin.fileDialog({
                    fileUrl: $($this.data('target')).val(),
                    clickFn: function (url, title) {
                        $($this.data('target')).val(url);
                        $($this.data('preview')).html('选中文件：<a target="_blank" href="' + url + '">' + title + '</a>').show(500);
                        $editor.hideDialog();
                    }
                });
            });
        })
    });

    //datetimepicker
    $('input[data-toggle="datetimepicker"]').each(function () {
        var $options = $(this).data();
        if (!$options.hasOwnProperty('format')) $options.format = 'yyyy-mm-dd';
        if (!$options.hasOwnProperty("autoclose")) $options.autoclose = true;
        if (!$options.hasOwnProperty("todayBtn")) $options.todayBtn = true;
        if (!$options.hasOwnProperty("language")) $options.language = "zh-CN";
        if (!$options.hasOwnProperty("minView")) $options.minView = 2;
        $(this).datetimepicker($options).on('changeDate show', function (e) {
            $(this).closest('form[data-toggle="validateForm"]').bootstrapValidator('revalidateField', $(this).attr('name'));
        });
        $(this).attr("readonly", "readonly");
    });

    //validateForm
    $('form[data-toggle="validateForm"]').each(function () {
        validateForm($(this), eval($(this).data('field')));
    });

    $('div[data-toggle="echarts"]').each(function () {
        var eChart = echarts.init($(this).get(0), 'macarons');
        if ($(this).data('method') == 'ajax') {
            eChart.showLoading();
            CommonAjax($(this).data('url'), 'GET', '', function (data) {
                eChart.hideLoading();
                eChart.setOption(data);
            })
        } else if ($(this).data('option') != '') {
            eChart.setOption($(this).data('option'));
        }
    })
}

/**
 * 提示信息弹出框打开
 * @param info      提示信息
 * @param showBtn   是否显示确认取消按钮
 * @param icon      提示信息图标
 */
function confirmModalOpen(info, showBtn, icon) {
    if (!showBtn) showBtn = '1';
    if (!icon) icon = 'fa-exclamation-circle';
    $('#ConfirmModal').on('show.bs.modal', function (event) {
        var modal = $(this);
        confirmModalInfo(info, icon);
        if (showBtn !== '1') {
            modal.find('button').hide();
        }
    })
    $('#ConfirmModal').modal({
        backdrop: 'static',
        keyboard: false,
        show: true
    })
    return;
}

/**
 * 提示信息弹出框提示文字修改
 * @param info  文字信息
 * @param icon  图标
 */
function confirmModalInfo(info, icon) {
    if (!icon) icon = 'fa-exclamation-circle';
    $('#ConfirmModal').find('.modal-body').html("<i class='fa " + icon + " fontsize30 colorf00'></i>" + info);
}

/**
 * 提示信息弹出框关闭
 */
function confirmModalClose() {
    var modal = $('#ConfirmModal');
    modal.find('.modal-body').html('');
    modal.find('button').removeAttr('disabled').show();
    modal.modal('hide');
}

/**
 * 统一ajax方法
 * @param url
 * @param type
 * @param data
 * @param success
 * @constructor
 */
function CommonAjax(url, type, data, success) {
    $.ajax({
        url: url,
        type: type,
        data: data,
        dataType: 'json',
        success: function (result) {
            success && success(result);
        },
        error: function (e) {
            alert("ajax错误提示： " + e.status + " " + e.statusText);
        }
    });
}

/**
 * 统一验证调用方法
 * @param $thisForm 需要验证的表单
 * @param $field 验证的字段
 */
function validateForm($thisForm, $field) {
    $thisForm.bootstrapValidator({
        message: '您输入的信息有误，请仔细检查！',
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: $field
    }).on('success.form.bv', function (e) {
        e.preventDefault();
        var $form = $(e.target);    //获取表单实例
        //禁用所有按钮
        $('#HandleModal').find('button').attr('disabled', true);
        $($form).find('button').attr('disabled', true);
        //显示提示信息
        if (!$('#alertBox').length) {
            $('<div class="alert alert-info alert-dismissible" role="alert" id="alertBox"><button type="button" class="close" style="top:3px;right:-5px;" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><span id="alertBoxMsg" style="text-align: center;"><i class="fa fa-spinner fa-spin"></i>数据正在处理，请稍等...</span></div>').appendTo('body');
        }
        $('#alertBox').removeClass('alert-success').removeClass('alert-danger').addClass('alert-info');
        $('#alertBoxMsg').html('<i class="fa fa-spinner fa-spin"></i>数据正在处理，请稍等...').show();

        if (typeof(beforeAjax) == 'function') beforeAjax($form);
        //ajax处理
        CommonAjax($form.attr('action'), 'POST', $form.serialize(), function (data) {
            if (!$('#alertBox').length) {
                $('<div class="alert alert-info alert-dismissible" role="alert" id="alertBox"><button type="button" class="close" style="top:3px;right:-5px;" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><span id="alertBoxMsg" style="text-align: center;"><i class="fa fa-spinner fa-spin"></i>数据正在处理，请稍等...</span></div>').appendTo('body');
            }
            if (data.status == '300') {
                $('#alertBox').removeClass('alert-info').addClass('alert-danger');
                $('#alertBoxMsg').html('<i class="fa fa-exclamation-circle"></i> ' + data.info).show();
                //启用所有按钮
                $('#HandleModal').find('button').removeAttr('disabled');
                $($form).find('button').removeAttr('disabled');
                setTimeout(function () {
                    $('#alertBox').remove();
                }, 8000);
            } else if (data.status == '200') {
                $('#alertBox').removeClass('alert-info').addClass('alert-success');
                $('#alertBoxMsg').html('<i class="fa fa-check"></i> ' + data.info).show();
                //启用所有按钮
                // $('#HandleModal').find('button').removeAttr('disabled');
                // $($form).find('button').removeAttr('disabled');
                setTimeout(function () {
                    window.location.replace(RefreshUrl);
                }, 1000);
            }
        });
    });
}

/**
 * 统一创建kindeditor
 * @param $objId 对象ID
 */
function createKindeditor($objId, $options) {
    KindEditor.create('#' + $objId, {
        uploadJson: UploadJson,
        fileManagerJson: FileManagerJson,
        allowFileManager: true,
        imageSizeLimit: '2MB',
        imageUploadLimit: '20',
        imageFileTypes: '*.jpg;*.jpeg;*.bmp;*.gif;*.png',
        afterBlur: function () {
            this.sync();
        }
    });
}