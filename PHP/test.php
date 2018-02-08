<?php

$data['status'] = '200';    //操作成功
//$data['status'] = '300';  //操作失败
$data['info'] = '提交返回信息（成功/错误提示）';
$data['data'] = $_REQUEST;
sleep(5);
echo json_encode($data);
?>
