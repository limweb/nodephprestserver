<?php
require_once __DIR__ . '/./config/database.php';
require_once __DIR__ . '/./libs/RestfulServer.php';
ini_set("display_errors", 1);
ini_set('max_execution_time', 500);
set_time_limit(500);
ignore_user_abort(1);
error_reporting(1);
ini_set("memory_limit",-1);
date_default_timezone_set('Asia/Bangkok');
use Illuminate\Database\Capsule\Manager as Capsule;
use Carbon\Carbon;

class  TestajaxService extends RestfulServer {
		//protected $usedb = true;
		public function __construct() {
			$this->isdebug = true;
			// $this->production = true;
			$this->useJwt = true;
			$this->authtype = 'jwt';
			parent::__construct();
			// $this->setJwt('usera');
		}

		public function  getChklogin(){
			// if($this->tokenverify()){
			if($this->isUserlogin()){
				echo 'userLogin';
			} else {
				echo 'Please Login user';
			}

			if($this->isAdminlogin()){
				echo 'Admin Login';
			} else {
				echo 'Please Login Admin';
			}

			// $this->dump($this);

			echo '<form action="'.$this->host.'/'.$this->uri[0].'/logout" method="GET" role="form">
					<legend>Form title</legend>
					<button type="submit" class="btn btn-primary">Logout</button>
				</form>';



		}

		public function getTestxml(){
			$o = new stdClass();
			$o->a = 'aaaaa';
			$o->b = 'Bbbb';
			$x = $this->obj2array($o);
			$this->response($x,'xml');
		}


		public function getLogin() {
			$user = new stdClass();
			$user->name = 'tlen';
			$user->email = 'limweb@hotmail.com';
			$user->islogin = true;
			$user->isadmin = true;
			$this->setJwt($user);
			$this->refresh('/'.$this->uri[0].'/chklogin');
		}

		public function getLogout(){
			 setcookie("authorised", "", time() - 3600,'/');
			 $this->cookie['authorised'] = null;
			$this->redirect('/'.$this->php.'/loginfrm');
		}


		public function getLoginfrm() {
			echo '<!DOCTYPE html>
<html lang="EN">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>Title Page</title>
		<!-- Bootstrap CSS -->
		<link href="http://netdna.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css" rel="stylesheet">

		<!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
		<!-- WARNING: Respond.js doesn"t work if you view the page via file:// -->
		<!--[if lt IE 9]>
			<script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
			<script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
		<![endif]-->
	</head>
	<body>

		<form action="'.$this->host.'/'.$this->php.'/login" method="GET" class="form-horizontal" role="form">
				<div class="form-group">
					<legend>Form Login:</legend>
				</div>
				<div class="form-group">
					<div class="col-sm-10 col-sm-offset-2">
						<button type="submit" class="btn btn-primary">Submit</button>
					</div>
				</div>
		</form>

		<!-- jQuery -->
		<script src="http://code.jquery.com/jquery.js"></script>
		<!-- Bootstrap JavaScript -->
		<script src="http://netdna.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>
	</body>
</html>';
		}

		public function index(){
			$this->routes();
			$this->dump($this);
			echo '<button type="button" onClick="ajaxx()">Click</button>
			    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
				<script>
				  let ajaxx = () => {
					$.ajax({
					  method: "POST",
					  url: "/'.$this->php.'/testajax"
					}).done(function(data) {
					  	 console.log(data);
					});
				  }
				</script>
			';
		}

		public function model(){
			return new User();
		}

		public function postTestajax() {
			try {
				$o = new stdClass();
				$o->data = $this;
				$o->ajax = $this->isAjax;
				$o->sessions = $this->sessiones;
				$o->req = $this->request;
				$this->response($this->ajaxdata(),'xml');
			} catch (Exception $e) {
				$this->rest_error(-1,$e->getMessage(),'',0); //or
			}
			
		}
}

$testajaxservice = new TestajaxService();
$testajaxservice->run();
