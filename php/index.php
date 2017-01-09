<?php
require_once __DIR__.'/libs/RestfulServer.php';
// require_once __DIR__.'/products.php';
// require_once __DIR__.'/about.php';

class  IdxService extends RestfulServer {
		protected $route = '/';

		public function __construct() {
			// $this->isroot = true;			
			// $this->hasroot = true;			
			// $this->usedb = true;
			parent::__construct();
		}

		public function index(){
			echo 'IdxService',$this->language;
		}

	 	// public  function permalink($id=null) {
	 		// 	$this->setStatus(200);
	 		// 	if (in_array($this->uri[0], $this->languages)) {
	 		// 		$this->language = $this->uri[0];
	 		// 		(isset($this->uri[1]) ?  $this->route = $this->uri[1] : null );
	 		// 		($this->route == '' ? $this->route = '/': null );
	 		// 		array_shift($this->uri);s
	 		// 		array_shift($this->request);
				// } else {
				// 	$this->language = $this->languages[0];
	 		// 		(isset($this->uri[0]) ?  $this->route = $this->uri[0] : null );
	 		// 		($this->route == '' ? $this->route = '/': null );
				// }

				// $this->setSess('lang',$this->language);
				// $this->setSess('route',$this->route);

				// $func = 'get'.ucfirst($this->route);
				// if(method_exists($this,$this->route)) {
				// 	array_shift($this->request);
				// 	call_user_func_array([$this,$this->route],$this->request);
				// } else if(method_exists($this,$func) ){
				// 	array_shift($this->request);
				// 	call_user_func_array([$this,$func],$this->request);
				// } else {
				// 	if (array_key_exists($this->route, $this->routepages)) { 
				// 		switch ($this->route) {
				// 			case 'products':
				// 				$p = new ProductService();
				// 				array_shift($this->request);
				// 				$p->make($this);
				// 				break;
				// 			default:
				// 				$this->setStatus(404);
				// 				echo '-------- 404 Page Not Found. 1---------';
				// 				break;
				// 		}
					
				// 	} else {
				// 		$this->setStatus(404);
				// 		echo '-------- 404 Page Not Found. 2-----------';
				// 	}
				// }
				// exit();
	 	// }
		// public function postTest(...$argv){
		// 	$this->dump('store',$argv);
		// }

	 	public function postAaaa(...$argv) {
	 		try {
		 		echo 'Get AAA';
		 		// $this->dump($argv);
	 			$o = new stdClass();
	 			$o->date = $argv;
	 			$o->input = $this->input;
	 			$this->response($o,'json');
	 		} catch (Exception $e) {
	 			$this->rest_error(-1,$e->getMessage(),'json',0); //or
	 		}
	 		
	 	}

		public function model(){
			return null;
		}
}

$idxservice = new IdxService();
$idxservice->run();
