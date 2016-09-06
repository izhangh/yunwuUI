<?php

$data['status'] = '200';    //操作成功
//$data['status'] = '300';  //操作失败
$data['info'] = '提交成功';
$data['data'] = $_REQUEST;
$i = 0;
while($i < 10000000) {
    $i++;   //模拟时间延误/处理非常复杂导致速度慢的效果
}
echo json_encode($data);

?>
