$(function () {
    $(".passwordChange").click(function () {
        if ($("#password").attr("type") == "password") {
            $("#password").attr("type", "text");
            $(this).addClass("fa-eye").removeClass("fa-eye-slash").prop("title", "点击隐藏密码");
        } else {
            $("#password").attr("type", "password");
            $(this).removeClass("fa-eye").addClass("fa-eye-slash").prop("title", "点击显示密码");
        }
    })
    $.ajax({
        url: GeetestUrl + "?t=" + (new Date()).getTime(), // 加随机数防止缓存
        type: "get",
        dataType: "json",
        success: function (data) {
            // 调用 initGeetest 进行初始化
            // 参数1：配置参数
            // 参数2：回调，回调的第一个参数验证码对象，之后可以使用它调用相应的接口
            initGeetest({
                // 以下 4 个配置参数为必须，不能缺少
                gt: data.gt,
                challenge: data.challenge,
                offline: !data.success, // 表示用户后台检测极验服务器是否宕机
                new_captcha: data.new_captcha, // 用于宕机时表示是新验证码的宕机
                timeout: '1000',
                product: "bind", // 产品形式，包括：float，popup
                width: "300px"
                // 更多前端配置参数说明请参见：http://docs.geetest.com/install/client/web-front/
            }, function (captchaObj) {
                captchaObj.onReady(function () {
                    $("#wait").hide();
                }).onSuccess(function () {
                    var result = captchaObj.getValidate();
                    if (!result) {
                        $('.tip-info').html('请完成验证').show();
                        return;
                    }
                    $('#button').prop('disabled', 'disabled');
                    $.ajax({
                        url: $('#logonForm').attr('action'),
                        type: 'POST',
                        dataType: 'json',
                        data: {
                            username: $('#username').val(),
                            password: $('#password').val(),
                            geetest_challenge: result.geetest_challenge,
                            geetest_validate: result.geetest_validate,
                            geetest_seccode: result.geetest_seccode
                        },
                        success: function (data) {
                            if (data.status === '200') {
                                $('.tip-info').html(data.info).show();
                                window.location.replace(data.url);
                            } else if (data.status === '300') {
                                $('.tip-info').html(data.info).show();
                                $('#password').val("");
                                setTimeout(function () {
                                    $('#button').removeAttr('disabled');
                                    captchaObj.reset();
                                }, 1100);
                            }
                        }
                    });
                });
                $('#button').click(function () {
                    if ($('#username').val() == '') {
                        $('.tip-info').html('请输入登录账号！').show();
                        return;
                    }
                    if ($('#password').val() == '') {
                        $('.tip-info').html('请输入登录密码！').show();
                        return;
                    }
                    $('.tip-info').html("").hide();
                    captchaObj.verify();
                })
            });
        }
    });
})