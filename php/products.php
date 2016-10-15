<?php
require_once __DIR__.'/libs/RestfulServer.php';

class  ProductService extends RestfulServer {
		// protected $usedb = true;
		public function __construct() {
			parent::__construct();
		}

		public function index(){
			echo 'ProductService';
		}


		public function getAaa(...$argv){
			echo 'Product Get Aaa',join($argv);
			// $this->dump($argv);
		}

		public function postAaa(...$argv){
			echo 'Product Post Aaa',join($argv);
			// $this->dump($argv);
		}

		public function deleteAaa(...$argv){
			echo 'Product Del Aaa',join($argv);
			// $this->dump($argv);
		}

		public function putAaa(...$argv){
			echo 'Product PUT Aaa',join($argv);
			// $this->dump($argv);
		}

		public function model(){
			return new Product();
		}
}

// $productservice = new ProductService();
// $productservice->run();
