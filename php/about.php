<?php
require_once __DIR__.'/libs/RestfulServer.php';

class  AboutService extends RestfulServer {
		// protected $usedb = true;
		public function __construct() {
			parent::__construct();
		}

		public function index(){
			echo 'About Service Index';
		}


		public function getAaa(...$argv){
			echo 'About Aaa';
			$this->dump($argv);
		}

		public function getBbb(...$argv) {
			echo 'AboutGET Bbbb';
			$this->dump($argv);
		}
		public function putBbb(...$argv) {
			echo 'AboutPUT Bbbb';
			$this->dump($argv);
		}
		public function postBbb(...$argv) {
			echo 'AboutPOST Bbbb';
			$this->dump($argv);
		}
		public function deleteBbb(...$argv) {
			echo 'AboutDEL Bbbb';
			$this->dump($argv);
		}

		public function postAaa() {
			try {
				$o = new stdClass();
				$o->data = 'data about aaaa';
				$o->input = $this->input;
				$this->response($o,'json');
			} catch (Exception $e) {
				$this->rest_error(-1,$e->getMessage(),'json',0); //or
			}
			
		}

		public function model(){
			return new About();
		}
}

// $aboutservice = new AboutService();
// $aboutservice->run();