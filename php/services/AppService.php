<?php
require_once __DIR__.'/../libs/RestfulServer.php';

class  AppService extends RestfulServer {
		//protected $usedb = true;
		public function __construct() {
			parent::__construct();
		}

		public function index(){
			echo 'AppService';
		}

		public function model(){
			return new App();
		}
}

$appservice = new AppService();
$appservice->run();
