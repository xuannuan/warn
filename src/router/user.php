<?php
//要在C:\wamp64\www\user.php中调用，
// 且打开wampserver,运行网址在http://localhost:8085/user.php
 header("Content-type: text/html; charset=utf-8");
 header('Access-Control-Allow-Origin:http:*');
 //写监听端口文件,还在调试中，目标限制特定端口访问，提高安全性

 $ro =file_get_contents('php://input');        //获取json文件
 $user=json_decode($ro,true);     //将json转为PHP数组，供操作
 $name=$user['Name'];
 $userPwd=$user['userPwd'];

 // 操作数据库
  //1.连接数据库
    $conn = mysqli_connect('localhost:3300','root','123456','test');
     // 检查连接
    if (!$conn)
    {
        die("连接错误: " . mysqli_connect_error());
    }

    $sql="select * from user where (name='$name') and (password='$userPwd')";
    //查询用户表是否存在该用户
     $result = mysqli_query($conn,$sql) ; //执行数据库
     if (!$result) {
        printf("Error: %s\n", mysqli_error($conn));
        exit();
    }

    //返回结果集的函数，若存在则返回1（一行结果集）
//     if (mysqli_num_rows($result) > 0) {
//     // 输出数据
//     while($row = mysqli_fetch_assoc($result)) {
//         echo "id: "  . $row["id"]. " - Name: " . $row["name"]. " " . $row["password"]. "<br>";
//      print_r($row);

//     }
// } else {
//     echo "0 结果";
// }
     $re = mysqli_num_rows($result);  //返回结果集的函数，若存在则返回1（一行结果集）

    //判断结果集，返回相应的查询结果给前端
    if($re!=0){
        $row['status']="1";
        $row['err']="0";
    }else{
        $row['status']="0";
        $row['err']="fail";
    }
echo(json_encode($row));

mysqli_free_result($result);   //释放查询结果内存（养成良好习惯）
     //官网对这个用法解释：mysql_free_result() 仅需要在考虑到返回很大的结果集时会占用多少内存时调用。在脚本结束后所有关联的内存都会被自动释放。

mysqli_close($conn);//关闭数据库
 ?>
